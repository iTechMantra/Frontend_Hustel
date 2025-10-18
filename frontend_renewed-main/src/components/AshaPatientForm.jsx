// src/components/AshaPatientForm.jsx
import { useState } from 'react';
import { getCurrentUser } from '../services/authService';
import storageService from '../services/storageService';
import { compressImageToDataUrl } from '../utils/imageUtils';
import useSpeechToText from '../hooks/useSpeechToText';
import { translate } from '../services/translationService';

export default function AshaPatientForm({ onPatientAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    village: '',
    address: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const speech = useSpeechToText({ lang: 'en-IN' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await compressImageToDataUrl(file, 200, 1280);
    setPhoto(dataUrl);
  };

  const handleCaptureLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy }),
      () => setError('Unable to get location'),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('Patient name is required');
      return;
    }

    if (!formData.age.trim()) {
      setError('Patient age is required');
      return;
    }

    if (!formData.gender.trim()) {
      setError('Patient gender is required');
      return;
    }

    if (!formData.village.trim()) {
      setError('Village is required');
      return;
    }

    if (isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      setError('Please enter a valid age');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        setError('Please log in to add patients');
        return;
      }

      const patientData = {
        name: formData.name.trim(),
        age: parseInt(formData.age),
        gender: formData.gender,
        phone: formData.phone.trim(),
        village: formData.village.trim(),
        address: formData.address.trim(),
        notes: formData.notes.trim(),
        ownerRole: 'asha',
        ownerId: currentUser.uuid || currentUser.id,
        ownerName: currentUser.name,
        assignedDoctorId: null,
        status: 'active',
        photo,
        location
      };

      const result = await storageService.addPatient(patientData);
      
      if (result && result.uuid) {
        setSuccess('Patient added successfully!');
        
        // Reset form
        setFormData({
          name: '',
          age: '',
          gender: '',
          phone: '',
          village: '',
          address: '',
          notes: ''
        });
        setPhoto(null);
        setLocation(null);
        
        // Notify parent component
        if (onPatientAdded) {
          onPatientAdded({ ...patientData, id: result.uuid, uuid: result.uuid, createdAt: new Date().toISOString(), healthConditions: [] });
        }
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError('Failed to add patient');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
      setError('An error occurred while adding the patient');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {translate('Add New Patient')}
      </h3>

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-800">{success}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translate('Patient Name')} *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={translate('Enter patient\'s full name')}
          />
        </div>

        {/* Age and Gender */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {translate('Age')} *
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
              min="0"
              max="120"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder={translate('Enter age')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {translate('Gender')} *
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">{translate('Select gender')}</option>
              <option value="male">{translate('Male')}</option>
              <option value="female">{translate('Female')}</option>
              <option value="other">{translate('Other')}</option>
            </select>
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translate('Phone Number')} ({translate('Optional')})
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={translate('Enter phone number')}
          />
        </div>

        {/* Village */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translate('Village/Location')} *
          </label>
          <input
            type="text"
            name="village"
            value={formData.village}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={translate('Enter village or location')}
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translate('Address')} ({translate('Optional')})
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={translate('Enter detailed address')}
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translate('Notes')} ({translate('Optional')})
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={translate('Enter any additional notes about the patient')}
          />
          <div className="mt-2 flex items-center space-x-2">
            <button type="button" onClick={speech.start} className="px-3 py-1 bg-green-100 text-green-700 rounded">
              {speech.listening ? translate('Listening...') : translate('Voice Input')}
            </button>
            <button type="button" onClick={speech.stop} className="px-3 py-1 bg-gray-100 text-gray-700 rounded">
              {translate('Stop')}
            </button>
            {speech.transcript && (
              <button type="button" onClick={() => setFormData(prev => ({ ...prev, notes: `${prev.notes ? prev.notes + ' ' : ''}${speech.transcript}` }))} className="px-3 py-1 bg-blue-100 text-blue-700 rounded">
                {translate('Insert Transcript')}
              </button>
            )}
          </div>
        </div>

        {/* Photo Capture */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {translate('Patient Photo')} ({translate('Optional')})
          </label>
          <input type="file" accept="image/*" capture="environment" onChange={handlePhotoChange} />
          {photo && (
            <div className="mt-2">
              <img src={photo} alt="preview" className="w-24 h-24 object-cover rounded-md" />
            </div>
          )}
        </div>

        {/* GPS Location */}
        <div>
          <button type="button" onClick={handleCaptureLocation} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md">
            {translate('Capture Location')}
          </button>
          {location && (
            <p className="text-xs text-gray-600 mt-1">{`Lat: ${location.lat.toFixed(4)}, Lng: ${location.lng.toFixed(4)} (±${Math.round(location.acc)}m)`}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? translate('Adding Patient...') : translate('Add Patient')}
        </button>
      </form>

      {/* Help Text */}
      <div className="mt-4 p-3 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>{translate('Note')}:</strong> {translate('All fields marked with * are required. The patient will be registered under your ASHA account and can be managed through your dashboard.')}
        </p>
      </div>
    </div>
  );
}
