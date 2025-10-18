// src/pages/PharmacySignup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP } from '../services/otpService';
import { registerPharmacy } from '../services/authService';
import { translate } from '../services/translationService';

export default function PharmacySignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    pharmacyName: '',
    license: '',
    address: '',
    pin: ''
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
    if (!formData.pharmacyName.trim()) { setError('Pharmacy name is required'); return; }
    if (!formData.pin.trim()) { setError('PIN is required'); return; }
    if (formData.pin.length < 4) { setError('PIN must be at least 4 digits'); return; }

    setLoading(true);
    setError(''); setSuccess('');
    try {
      const result = sendOTP(formData.phone, 'signup');
      if (result.success) { setStep('otp'); setSuccess('OTP sent successfully!'); }
      else { setError(result.error || 'Failed to send OTP'); }
    } catch (error) {
      setError('An error occurred while sending OTP');
      console.error('OTP send error:', error);
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
        const registerResult = await registerPharmacy({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          pharmacyName: formData.pharmacyName,
          license: formData.license,
          address: formData.address,
          pin: formData.pin
        });
        
        if (registerResult.success) {
          const { verifyOTPAndSetupSession } = await import('../services/authService');
          await verifyOTPAndSetupSession({ phone: formData.phone, name: formData.name, role: 'pharmacy' });
          setSuccess('Account created successfully!');
          setTimeout(() => { navigate('/pharmacy/dashboard'); }, 1000);
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
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-teal-50 to-teal-100 font-sans">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-teal-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{translate('Create Pharmacy Account')}</h2>
            <p className="text-gray-600">{translate('Join E-Sannidhi pharmacy network')}</p>
          </div>

          {success && (<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md"><p className="text-sm text-green-800">{success}</p></div>)}
          {error && (<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p className="text-sm text-red-800">{error}</p></div>)}

          {step === 'form' ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Contact Person Name')} *</label><input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={translate('Enter contact person name')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Mobile Number')} *</label><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={translate('Enter mobile number')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Email')} (Optional)</label><input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={translate('Enter email address')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Pharmacy Name')} *</label><input type="text" name="pharmacyName" value={formData.pharmacyName} onChange={handleInputChange} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={translate('Enter pharmacy name')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('License Number')} (Optional)</label><input type="text" name="license" value={formData.license} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={translate('Enter license number')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Address')} (Optional)</label><input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={translate('Enter pharmacy address')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('PIN')} *</label><input type="password" name="pin" value={formData.pin} onChange={handleInputChange} required minLength="4" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" placeholder={translate('Enter a 4+ digit PIN')} /></div>
              <button type="submit" disabled={loading} className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{loading ? translate('Sending OTP...') : translate('Send OTP')}</button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center mb-4"><p className="text-gray-600">{translate('OTP sent to')} {formData.phone}</p><p className="text-sm text-gray-500">{translate('Please enter the 6-digit OTP')}</p></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Enter OTP')} *</label><input type="text" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} required maxLength="6" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-center text-lg tracking-widest" placeholder="000000" /></div>
              <div className="flex space-x-3"><button type="button" onClick={handleBackToForm} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors">{translate('Back')}</button><button type="submit" disabled={loading} className="flex-1 bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{loading ? translate('Verifying...') : translate('Verify OTP')}</button></div>
            </form>
          )}

          <p className="text-sm text-gray-600 mt-6 text-center">
            {translate('Already have an account?')}{' '}
            <button onClick={() => navigate('/pharmacy/login')} className="text-teal-700 font-semibold hover:underline">
              {translate('Sign in')}
            </button>
          </p>
        </div>
      </main>

      <footer className="bg-teal-700 text-white py-4 text-center text-sm mt-8 shadow-inner">
        © {new Date().getFullYear()} {translate('E-Sannidhi')} | {translate('Government of India Initiative')}
      </footer>
    </div>
  );
}