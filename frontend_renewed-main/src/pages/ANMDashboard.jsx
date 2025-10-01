// src/pages/ANMDashboard.jsx
import { useEffect, useState } from 'react';
import storageService from '../services/storageService';
import { translate } from '../services/translationService';

export default function ANMDashboard() {
  const [metrics, setMetrics] = useState({ ashas: 0, highRisk: 0, immunizations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const patients = await storageService.listPatients();
        // naive derivations
        const ashas = new Set(patients.map(p => p.ownerId).filter(Boolean)).size;
        const highRisk = patients.filter(p => Array.isArray(p.healthConditions) && p.healthConditions.some(h => /anemia|hypertension/i.test(h))).length;
        const immunizations = 0;
        setMetrics({ ashas, highRisk, immunizations });
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{translate('ANM Dashboard')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">{metrics.ashas}</div>
            <div className="text-sm text-gray-600">{translate('ASHA supervised')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-red-600">{metrics.highRisk}</div>
            <div className="text-sm text-gray-600">{translate('High-risk pregnancies')}</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">{metrics.immunizations}</div>
            <div className="text-sm text-gray-600">{translate('Immunizations this month')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}


