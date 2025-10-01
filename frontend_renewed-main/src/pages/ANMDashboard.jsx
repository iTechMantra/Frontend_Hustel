import { useState, useEffect } from 'react';

// Mock services (in real app, these would be imported)
const getCurrentUser = () => {
  return {
    id: 'anm_001',
    uuid: 'anm_001',
    name: 'Nurse Kamala Devi',
    phone: '+91 98765 00001',
    email: 'kamala.anm@health.gov.in',
    role: 'anm',
    phc: 'Rampur Primary Health Center',
    qualification: 'ANM Certified',
    experience: '8 years',
    area: 'Rampur Block',
    createdAt: '2020-01-15'
  };
};

const translate = (text) => text;

// Mock authentication service
const authService = {
  logout: () => {
    console.log('Logging out user...');
    // In real app, this would clear tokens, etc.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1000);
    });
  }
};

export default function AnmDashboard() {
  const [anm, setAnm] = useState(null);
  const [section, setSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [ashaWorkers, setAshaWorkers] = useState([]);

  // ANM-managed beneficiaries - Expanded with more data
  const [beneficiaries] = useState([
    {
      id: 'ben_001',
      name: 'Priya Sharma',
      age: 28,
      gender: 'Female',
      phone: '+91 98765 43210',
      village: 'Rampur',
      category: 'Pregnant Woman',
      lmp: '2023-08-15',
      edd: '2024-05-22',
      ancVisits: 3,
      status: 'High Risk',
      ashaId: 'asha_001',
      ashaName: 'ASHA Sunita',
      lastVisit: '2024-01-28',
      nextVisit: '2024-02-05',
      bloodPressure: '140/90',
      hemoglobin: '10.2'
    },
    {
      id: 'ben_002',
      name: 'Baby Arun Kumar',
      age: 0.5,
      gender: 'Male',
      phone: '+91 87654 32109',
      village: 'Rampur',
      category: 'Child',
      motherId: 'ben_005',
      motherName: 'Radha Devi',
      immunizationStatus: '2/6 doses',
      weight: '5.2 kg',
      height: '62 cm',
      status: 'Normal',
      ashaId: 'asha_001',
      ashaName: 'ASHA Sunita',
      lastVisit: '2024-01-25',
      nextVisit: '2024-02-08'
    },
    {
      id: 'ben_003',
      name: 'Sunita Devi',
      age: 32,
      gender: 'Female',
      phone: '+91 76543 21098',
      village: 'Rampur',
      category: 'Pregnant Woman',
      lmp: '2023-06-10',
      edd: '2024-03-17',
      ancVisits: 5,
      status: 'Normal',
      ashaId: 'asha_002',
      ashaName: 'ASHA Meera',
      lastVisit: '2024-01-30',
      nextVisit: '2024-02-10',
      bloodPressure: '120/80',
      hemoglobin: '11.8'
    },
    {
      id: 'ben_004',
      name: 'Baby Girl Sharma',
      age: 0.2,
      gender: 'Female',
      phone: '+91 65432 10987',
      village: 'Rampur',
      category: 'Child',
      motherId: 'ben_001',
      motherName: 'Priya Sharma',
      immunizationStatus: '1/6 doses',
      weight: '3.8 kg',
      height: '52 cm',
      status: 'Underweight',
      ashaId: 'asha_001',
      ashaName: 'ASHA Sunita',
      lastVisit: '2024-01-20',
      nextVisit: '2024-02-02'
    },
    {
      id: 'ben_005',
      name: 'Radha Devi',
      age: 26,
      gender: 'Female',
      phone: '+91 98765 12345',
      village: 'Rampur',
      category: 'Pregnant Woman',
      lmp: '2023-09-01',
      edd: '2024-06-08',
      ancVisits: 2,
      status: 'Normal',
      ashaId: 'asha_003',
      ashaName: 'ASHA Radha',
      lastVisit: '2024-01-29',
      nextVisit: '2024-02-12'
    },
    {
      id: 'ben_006',
      name: 'Baby Boy Singh',
      age: 1.2,
      gender: 'Male',
      phone: '+91 87654 98765',
      village: 'Rampur',
      category: 'Child',
      motherId: 'ben_007',
      motherName: 'Meena Singh',
      immunizationStatus: '4/6 doses',
      weight: '9.5 kg',
      height: '78 cm',
      status: 'Normal',
      ashaId: 'asha_002',
      ashaName: 'ASHA Meera',
      lastVisit: '2024-01-27',
      nextVisit: '2024-03-15'
    },
    {
      id: 'ben_007',
      name: 'Meena Singh',
      age: 24,
      gender: 'Female',
      phone: '+91 76543 87654',
      village: 'Rampur',
      category: 'Pregnant Woman',
      lmp: '2023-07-20',
      edd: '2024-04-25',
      ancVisits: 4,
      status: 'High Risk',
      ashaId: 'asha_002',
      ashaName: 'ASHA Meera',
      lastVisit: '2024-01-31',
      nextVisit: '2024-02-07'
    }
  ]);

  // ASHA workers under this ANM - Expanded
  const [ashaList] = useState([
    {
      id: 'asha_001',
      name: 'ASHA Sunita',
      phone: '+91 99999 11111',
      village: 'Rampur',
      beneficiaries: 25,
      visitsThisMonth: 18,
      pendingTasks: 7,
      performance: 85,
      joinedDate: '2021-03-15',
      area: 'Rampur East',
      trainingCompleted: ['Basic Training', 'ANC/PNC', 'Immunization'],
      lastActive: '2024-02-01'
    },
    {
      id: 'asha_002',
      name: 'ASHA Meera',
      phone: '+91 99999 22222',
      village: 'Rampur',
      beneficiaries: 22,
      visitsThisMonth: 20,
      pendingTasks: 3,
      performance: 92,
      joinedDate: '2020-08-22',
      area: 'Rampur West',
      trainingCompleted: ['Basic Training', 'ANC/PNC', 'Immunization', 'Nutrition'],
      lastActive: '2024-02-01'
    },
    {
      id: 'asha_003',
      name: 'ASHA Radha',
      phone: '+91 99999 33333',
      village: 'Rampur',
      beneficiaries: 28,
      visitsThisMonth: 15,
      pendingTasks: 10,
      performance: 78,
      joinedDate: '2022-01-10',
      area: 'Rampur North',
      trainingCompleted: ['Basic Training', 'ANC/PNC'],
      lastActive: '2024-01-30'
    },
    {
      id: 'asha_004',
      name: 'ASHA Laxmi',
      phone: '+91 99999 44444',
      village: 'Rampur',
      beneficiaries: 19,
      visitsThisMonth: 16,
      pendingTasks: 5,
      performance: 88,
      joinedDate: '2021-11-05',
      area: 'Rampur South',
      trainingCompleted: ['Basic Training', 'ANC/PNC', 'Family Planning'],
      lastActive: '2024-02-01'
    }
  ]);

  // Due visits schedule - Expanded
  const [dueList] = useState([
    {
      id: 'due_001',
      beneficiaryName: 'Priya Sharma',
      village: 'Rampur',
      type: 'ANC Visit 4',
      dueDate: '2024-02-05',
      ashaName: 'ASHA Sunita',
      priority: 'High',
      overdue: false,
      beneficiaryId: 'ben_001'
    },
    {
      id: 'due_002',
      beneficiaryName: 'Baby Arun Kumar',
      village: 'Rampur',
      type: 'Immunization - DPT',
      dueDate: '2024-02-08',
      ashaName: 'ASHA Sunita',
      priority: 'Medium',
      overdue: false,
      beneficiaryId: 'ben_002'
    },
    {
      id: 'due_003',
      beneficiaryName: 'Sunita Devi',
      village: 'Rampur',
      type: 'PNC Visit 2',
      dueDate: '2024-02-03',
      ashaName: 'ASHA Meera',
      priority: 'High',
      overdue: true,
      beneficiaryId: 'ben_003'
    },
    {
      id: 'due_004',
      beneficiaryName: 'Baby Girl Sharma',
      village: 'Rampur',
      type: 'Immunization - BCG',
      dueDate: '2024-02-02',
      ashaName: 'ASHA Sunita',
      priority: 'High',
      overdue: true,
      beneficiaryId: 'ben_004'
    },
    {
      id: 'due_005',
      beneficiaryName: 'Radha Devi',
      village: 'Rampur',
      type: 'ANC Visit 3',
      dueDate: '2024-02-12',
      ashaName: 'ASHA Radha',
      priority: 'Medium',
      overdue: false,
      beneficiaryId: 'ben_005'
    },
    {
      id: 'due_006',
      beneficiaryName: 'Baby Boy Singh',
      village: 'Rampur',
      type: 'Growth Monitoring',
      dueDate: '2024-02-15',
      ashaName: 'ASHA Meera',
      priority: 'Low',
      overdue: false,
      beneficiaryId: 'ben_006'
    }
  ]);

  // Stock management - Expanded
  const [stockItems] = useState([
    {
      id: 'stock_001',
      name: 'BCG Vaccine',
      category: 'Vaccines',
      quantity: 45,
      unit: 'doses',
      minLevel: 50,
      status: 'Low',
      expiryDate: '2024-12-31',
      batchNo: 'BCG-2024-01',
      supplier: 'Govt. Medical Store'
    },
    {
      id: 'stock_002',
      name: 'OPV Drops',
      category: 'Vaccines',
      quantity: 120,
      unit: 'doses',
      minLevel: 100,
      status: 'Good',
      expiryDate: '2024-11-30',
      batchNo: 'OPV-2024-02',
      supplier: 'Govt. Medical Store'
    },
    {
      id: 'stock_003',
      name: 'Iron Tablets (IFA)',
      category: 'Drugs',
      quantity: 800,
      unit: 'tablets',
      minLevel: 500,
      status: 'Good',
      expiryDate: '2025-06-30',
      batchNo: 'IFA-2024-03',
      supplier: 'PHC Store'
    },
    {
      id: 'stock_004',
      name: 'Tetanus Toxoid',
      category: 'Vaccines',
      quantity: 25,
      unit: 'vials',
      minLevel: 30,
      status: 'Low',
      expiryDate: '2024-10-31',
      batchNo: 'TT-2024-01',
      supplier: 'Govt. Medical Store'
    },
    {
      id: 'stock_005',
      name: 'Vitamin A Syrup',
      category: 'Drugs',
      quantity: 65,
      unit: 'bottles',
      minLevel: 40,
      status: 'Good',
      expiryDate: '2024-09-30',
      batchNo: 'VITA-2024-04',
      supplier: 'PHC Store'
    },
    {
      id: 'stock_006',
      name: 'ORS Packets',
      category: 'Drugs',
      quantity: 350,
      unit: 'packets',
      minLevel: 200,
      status: 'Good',
      expiryDate: '2025-03-31',
      batchNo: 'ORS-2024-05',
      supplier: 'PHC Store'
    },
    {
      id: 'stock_007',
      name: 'Pregnancy Test Kit',
      category: 'Supplies',
      quantity: 85,
      unit: 'kits',
      minLevel: 50,
      status: 'Good',
      expiryDate: '2024-08-31',
      batchNo: 'PTK-2024-06',
      supplier: 'Govt. Medical Store'
    },
    {
      id: 'stock_008',
      name: 'Disposable Syringes',
      category: 'Supplies',
      quantity: 220,
      unit: 'pieces',
      minLevel: 150,
      status: 'Good',
      expiryDate: '2026-12-31',
      batchNo: 'SYR-2024-07',
      supplier: 'Medical Supplies Corp'
    }
  ]);

  // Service delivery forms
  const [serviceTypes] = useState([
    { id: 'anc', name: 'ANC Visit', icon: '🤰', description: 'Antenatal Care examination and counseling' },
    { id: 'pnc', name: 'PNC Visit', icon: '👶', description: 'Postnatal Care for mother and newborn' },
    { id: 'immunization', name: 'Immunization', icon: '💉', description: 'Vaccination services for children and pregnant women' },
    { id: 'growth', name: 'Growth Monitoring', icon: '📏', description: 'Track child growth and development' },
    { id: 'family_planning', name: 'Family Planning', icon: '👨‍👩‍👧', description: 'Contraceptive services and counseling' },
    { id: 'nutrition', name: 'Nutrition Counseling', icon: '🍎', description: 'Nutrition assessment and guidance' },
    { id: 'vhnd', name: 'VHND Session', icon: '🏥', description: 'Village Health & Nutrition Day activities' },
    { id: 'screening', name: 'Health Screening', icon: '🔍', description: 'General health checkup and screening' }
  ]);

  // Reports data - Expanded
  const [reportsData] = useState({
    coverage: {
      anc: { target: 50, achieved: 45, percentage: 90 },
      pnc: { target: 40, achieved: 38, percentage: 95 },
      immunization: { target: 60, achieved: 52, percentage: 87 },
      familyPlanning: { target: 30, achieved: 28, percentage: 93 },
      growthMonitoring: { target: 45, achieved: 42, percentage: 93 },
      vhnd: { target: 4, achieved: 4, percentage: 100 }
    },
    highRiskCases: 5,
    vhndSessions: 4,
    ashaPerformance: 85,
    monthlyStats: {
      totalVisits: 128,
      newRegistrations: 12,
      referralsMade: 8,
      stockIssued: 45
    }
  });

  // Health education materials - Expanded
  const [educationMaterials] = useState([
    { id: 1, title: 'ANC Guidelines', type: 'PDF', icon: '📄', category: 'Pregnancy', size: '2.4 MB', downloads: 45 },
    { id: 2, title: 'PNC Care Protocol', type: 'PDF', icon: '📄', category: 'Postnatal', size: '1.8 MB', downloads: 38 },
    { id: 3, title: 'Immunization Schedule', type: 'Chart', icon: '📊', category: 'Child Health', size: '1.2 MB', downloads: 67 },
    { id: 4, title: 'Nutrition Guidelines', type: 'PDF', icon: '📄', category: 'Nutrition', size: '3.1 MB', downloads: 29 },
    { id: 5, title: 'Family Planning Methods', type: 'Brochure', icon: '📑', category: 'Family Planning', size: '1.5 MB', downloads: 33 },
    { id: 6, title: 'Infection Control', type: 'PDF', icon: '📄', category: 'Safety', size: '2.7 MB', downloads: 41 },
    { id: 7, title: 'Growth Monitoring Chart', type: 'Chart', icon: '📊', category: 'Child Health', size: '0.9 MB', downloads: 58 },
    { id: 8, title: 'VHND Guidelines', type: 'PDF', icon: '📄', category: 'VHND', size: '2.1 MB', downloads: 36 }
  ]);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Please login first');
      return;
    }
    setAnm(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = async () => {
    setLogoutLoading(true);
    try {
      await authService.logout();
      alert('Logged out successfully!');
      // In real app, this would redirect to login page
      console.log('Redirecting to login page...');
    } catch (error) {
      alert('Logout failed. Please try again.');
    } finally {
      setLogoutLoading(false);
    }
  };

  const handleBeneficiarySelect = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setSection('beneficiary_details');
  };

  const handleServiceDelivery = (serviceType) => {
    alert(`Opening ${serviceType.name} form...\n\n${serviceType.description}`);
  };

  const handleStockRequisition = () => {
    alert('Opening stock requisition form...');
  };

  const handleReferralCreate = () => {
    alert('Creating referral to PHC/CHC...');
  };

  const handleScheduleVisit = (visit) => {
    alert(`Scheduling ${visit.type} for ${visit.beneficiaryName}...`);
  };

  const handleNotifyAsha = (asha) => {
    alert(`Sending notification to ${asha.name}...`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{translate('Loading dashboard...')}</p>
        </div>
      </div>
    );
  }

  if (!anm) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-xl flex flex-col">
          <div className="p-4 bg-green-600 text-white">
            <h2 className="font-bold text-lg">ANM Dashboard</h2>
            <p className="text-sm opacity-90">{anm.name}</p>
            <p className="text-xs opacity-75">{anm.phc}</p>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {[
              { key: 'home', label: translate('Home / Dashboard'), icon: '🏠' },
              { key: 'beneficiaries', label: translate('Beneficiary Management'), icon: '👥' },
              { key: 'due_list', label: translate('Due List / Visit Planner'), icon: '📅' },
              { key: 'service_delivery', label: translate('Service Delivery Forms'), icon: '📋' },
              { key: 'stock', label: translate('Stock Management'), icon: '📦' },
              { key: 'referrals', label: translate('Referrals'), icon: '🏥' },
              { key: 'education', label: translate('Health Education Material'), icon: '📚' },
              { key: 'reports', label: translate('Reports / Analytics'), icon: '📊' },
              { key: 'asha_performance', label: translate('ASHA Performance Monitoring'), icon: '⭐' },
              { key: 'chat', label: translate('Messages / Video'), icon: '💬' },
              { key: 'settings', label: translate('Settings'), icon: '⚙️' },
              { key: 'help', label: translate('Help / Guidelines'), icon: '❓' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors text-sm ${
                  section === item.key
                    ? 'bg-green-600 text-white shadow-md'
                    : 'hover:bg-green-100 text-gray-700'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors flex items-center ${
                logoutLoading 
                  ? 'bg-gray-400 text-white cursor-not-allowed' 
                  : 'bg-red-500 text-white hover:bg-red-600'
              }`}
            >
              <span className="mr-3">🚪</span>
              {logoutLoading ? translate('Logging out...') : translate('Logout')}
              {logoutLoading && (
                <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              )}
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex justify-center items-start p-6 overflow-y-auto">
          <div className="w-full max-w-6xl">
            {/* Home Section */}
            {section === 'home' && (
              <div className="space-y-6">
                <div className="bg-white shadow-lg rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {translate('Welcome')}, {anm.name}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {translate('Service delivery, data entry, stock management, supervising ASHAs')}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{beneficiaries.length}</div>
                      <div className="text-sm text-gray-600">{translate('Total Beneficiaries')}</div>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{dueList.length}</div>
                      <div className="text-sm text-gray-600">{translate('Pending Visits')}</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{reportsData.highRiskCases}</div>
                      <div className="text-sm text-gray-600">{translate('High-Risk Cases')}</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{ashaList.length}</div>
                      <div className="text-sm text-gray-600">{translate('ASHA Workers')}</div>
                    </div>
                  </div>
                </div>

                {/* KPIs */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {translate('Key Performance Indicators')}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Object.entries(reportsData.coverage).map(([key, data]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-2 capitalize">
                          {key.replace('_', ' ')} Coverage
                        </h4>
                        <div className="flex items-end justify-between mb-2">
                          <div className="text-2xl font-bold text-green-600">{data.percentage}%</div>
                          <div className="text-sm text-gray-600">{data.achieved}/{data.target}</div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Statistics */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {translate('Monthly Statistics')}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{reportsData.monthlyStats.totalVisits}</div>
                      <div className="text-sm text-gray-600">Total Visits</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{reportsData.monthlyStats.newRegistrations}</div>
                      <div className="text-sm text-gray-600">New Registrations</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{reportsData.monthlyStats.referralsMade}</div>
                      <div className="text-sm text-gray-600">Referrals Made</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{reportsData.monthlyStats.stockIssued}</div>
                      <div className="text-sm text-gray-600">Stock Items Issued</div>
                    </div>
                  </div>
                </div>

                {/* Stock Alerts */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {translate('Stock Alerts')}
                  </h3>
                  <div className="space-y-3">
                    {stockItems.filter(item => item.status === 'Low').map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-600">
                            Current: {item.quantity} {item.unit} | Min Level: {item.minLevel} {item.unit}
                          </p>
                          <p className="text-xs text-gray-500">Batch: {item.batchNo} | Expiry: {item.expiryDate}</p>
                        </div>
                        <button
                          onClick={handleStockRequisition}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          {translate('Reorder')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Due Visits Today */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {translate('Due Visits - High Priority')}
                  </h3>
                  <div className="space-y-3">
                    {dueList.filter(item => item.priority === 'High').map((visit) => (
                      <div key={visit.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                        <div>
                          <h4 className="font-medium text-gray-800">{visit.beneficiaryName}</h4>
                          <p className="text-sm text-gray-600">{visit.type} - {visit.village}</p>
                          <p className="text-xs text-gray-500">ASHA: {visit.ashaName} | Due: {visit.dueDate}</p>
                        </div>
                        <button 
                          onClick={() => handleScheduleVisit(visit)}
                          className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition-colors"
                        >
                          {translate('Schedule')}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Beneficiary Management */}
            {section === 'beneficiaries' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {translate('Beneficiary Management')}
                </h3>
                
                <div className="flex gap-2 mb-4 flex-wrap">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                    {translate('All')} ({beneficiaries.length})
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                    {translate('Pregnant Women')} ({beneficiaries.filter(b => b.category === 'Pregnant Woman').length})
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                    {translate('Children')} ({beneficiaries.filter(b => b.category === 'Child').length})
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
                    {translate('High Risk')} ({beneficiaries.filter(b => b.status === 'High Risk').length})
                  </button>
                </div>

                <div className="space-y-4">
                  {beneficiaries.map((beneficiary) => (
                    <div
                      key={beneficiary.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => handleBeneficiarySelect(beneficiary)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{beneficiary.name}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              beneficiary.status === 'High Risk' 
                                ? 'bg-red-100 text-red-800'
                                : beneficiary.status === 'Underweight'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {beneficiary.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            {beneficiary.age < 2 ? `${beneficiary.age * 12} months` : `${beneficiary.age} years`} • {beneficiary.gender} • {beneficiary.village}
                          </p>
                          <p className="text-sm text-gray-600">
                            {beneficiary.category === 'Pregnant Woman' && (
                              <>EDD: {beneficiary.edd} | ANC Visits: {beneficiary.ancVisits} | Last BP: {beneficiary.bloodPressure}</>
                            )}
                            {beneficiary.category === 'Child' && (
                              <>Weight: {beneficiary.weight} | Height: {beneficiary.height} | Immunization: {beneficiary.immunizationStatus}</>
                            )}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            ASHA: {beneficiary.ashaName} | Last Visit: {beneficiary.lastVisit} | Next Visit: {beneficiary.nextVisit}
                          </p>
                        </div>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors">
                          {translate('View Details')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Due List / Visit Planner */}
            {section === 'due_list' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {translate('Auto-Generated Visit Schedule')}
                </h3>
                
                <div className="space-y-4">
                  {dueList.map((visit) => (
                    <div
                      key={visit.id}
                      className={`border rounded-lg p-4 ${
                        visit.priority === 'High' 
                          ? 'border-red-300 bg-red-50'
                          : visit.priority === 'Medium'
                          ? 'border-orange-300 bg-orange-50'
                          : 'border-gray-200'
                      } ${visit.overdue ? 'animate-pulse' : ''}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{visit.beneficiaryName}</h4>
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              visit.priority === 'High'
                                ? 'bg-red-100 text-red-800'
                                : visit.priority === 'Medium'
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {visit.priority} Priority {visit.overdue && '(Overdue)'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 mb-1">
                            <strong>{visit.type}</strong>
                          </p>
                          <p className="text-sm text-gray-600">
                            Village: {visit.village} | Due Date: {visit.dueDate}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Assigned ASHA: {visit.ashaName}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => handleScheduleVisit(visit)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            {translate('Schedule')}
                          </button>
                          <button 
                            onClick={() => handleNotifyAsha({ name: visit.ashaName })}
                            className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors"
                          >
                            {translate('Notify ASHA')}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Delivery Forms */}
            {section === 'service_delivery' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  {translate('Service Delivery Forms')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceDelivery(service)}
                      className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow text-left"
                    >
                      <div className="text-4xl mb-3">{service.icon}</div>
                      <h4 className="font-semibold text-gray-800 mb-2">{service.name}</h4>
                      <p className="text-sm text-gray-600">
                        {service.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Management */}
            {section === 'stock' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {translate('Stock Management')}
                    </h3>
                    <button
                      onClick={handleStockRequisition}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                    >
                      {translate('Requisition / Issue')}
                    </button>
                  </div>

                  <div className="space-y-4">
                    {stockItems.map((item) => (
                      <div
                        key={item.id}
                        className={`border rounded-lg p-4 ${
                          item.status === 'Low' 
                            ? 'border-red-300 bg-red-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-gray-600">Current Stock:</span>
                                <span className={`ml-2 font-semibold ${
                                  item.status === 'Low' ? 'text-red-600' : 'text-green-600'
                                }`}>
                                  {item.quantity} {item.unit}
                                </span>
                              </div>
                              <div>
                                <span className="text-gray-600">Min Level:</span>
                                <span className="ml-2 font-medium">{item.minLevel} {item.unit}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Expiry:</span>
                                <span className="ml-2 font-medium">{item.expiryDate}</span>
                              </div>
                              <div>
                                <span className="text-gray-600">Batch No:</span>
                                <span className="ml-2 font-medium">{item.batchNo}</span>
                              </div>
                            </div>
                          </div>
                          {item.status === 'Low' && (
                            <button
                              onClick={handleStockRequisition}
                              className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                            >
                              {translate('Reorder')}
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Referrals */}
            {section === 'referrals' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {translate('Referrals Management')}
                  </h3>
                  <button
                    onClick={handleReferralCreate}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                  >
                    {translate('Create Referral')}
                  </button>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      id: 'ref_001',
                      beneficiaryName: 'Priya Sharma',
                      reason: 'High-risk pregnancy - High BP',
                      referredTo: 'District Hospital',
                      referredBy: 'ANM Kamala',
                      date: '2024-01-20',
                      status: 'Completed',
                      followUpDate: '2024-02-05',
                      notes: 'Patient responded well to treatment'
                    },
                    {
                      id: 'ref_002',
                      beneficiaryName: 'Baby Arun Kumar',
                      reason: 'Underweight - severe malnutrition',
                      referredTo: 'CHC Nutrition Center',
                      referredBy: 'ASHA Sunita',
                      date: '2024-01-22',
                      status: 'Pending',
                      followUpDate: '2024-02-10',
                      notes: 'Awaiting specialist appointment'
                    },
                    {
                      id: 'ref_003',
                      beneficiaryName: 'Meena Singh',
                      reason: 'Gestational diabetes screening',
                      referredTo: 'PHC Laboratory',
                      referredBy: 'ANM Kamala',
                      date: '2024-01-31',
                      status: 'In Progress',
                      followUpDate: '2024-02-07',
                      notes: 'Tests completed, awaiting results'
                    }
                  ].map((referral) => (
                    <div
                      key={referral.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1">{referral.beneficiaryName}</h4>
                          <p className="text-sm text-gray-700 mb-2">
                            <strong>Reason:</strong> {referral.reason}
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                            <p><strong>Referred To:</strong> {referral.referredTo}</p>
                            <p><strong>Date:</strong> {referral.date}</p>
                            <p><strong>Referred By:</strong> {referral.referredBy}</p>
                            <p><strong>Follow-up:</strong> {referral.followUpDate}</p>
                          </div>
                          <p className="text-sm text-gray-700 mt-2">
                            <strong>Notes:</strong> {referral.notes}
                          </p>
                          <p className="text-sm mt-2">
                            Status: <span className={`font-semibold ${
                              referral.status === 'Completed' ? 'text-green-600' : 
                              referral.status === 'In Progress' ? 'text-blue-600' : 'text-orange-600'
                            }`}>{referral.status}</span>
                          </p>
                        </div>
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors">
                          {translate('Track')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Health Education Material */}
            {section === 'education' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {translate('Health Education & Counselling Material')}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {educationMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => alert(`Opening ${material.title}...`)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="text-3xl">{material.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{material.title}</h4>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {material.type}
                            </span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {material.category}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>{material.size}</span>
                            <span>{material.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reports / Analytics */}
            {section === 'reports' && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">
                    {translate('Monthly Reports & Analytics')}
                  </h3>

                  {/* Service Coverage */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-4">{translate('Service Coverage')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {Object.entries(reportsData.coverage).map(([key, data]) => (
                        <div key={key} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-800 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </h5>
                            <span className="text-lg font-bold text-green-600">{data.percentage}%</span>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            Achieved: {data.achieved} / Target: {data.target}
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                              className="bg-green-600 h-3 rounded-full transition-all"
                              style={{ width: `${data.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Monthly Statistics */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-4">{translate('Monthly Performance')}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{reportsData.monthlyStats.totalVisits}</div>
                        <div className="text-sm text-gray-600">Total Visits</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{reportsData.monthlyStats.newRegistrations}</div>
                        <div className="text-sm text-gray-600">New Registrations</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">{reportsData.monthlyStats.referralsMade}</div>
                        <div className="text-sm text-gray-600">Referrals Made</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{reportsData.monthlyStats.stockIssued}</div>
                        <div className="text-sm text-gray-600">Stock Items Issued</div>
                      </div>
                    </div>
                  </div>

                  {/* VHND Sessions */}
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-800 mb-4">{translate('VHND Sessions This Month')}</h4>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">{reportsData.vhndSessions}</div>
                        <p className="text-gray-600">Sessions Conducted</p>
                      </div>
                    </div>
                  </div>

                  {/* High-Risk Cases */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">{translate('High-Risk Cases Under Monitoring')}</h4>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-red-600 mb-2">{reportsData.highRiskCases}</div>
                        <p className="text-gray-600">Cases Requiring Special Attention</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ASHA Performance Monitoring */}
            {section === 'asha_performance' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  {translate('ASHA Performance Monitoring')}
                </h3>

                <div className="space-y-4">
                  {ashaList.map((asha) => (
                    <div
                      key={asha.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">{asha.name}</h4>
                          <p className="text-sm text-gray-600">{asha.village} | {asha.phone}</p>
                          <p className="text-xs text-gray-500">Area: {asha.area} | Joined: {asha.joinedDate}</p>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            asha.performance >= 90 ? 'text-green-600' :
                            asha.performance >= 75 ? 'text-blue-600' :
                            'text-orange-600'
                          }`}>
                            {asha.performance}%
                          </div>
                          <p className="text-xs text-gray-500">Performance</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-xl font-bold text-blue-600">{asha.beneficiaries}</div>
                          <div className="text-xs text-gray-600">Beneficiaries</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-xl font-bold text-green-600">{asha.visitsThisMonth}</div>
                          <div className="text-xs text-gray-600">Visits Done</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-xl font-bold text-orange-600">{asha.pendingTasks}</div>
                          <div className="text-xs text-gray-600">Pending Tasks</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-xl font-bold text-purple-600">{asha.trainingCompleted.length}</div>
                          <div className="text-xs text-gray-600">Trainings</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors">
                          {translate('View Details')}
                        </button>
                        <button 
                          onClick={() => handleNotifyAsha(asha)}
                          className="flex-1 px-3 py-1 bg-green-100 text-green-700 text-sm rounded-md hover:bg-green-200 transition-colors"
                        >
                          {translate('Message')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages / Video Chat */}
            {section === 'chat' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  {translate('Messages & Video Consultation')}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <button
                    onClick={() => alert('Starting video call with PHC/CHC...')}
                    className="border-2 border-green-600 rounded-lg p-6 hover:bg-green-50 transition-colors"
                  >
                    <div className="text-4xl mb-3">📹</div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {translate('Video Call with PHC/CHC')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {translate('Connect with doctors for consultations')}
                    </p>
                  </button>

                  <button
                    onClick={() => alert('Opening ASHA messaging...')}
                    className="border-2 border-blue-600 rounded-lg p-6 hover:bg-blue-50 transition-colors"
                  >
                    <div className="text-4xl mb-3">💬</div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      {translate('Message ASHA Workers')}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {translate('Send instructions and updates')}
                    </p>
                  </button>
                </div>

                {/* Recent Messages */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">{translate('Recent Messages')}</h4>
                  <div className="space-y-3">
                    {[
                      { id: 1, from: 'PHC Supervisor', message: 'Please submit monthly report by tomorrow', time: '2 hours ago', unread: true },
                      { id: 2, from: 'ASHA Sunita', message: 'Priya Sharma needs immediate ANC visit', time: '5 hours ago', unread: true },
                      { id: 3, from: 'District Office', message: 'VHND session scheduled for Feb 5', time: '1 day ago', unread: false },
                      { id: 4, from: 'ASHA Meera', message: 'Completed all scheduled visits for this week', time: '2 days ago', unread: false },
                      { id: 5, from: 'Medical Officer', message: 'Urgent: Stock requisition approved', time: '3 days ago', unread: false }
                    ].map((msg) => (
                      <div
                        key={msg.id}
                        className={`border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow ${
                          msg.unread ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-semibold text-gray-900">{msg.from}</h5>
                              {msg.unread && (
                                <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                              )}
                            </div>
                            <p className="text-sm text-gray-700">{msg.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{msg.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings */}
            {section === 'settings' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  {translate('Settings')}
                </h3>

                <div className="space-y-6">
                  {/* Profile Settings */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">{translate('Profile Information')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {translate('Name')}
                        </label>
                        <input
                          type="text"
                          value={anm.name}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {translate('Phone')}
                        </label>
                        <input
                          type="text"
                          value={anm.phone}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {translate('Email')}
                        </label>
                        <input
                          type="email"
                          value={anm.email}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {translate('PHC')}
                        </label>
                        <input
                          type="text"
                          value={anm.phc}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {translate('Qualification')}
                        </label>
                        <input
                          type="text"
                          value={anm.qualification}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {translate('Experience')}
                        </label>
                        <input
                          type="text"
                          value={anm.experience}
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notifications */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">{translate('Notification Settings')}</h4>
                    <div className="space-y-3">
                      {[
                        { id: 'due_visits', label: 'Due Visit Reminders' },
                        { id: 'stock_alerts', label: 'Stock Level Alerts' },
                        { id: 'asha_messages', label: 'ASHA Messages' },
                        { id: 'phc_notifications', label: 'PHC Notifications' },
                        { id: 'high_risk_alerts', label: 'High Risk Case Alerts' },
                        { id: 'vhnd_reminders', label: 'VHND Session Reminders' }
                      ].map((setting) => (
                        <label key={setting.id} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            defaultChecked
                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="text-gray-700">{translate(setting.label)}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Language & Sync */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">{translate('Other Settings')}</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {translate('Language')}
                        </label>
                        <select className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md">
                          <option>English</option>
                          <option>हिंदी (Hindi)</option>
                          <option>বাংলা (Bengali)</option>
                          <option>தமிழ் (Tamil)</option>
                          <option>తెలుగు (Telugu)</option>
                        </select>
                      </div>
                      <div className="flex gap-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          {translate('Sync Data Now')}
                        </button>
                        <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                          {translate('Export Data')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Help / Guidelines */}
            {section === 'help' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  {translate('Help & Guidelines')}
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">{translate('Standard Operating Procedures')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'ANC Visit SOP', icon: '📋', category: 'Pregnancy' },
                        { title: 'PNC Visit SOP', icon: '📋', category: 'Postnatal' },
                        { title: 'Immunization SOP', icon: '💉', category: 'Child Health' },
                        { title: 'VHND Guidelines', icon: '📚', category: 'VHND' },
                        { title: 'Referral Protocol', icon: '🏥', category: 'Referrals' },
                        { title: 'Stock Management Guide', icon: '📦', category: 'Stock' },
                        { title: 'ASHA Supervision Guide', icon: '⭐', category: 'Supervision' },
                        { title: 'Data Recording Manual', icon: '📊', category: 'Documentation' }
                      ].map((sop, index) => (
                        <button
                          key={index}
                          onClick={() => alert(`Opening ${sop.title}...`)}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{sop.icon}</div>
                            <div>
                              <h5 className="font-medium text-gray-800">{sop.title}</h5>
                              <p className="text-xs text-gray-500">{sop.category}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">{translate('Training Videos')}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { title: 'Safe Delivery Practices', duration: '15 min', views: 245 },
                        { title: 'Newborn Care', duration: '12 min', views: 189 },
                        { title: 'Infection Prevention', duration: '18 min', views: 167 },
                        { title: 'ANC Examination', duration: '20 min', views: 203 },
                        { title: 'Growth Monitoring', duration: '14 min', views: 156 },
                        { title: 'Family Planning Counseling', duration: '16 min', views: 178 }
                      ].map((video, index) => (
                        <button
                          key={index}
                          onClick={() => alert(`Playing ${video.title}...`)}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow text-left"
                        >
                          <div className="text-3xl mb-2">🎥</div>
                          <h5 className="font-medium text-gray-800 text-sm mb-1">{video.title}</h5>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{video.duration}</span>
                            <span>{video.views} views</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-800 mb-2">{translate('Need Help?')}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {translate('Contact PHC supervisor or technical support')}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                        {translate('Call Support')}
                      </button>
                      <button className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                        {translate('Send Message')}
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        {translate('Emergency Contact')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}