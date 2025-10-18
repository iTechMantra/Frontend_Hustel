// src/pages/PHCLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP } from '../services/otpService';
import { verifyPIN, loginWithOTP, verifyOTPAndSetupSession } from '../services/authService';
import { translate } from '../services/translationService';

export default function PHCLogin() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('password');
  const [phone, setPhone] = useState('');
  const [pin, setPin] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handlePINLogin = async (e) => {
    e.preventDefault();
    if (!phone.trim()) { setError('Phone number is required'); return; }
    if (!pin.trim()) { setError('PIN is required'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      // Import and use the new loginPHC function
      const { loginPHC } = await import('../services/authService');
      const result = await loginPHC(phone, pin);
      
      if (result.success) {
        setSuccess('Login successful!');
        setTimeout(() => navigate('/phc/dashboard'), 800);
      } else {
        setError(result.error || 'Invalid login credentials');
      }
    } catch (error) {
      setError('An error occurred while logging in');
      console.error('Login error:', error);
    } finally { setLoading(false); }
  };

  const handleSendOTP = async () => {
    if (!phone.trim()) { setError('Phone number is required'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const r = sendOTP(phone, 'login');
      await loginWithOTP(phone);
      if (r.success) setSuccess('OTP sent successfully!'); else setError(r.error || 'Failed to send OTP');
    } finally { setLoading(false); }
  };

  const handleOTPLogin = async (e) => {
    e.preventDefault();
    if (!phone.trim()) { setError('Phone number is required'); return; }
    if (!otp.trim()) { setError('OTP is required'); return; }
    if (otp.length !== 6) { setError('OTP must be 6 digits'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const r = verifyOTP(phone, otp, 'login');
      if (r.success) {
        await verifyOTPAndSetupSession({ phone, name: 'PHC Staff', role: 'phc_staff' });
        setSuccess('Login successful!');
        setTimeout(() => navigate('/phc/dashboard'), 800);
      } else setError(r.error || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 font-sans">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-100">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{translate('PHC Staff Login')}</h2>
            <p className="text-gray-600">{translate('Access PHC dashboard')}</p>
          </div>
          {success && (<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md"><p className="text-sm text-green-800">{success}</p></div>)}
          {error && (<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p className="text-sm text-red-800">{error}</p></div>)}
          <div className="flex mb-6 space-x-4">
            <button className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${method==='password'?'bg-orange-600 text-white shadow':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} onClick={()=>setMethod('password')}>{translate('PIN')}</button>
            <button className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${method==='otp'?'bg-orange-600 text-white shadow':'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} onClick={()=>setMethod('otp')}>{translate('OTP')}</button>
          </div>
          {method==='password' ? (
            <form onSubmit={handlePINLogin} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Mobile Number')} *</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder={translate('Enter mobile number')} /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('PIN')} *</label><input type="password" value={pin} onChange={e=>setPin(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder={translate('Enter PIN')} /></div>
              <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 transition-colors">{loading?translate('Logging in...'):translate('Login')}</button>
            </form>
          ) : (
            <form onSubmit={handleOTPLogin} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Mobile Number')} *</label><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent" placeholder={translate('Enter mobile number')} /></div>
              <button type="button" onClick={handleSendOTP} disabled={loading||!phone.trim()} className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 transition-colors">{loading?translate('Sending...'):translate('Send OTP')}</button>
              {success && (<div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Enter OTP')} *</label><input type="text" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} required maxLength="6" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-center text-lg tracking-widest" placeholder="000000" /></div>)}
              {success && (<button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 transition-colors">{loading?translate('Verifying...'):translate('Verify OTP')}</button>)}
            </form>
          )}
          <p className="text-sm text-gray-600 mt-6 text-center">{translate("Don't have an account?")} <button onClick={()=>navigate('/phc/signup')} className="text-orange-700 font-semibold hover:underline">{translate('Sign up')}</button></p>
        </div>
      </main>
      <footer className="bg-orange-700 text-white py-4 text-center text-sm mt-8 shadow-inner">© {new Date().getFullYear()} {translate('E-Sannidhi')} | {translate('Government of India Initiative')}</footer>
    </div>
  );
}


