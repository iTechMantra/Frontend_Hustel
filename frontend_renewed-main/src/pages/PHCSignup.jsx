// src/pages/PHCSignup.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP } from '../services/otpService';
import { setCurrentSession } from '../services/authService';
import { translate } from '../services/translationService';

export default function PHCSignup() {
  const navigate = useNavigate();
  const [step, setStep] = useState('form');
  const [form, setForm] = useState({ name: '', phone: '', facility: '' });
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const send = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.facility) { setError('All required fields'); return; }
    setLoading(true); setError(''); setSuccess('');
    try { const r = sendOTP(form.phone, 'signup'); if (r.success) { setStep('otp'); setSuccess('OTP sent successfully!'); } else setError(r.error || 'Failed'); }
    finally { setLoading(false); }
  };

  const verify = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) { setError('OTP must be 6 digits'); return; }
    setLoading(true); setError(''); setSuccess('');
    try {
      const r = verifyOTP(form.phone, otp, 'signup');
      if (r.success) {
        await setCurrentSession({ current: { role: 'phc_staff', uuid: form.phone, name: form.name, phone: form.phone, loggedAt: new Date().toISOString() } });
        setSuccess('Account created!');
        setTimeout(()=>navigate('/phc/dashboard'), 800);
      } else setError(r.error || 'Invalid OTP');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-orange-50 to-orange-100 font-sans">
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-orange-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">{translate('PHC Staff Signup')}</h2>
          {success && (<div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md"><p className="text-sm text-green-800">{success}</p></div>)}
          {error && (<div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md"><p className="text-sm text-red-800">{error}</p></div>)}
          {step==='form' ? (
            <form onSubmit={send} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Full Name')} *</label><input name="name" value={form.name} onChange={onChange} className="w-full px-3 py-2 border rounded" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Mobile Number')} *</label><input name="phone" value={form.phone} onChange={onChange} className="w-full px-3 py-2 border rounded" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Facility Name')} *</label><input name="facility" value={form.facility} onChange={onChange} className="w-full px-3 py-2 border rounded" required /></div>
              <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">{loading?translate('Sending...'):translate('Send OTP')}</button>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">{translate('Enter OTP')}</label><input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} className="w-full px-3 py-2 border rounded text-center tracking-widest" maxLength="6" required /></div>
              <button type="submit" disabled={loading} className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700">{loading?translate('Verifying...'):translate('Verify')}</button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}


