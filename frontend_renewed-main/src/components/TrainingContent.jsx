import { useEffect, useState } from 'react';
import { translate } from '../services/translationService';

export default function TrainingContent() {
  const [materials, setMaterials] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Offline-friendly static list; assets should be cached by service worker
    setMaterials([
      { id: 'pdf_anc', title: translate('ANC Guidelines (PDF)'), type: 'pdf', url: '/training/anc.pdf' },
      { id: 'pdf_pnc', title: translate('PNC Checklist (PDF)'), type: 'pdf', url: '/training/pnc.pdf' },
      { id: 'vid_handwash', title: translate('Handwashing Video'), type: 'video', url: '/training/handwash.mp4' },
    ]);
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="text-gray-600">{translate('Loading training materials...')}</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{translate('Training Materials')}</h3>
      <div className="space-y-4">
        {materials.map((m) => (
          <div key={m.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">{m.title}</p>
              <p className="text-sm text-gray-500 capitalize">{m.type}</p>
            </div>
            <a
              href={m.url}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700"
            >
              {translate('Open')}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}


