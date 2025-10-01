// src/pages/PHCDashboard.jsx
import { useEffect, useState } from 'react';
import storageService from '../services/storageService';
import { translate } from '../services/translationService';

export default function PHCDashboard() {
  const [stats, setStats] = useState({ patients: 0, households: 0, visits: 0, pendingSync: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [patients, households, visits, queue] = await Promise.all([
          storageService.listPatients(),
          storageService.listHouseholds(),
          // naive: visits are not filtered here
          storageService.visits ? storageService.visits : Promise.resolve([]),
          storageService.listSyncQueue(1000)
        ]);

        setStats({
          patients: patients.length,
          households: households.length,
          visits: Array.isArray(visits) ? visits.length : 0,
          pendingSync: queue.length
        });
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{translate('PHC Dashboard')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">{stats.patients}</div>
            <div className="text-sm text-gray-600">{translate('Patients')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{stats.households}</div>
            <div className="text-sm text-gray-600">{translate('Households')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-blue-600">{stats.visits}</div>
            <div className="text-sm text-gray-600">{translate('Visits')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-orange-600">{stats.pendingSync}</div>
            <div className="text-sm text-gray-600">{translate('Pending Sync')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


