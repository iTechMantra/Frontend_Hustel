// src/pages/UserSignup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP } from '../services/otpService';
import { setCurrentSession } from '../services/authService';
import { translate } from '../services/translationService';

export default function UserSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form'); // 'form' or 'otp'
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    password: ''
  });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) { setError('Name is required'); return; }
    if (!formData.phone.trim()) { setError('Phone number is required'); return; }
    if (!formData.password.trim()) { setError('Password is required'); return; }
    if (formData.password.length < 4) { setError('PIN must be at least 4 digits'); return; }

    setLoading(true);
    setError(''); setSuccess('');
    try {
      const result = sendOTP(formData.phone, 'signup');
      if (result.success) { setStep('otp'); setSuccess('OTP sent successfully!'); }
      else { setError(result.error || 'Failed to send OTP'); }
    } catch (_) {
      setError('An error occurred while sending OTP');
    } finally { setLoading(false); }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp.trim()) { setError('Please enter OTP'); return; }
    if (otp.length !== 6) { setError('OTP must be 6 digits'); return; }

    setLoading(true);
    setError(''); setSuccess('');
    try {
      const result = verifyOTP(formData.phone, otp, 'signup');
      if (result.success) {
        // Register the user using the new function
        const { registerUser } = await import('../services/authService');
        const registerResult = await registerUser({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          location: formData.location,
          pin: formData.password
        });
        
        if (registerResult.success) {
          // Set up session using the new function
          const { verifyOTPAndSetupSession } = await import('../services/authService');
          await verifyOTPAndSetupSession({ phone: formData.phone, name: formData.name, role: 'user' });
          setSuccess('Account created successfully!');
          setTimeout(() => { navigate('/user/dashboard'); }, 1000);
        } else {
          setError(registerResult.error || 'Failed to create account');
        }
      } else {
        setError(result.error || 'Invalid OTP');
      }
    } catch (error) {
      setError('An error occurred while verifying OTP');
      console.error('Signup error:', error);
    } finally { setLoading(false); }
  };

  const handleBackToForm = () => { setStep('form'); setOtp(''); setError(''); setSuccess(''); };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-blue-100 font-sans">
      {/* Main */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-blue-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{translate('Create Account')}</h2>
            <p className="text-gray-600">{translate('Join E-Sannidhi to access telemedicine services')}</p>
          </div>

          {success && (<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md"><p className="text-sm text-green-800">{success}</p></div>)}
          {error && (<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p className="text-sm text-red-800">{error}</p></div>)}

          {step === 'form' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Full Name')} *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={translate('Enter your full name')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Mobile Number')} *</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={translate('Enter mobile number')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Email')} (Optional)</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={translate('Enter email address')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Location')} (Optional)</label><input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={translate('Enter your location')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('PIN')} *</label><input type="password" name="password" value={formData.password} onChange={handleInputChange} required minLength="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder={translate('Enter a 4+ digit PIN')} /></div>
              <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{loading ? translate('Sending OTP...') : translate('Send OTP')}</button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center mb-4"><p className="text-gray-600">{translate('OTP sent to')} {formData.phone}</p><p className="text-sm text-gray-500">{translate('Please enter the 6-digit OTP')}</p></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Enter OTP')} *</label><input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} required maxLength="6" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-lg tracking-widest" placeholder="000000" /></div>
              <div className="flex space-x-3"><button type="button" onClick={handleBackToForm} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">{translate('Back')}</button><button type="submit" disabled={loading} className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{loading ? translate('Verifying...') : translate('Verify OTP')}</button></div>
            </form>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-4 text-center text-sm mt-8 shadow-inner">
        © {new Date().getFullYear()} {translate('E-Sannidhi')} | {translate('Government of India Initiative')}
      </footer>
    </div>
  );
}