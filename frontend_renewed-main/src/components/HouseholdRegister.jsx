import { useEffect, useState } from 'react';
import storageService from '../services/storageService';
import { translate } from '../services/translationService';

export default function HouseholdRegister() {
  const [households, setHouseholds] = useState([]);
  const [form, setForm] = useState({ headName: '', village: '', address: '', landmark: '' });
  const [loading, setLoading] = useState(false);

  const load = async () => {
    const all = await storageService.listHouseholds();
    setHouseholds(all);
  };

  useEffect(() => { load(); }, []);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const addHousehold = async (e) => {
    e.preventDefault();
    if (!form.headName || !form.village) return;
    setLoading(true);
    try {
      await storageService.addHousehold({ ...form });
      setForm({ headName: '', village: '', address: '', landmark: '' });
      await load();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{translate('Household Register')}</h3>
      <form onSubmit={addHousehold} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input name="headName" value={form.headName} onChange={handleChange} placeholder={translate('Head of Household')} className="px-3 py-2 border rounded" />
        <input name="village" value={form.village} onChange={handleChange} placeholder={translate('Village')} className="px-3 py-2 border rounded" />
        <input name="address" value={form.address} onChange={handleChange} placeholder={translate('Address (optional)')} className="px-3 py-2 border rounded md:col-span-2" />
        <input name="landmark" value={form.landmark} onChange={handleChange} placeholder={translate('Landmark (optional)')} className="px-3 py-2 border rounded md:col-span-2" />
        <button type="submit" disabled={loading} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 md:col-span-2">
          {loading ? translate('Saving...') : translate('Add Household')}
        </button>
      </form>

      <div className="space-y-2">
        {households.length === 0 ? (
          <p className="text-gray-500">{translate('No households added yet')}</p>
        ) : (
          households.map(h => (
            <div key={h.uuid || h.id} className="p-3 border rounded">
              <p className="font-medium text-gray-800">{h.headName} • {h.village}</p>
              {h.address && <p className="text-sm text-gray-600">{h.address}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


