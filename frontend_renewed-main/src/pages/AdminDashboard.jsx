// src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import storageService from '../services/storageService';
import { translate } from '../services/translationService';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ patients: 0, households: 0 });
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [patients, households] = await Promise.all([
          storageService.listPatients(),
          storageService.listHouseholds()
        ]);

        setStats({ patients: patients.length, households: households.length });

        // Leaderboard by ownerId (ASHA)
        const byOwner = new Map();
        for (const p of patients) {
          const key = p.ownerId || 'unknown';
          byOwner.set(key, (byOwner.get(key) || 0) + 1);
        }
        const arr = Array.from(byOwner.entries()).map(([id, count]) => ({ id, patientCount: count }))
          .sort((a, b) => b.patientCount - a.patientCount).slice(0, 10);
        setLeaders(arr);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{translate('Loading dashboard...')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{translate('Admin Dashboard')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">{stats.patients}</div>
            <div className="text-sm text-gray-600">{translate('Patients')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.households}</div>
            <div className="text-sm text-gray-600">{translate('Households')}</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{translate('ASHA Leaderboard')}</h2>
          {leaders.length === 0 ? (
            <p className="text-gray-500">{translate('No data')}</p>
          ) : (
            <div className="space-y-2">
              {leaders.map((l, idx) => (
                <div key={l.id || idx} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium">#{idx + 1}</span>
                    <span className="text-sm text-gray-700">{l.id}</span>
                  </div>
                  <span className="text-sm font-semibold">{l.patientCount} {translate('patients')}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


