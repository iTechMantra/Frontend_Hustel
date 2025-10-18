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

export default function AnmDashboard() {
  const [anm, setAnm] = useState(null);
  const [section, setSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);
  const [ashaWorkers, setAshaWorkers] = useState([]);

  // ANM-managed beneficiaries
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
      ashaName: 'ASHA Sunita'
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
      status: 'Normal',
      ashaId: 'asha_001',
      ashaName: 'ASHA Sunita'
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
      ashaName: 'ASHA Meera'
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
      status: 'Underweight',
      ashaId: 'asha_001',
      ashaName: 'ASHA Sunita'
    }
  ]);

  // ASHA workers under this ANM
  const [ashaList] = useState([
    {
      id: 'asha_001',
      name: 'ASHA Sunita',
      phone: '+91 99999 11111',
      village: 'Rampur',
      beneficiaries: 25,
      visitsThisMonth: 18,
      pendingTasks: 7,
      performance: 85
    },
    {
      id: 'asha_002',
      name: 'ASHA Meera',
      phone: '+91 99999 22222',
      village: 'Rampur',
      beneficiaries: 22,
      visitsThisMonth: 20,
      pendingTasks: 3,
      performance: 92
    },
    {
      id: 'asha_003',
      name: 'ASHA Radha',
      phone: '+91 99999 33333',
      village: 'Rampur',
      beneficiaries: 28,
      visitsThisMonth: 15,
      pendingTasks: 10,
      performance: 78
    }
  ]);

  // Due visits schedule
  const [dueList] = useState([
    {
      id: 'due_001',
      beneficiaryName: 'Priya Sharma',
      village: 'Rampur',
      type: 'ANC Visit 4',
      dueDate: '2024-02-05',
      ashaName: 'ASHA Sunita',
      priority: 'High'
    },
    {
      id: 'due_002',
      beneficiaryName: 'Baby Arun Kumar',
      village: 'Rampur',
      type: 'Immunization - DPT',
      dueDate: '2024-02-08',
      ashaName: 'ASHA Sunita',
      priority: 'Medium'
    },
    {
      id: 'due_003',
      beneficiaryName: 'Sunita Devi',
      village: 'Rampur',
      type: 'PNC Visit 2',
      dueDate: '2024-02-03',
      ashaName: 'ASHA Meera',
      priority: 'High'
    }
  ]);

  // Stock management
  const [stockItems] = useState([
    {
      id: 'stock_001',
      name: 'BCG Vaccine',
      category: 'Vaccines',
      quantity: 45,
      unit: 'doses',
      minLevel: 50,
      status: 'Low',
      expiryDate: '2024-12-31'
    },
    {
      id: 'stock_002',
      name: 'OPV Drops',
      category: 'Vaccines',
      quantity: 120,
      unit: 'doses',
      minLevel: 100,
      status: 'Good',
      expiryDate: '2024-11-30'
    },
    {
      id: 'stock_003',
      name: 'Iron Tablets (IFA)',
      category: 'Drugs',
      quantity: 800,
      unit: 'tablets',
      minLevel: 500,
      status: 'Good',
      expiryDate: '2025-06-30'
    },
    {
      id: 'stock_004',
      name: 'Tetanus Toxoid',
      category: 'Vaccines',
      quantity: 25,
      unit: 'vials',
      minLevel: 30,
      status: 'Low',
      expiryDate: '2024-10-31'
    }
  ]);

  // Service delivery forms
  const [serviceTypes] = useState([
    { id: 'anc', name: 'ANC Visit', icon: '🤰' },
    { id: 'pnc', name: 'PNC Visit', icon: '👶' },
    { id: 'immunization', name: 'Immunization', icon: '💉' },
    { id: 'growth', name: 'Growth Monitoring', icon: '📏' },
    { id: 'family_planning', name: 'Family Planning', icon: '👨‍👩‍👧' },
    { id: 'nutrition', name: 'Nutrition Counseling', icon: '🍎' }
  ]);

  // Reports data
  const [reportsData] = useState({
    coverage: {
      anc: { target: 50, achieved: 45, percentage: 90 },
      pnc: { target: 40, achieved: 38, percentage: 95 },
      immunization: { target: 60, achieved: 52, percentage: 87 },
      familyPlanning: { target: 30, achieved: 28, percentage: 93 }
    },
    highRiskCases: 5,
    vhndSessions: 4,
    ashaPerformance: 85
  });

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      alert('Please login first');
      return;
    }
    setAnm(currentUser);
    setLoading(false);
  }, []);

  const handleLogout = () => {
    alert('Logging out...');
  };

  const handleBeneficiarySelect = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
    setSection('beneficiary_details');
  };

  const handleServiceDelivery = (serviceType) => {
    alert(`Opening ${serviceType.name} form...`);
  };

  const handleStockRequisition = () => {
    alert('Opening stock requisition form...');
  };

  const handleReferralCreate = () => {
    alert('Creating referral to PHC/CHC...');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{translate('Loading dashboard...')}</p>
        </div>
      </div>
    );
  }

  if (!anm) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col border-r">
        <div className="p-5 border-b bg-gradient-to-r from-orange-600 to-yellow-600">
          <h2 className="text-lg font-bold text-white">ANM Dashboard</h2>
          <p className="text-orange-100 text-xs mt-1">Service Delivery & Supervision</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { key: 'home', label: 'Home / Dashboard', icon: '📊' },
            { key: 'beneficiaries', label: 'Beneficiary Management', icon: '👥' },
            { key: 'due_list', label: 'Due List / Visit Planner', icon: '📅' },
            { key: 'service_delivery', label: 'Service Delivery Forms', icon: '📋' },
            { key: 'stock', label: 'Stock Management', icon: '📦' },
            { key: 'referrals', label: 'Referrals', icon: '🏥' },
            { key: 'education', label: 'Health Education Material', icon: '📚' },
            { key: 'reports', label: 'Reports / Analytics', icon: '📈' },
            { key: 'asha_performance', label: 'ASHA Performance Monitoring', icon: '⭐' },
            { key: 'chat', label: 'Messages / Video', icon: '💬' },
            { key: 'settings', label: 'Settings', icon: '⚙️' },
            { key: 'help', label: 'Help / Guidelines', icon: '❓' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all flex items-center gap-3 text-sm ${
                section === item.key 
                  ? "bg-orange-600 text-white shadow-md" 
                  : "hover:bg-orange-50 text-gray-700"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="mb-3 p-3 bg-yellow-50 rounded-lg">
            <p className="text-xs font-semibold text-yellow-900">{anm.name}</p>
            <p className="text-xs text-yellow-700">ANM - {anm.phc}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full px-3 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>🚪</span> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b px-6 py-4 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                {section === 'home' ? 'Dashboard' : 
                 section === 'beneficiaries' ? 'Beneficiary Management' :
                 section === 'due_list' ? 'Due List / Visit Planner' :
                 section === 'service_delivery' ? 'Service Delivery Forms' :
                 section === 'stock' ? 'Stock Management' :
                 section === 'referrals' ? 'Referrals' :
                 section === 'education' ? 'Health Education Material' :
                 section === 'reports' ? 'Reports & Analytics' :
                 section === 'asha_performance' ? 'ASHA Performance Monitoring' :
                 section === 'chat' ? 'Messages & Video Consultation' :
                 section === 'settings' ? 'Settings' :
                 section === 'help' ? 'Help & Guidelines' : 'ANM Dashboard'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">{anm.phc}, {anm.area}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                <span>📅</span>
                Feb 1, 2024
              </button>
              <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm font-medium">
                <span>📥</span>
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* HOME / DASHBOARD */}
          {section === 'home' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-orange-600 to-yellow-600 p-6 rounded-xl shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {anm.name}!</h2>
                <p className="opacity-90">Monitor service delivery, track beneficiary health, and supervise ASHA workers</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">{beneficiaries.length}</p>
                      <p className="text-gray-600 text-sm mt-1">Total Beneficiaries</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <span className="text-blue-600 text-xl">👥</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span className="mr-1">📈</span> +12% from last month
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{reportsData.coverage.anc.percentage}%</p>
                      <p className="text-gray-600 text-sm mt-1">ANC Coverage</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <span className="text-green-600 text-xl">🤰</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <span className="mr-1">📈</span> +5% from last month
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-orange-600">{reportsData.highRiskCases}</p>
                      <p className="text-gray-600 text-sm mt-1">High Risk Cases</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <span className="text-orange-600 text-xl">⚠️</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-orange-600">
                    <span className="mr-1">👁️</span> Requires attention
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">{stockItems.filter(item => item.status === 'Low').length}</p>
                      <p className="text-gray-600 text-sm mt-1">Low Stock Alerts</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <span className="text-purple-600 text-xl">📦</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-red-600">
                    <span className="mr-1">🚨</span> Action required
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="text-orange-600">📊</span>
                    Service Coverage Overview
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(reportsData.coverage).map(([key, data]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="font-bold">{data.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              data.percentage >= 90 ? 'bg-green-500' : 
                              data.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Achieved: {data.achieved}</span>
                          <span>Target: {data.target}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="text-orange-600">📅</span>
                    Today's Due Visits
                  </h3>
                  <div className="space-y-3">
                    {dueList.filter(visit => visit.priority === 'High').slice(0, 4).map((visit) => (
                      <div key={visit.id} className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">{visit.beneficiaryName}</p>
                          <p className="text-xs text-gray-600">{visit.type} - {visit.village}</p>
                        </div>
                        <button className="px-3 py-1 bg-orange-600 text-white text-sm rounded-md hover:bg-orange-700">
                          Schedule
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="text-orange-600">🚨</span>
                    Stock Alerts
                  </h3>
                  <div className="space-y-3">
                    {stockItems.filter(item => item.status === 'Low').slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div>
                          <p className="font-semibold text-sm">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            Current: {item.quantity} {item.unit} | Min Level: {item.minLevel} {item.unit}
                          </p>
                        </div>
                        <button className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
                          Reorder
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <span className="text-orange-600">⭐</span>
                    Top Performing ASHAs
                  </h3>
                  <div className="space-y-3">
                    {ashaList.sort((a, b) => b.performance - a.performance).slice(0, 3).map((asha) => (
                      <div key={asha.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-700 font-bold text-sm">{asha.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{asha.name}</p>
                            <p className="text-xs text-gray-600">{asha.village}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-orange-600">{asha.performance}%</p>
                          <p className="text-xs text-gray-500">Performance</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BENEFICIARY MANAGEMENT */}
          {section === 'beneficiaries' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <span className="text-orange-600">👥</span>
                    Beneficiary Management
                  </h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400">🔍</span>
                      <input 
                        type="text" 
                        placeholder="Search beneficiaries..." 
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                      />
                    </div>
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm">
                      <span>➕</span> Add Beneficiary
                    </button>
                  </div>
                </div>
                
                <div className="flex gap-2 mb-6">
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700">
                    All ({beneficiaries.length})
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Pregnant Women ({beneficiaries.filter(b => b.category === 'Pregnant Woman').length})
                  </button>
                  <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300">
                    Children ({beneficiaries.filter(b => b.category === 'Child').length})
                  </button>
                </div>

                <div className="space-y-4">
                  {beneficiaries.map((beneficiary) => (
                    <div
                      key={beneficiary.id}
                      className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleBeneficiarySelect(beneficiary)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-lg text-gray-800">{beneficiary.name}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              beneficiary.status === 'High Risk' 
                                ? 'bg-red-100 text-red-700'
                                : beneficiary.status === 'Underweight'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {beneficiary.status}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Age: {beneficiary.age < 2 ? `${beneficiary.age * 12} months` : `${beneficiary.age} years`}</p>
                              <p className="text-gray-600">Gender: {beneficiary.gender}</p>
                              <p className="text-gray-600">Village: {beneficiary.village}</p>
                            </div>
                            <div>
                              {beneficiary.category === 'Pregnant Woman' && (
                                <>
                                  <p className="text-gray-600">EDD: {beneficiary.edd}</p>
                                  <p className="text-gray-600">ANC Visits: {beneficiary.ancVisits}</p>
                                </>
                              )}
                              {beneficiary.category === 'Child' && (
                                <>
                                  <p className="text-gray-600">Weight: {beneficiary.weight}</p>
                                  <p className="text-gray-600">Immunization: {beneficiary.immunizationStatus}</p>
                                </>
                              )}
                              <p className="text-gray-600">ASHA: {beneficiary.ashaName}</p>
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 text-sm font-medium flex items-center gap-2">
                          <span>👁️</span> View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DUE LIST / VISIT PLANNER */}
          {section === 'due_list' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <span className="text-orange-600">📅</span>
                    Auto-Generated Visit Schedule
                  </h3>
                  <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm">
                    <span>📋</span> Generate Report
                  </button>
                </div>

                <div className="space-y-4">
                  {dueList.map((visit) => (
                    <div
                      key={visit.id}
                      className={`border-2 p-5 rounded-xl hover:shadow-md transition-shadow ${
                        visit.priority === 'High' 
                          ? 'border-red-300 bg-red-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-lg">{visit.beneficiaryName}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              visit.priority === 'High'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {visit.priority} Priority
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600"><strong>Visit Type:</strong> {visit.type}</p>
                              <p className="text-gray-600"><strong>Village:</strong> {visit.village}</p>
                            </div>
                            <div>
                              <p className="text-gray-600"><strong>Due Date:</strong> {visit.dueDate}</p>
                              <p className="text-gray-600"><strong>Assigned ASHA:</strong> {visit.ashaName}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm">
                            Schedule
                          </button>
                          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm">
                            Notify ASHA
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SERVICE DELIVERY FORMS */}
          {section === 'service_delivery' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-orange-600">📋</span>
                  Service Delivery Forms
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {serviceTypes.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceDelivery(service)}
                      className="border-2 border-gray-200 p-6 rounded-xl hover:shadow-lg transition-shadow text-left hover:border-orange-600"
                    >
                      <div className="text-4xl mb-3">{service.icon}</div>
                      <h4 className="font-semibold text-gray-800 mb-2">{service.name}</h4>
                      <p className="text-sm text-gray-600">
                        Record {service.name.toLowerCase()} details and observations
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STOCK MANAGEMENT */}
          {section === 'stock' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <span className="text-orange-600">📦</span>
                    Stock Management
                  </h3>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <span>🔍</span> Filter
                    </button>
                    <button 
                      onClick={handleStockRequisition}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm"
                    >
                      <span>📝</span> Requisition / Issue
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-2xl font-bold text-red-600">{stockItems.filter(item => item.status === 'Low').length}</p>
                    <p className="text-sm text-gray-600">Critical</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-2xl font-bold text-orange-600">2</p>
                    <p className="text-sm text-gray-600">Low</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                    <p className="text-sm text-gray-600">Moderate</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-2xl font-bold text-green-600">{stockItems.filter(item => item.status === 'Good').length}</p>
                    <p className="text-sm text-gray-600">Sufficient</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Unit</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Min Level</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expiry</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {stockItems.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{item.name}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">{item.category}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-lg">{item.quantity}</span>
                          </td>
                          <td className="px-4 py-3">{item.unit}</td>
                          <td className="px-4 py-3 text-gray-500">{item.minLevel}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.status === 'Low' ? 'text-red-600 bg-red-50' :
                              item.status === 'Good' ? 'text-green-600 bg-green-50' :
                              'text-yellow-600 bg-yellow-50'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs">{item.expiryDate}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-blue-50 rounded">
                                <span className="text-blue-600">👁️</span>
                              </button>
                              <button className="p-1 hover:bg-green-50 rounded">
                                <span className="text-green-600">➕</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* REFERRALS */}
          {section === 'referrals' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <span className="text-orange-600">🏥</span>
                    Referrals Management
                  </h3>
                  <button 
                    onClick={handleReferralCreate}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm"
                  >
                    <span>📝</span> Create Referral
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
                      status: 'Completed'
                    },
                    {
                      id: 'ref_002',
                      beneficiaryName: 'Baby Arun Kumar',
                      reason: 'Underweight - severe malnutrition',
                      referredTo: 'CHC Nutrition Center',
                      referredBy: 'ASHA Sunita',
                      date: '2024-01-22',
                      status: 'Pending'
                    }
                  ].map((referral) => (
                    <div
                      key={referral.id}
                      className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-lg">{referral.beneficiaryName}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              referral.status === 'Completed' ? 'bg-green-100 text-green-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {referral.status}
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600"><strong>Reason:</strong> {referral.reason}</p>
                              <p className="text-gray-600"><strong>Referred To:</strong> {referral.referredTo}</p>
                            </div>
                            <div>
                              <p className="text-gray-600"><strong>Date:</strong> {referral.date}</p>
                              <p className="text-gray-600"><strong>Referred By:</strong> {referral.referredBy}</p>
                            </div>
                          </div>
                        </div>
                        <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium">
                          Track
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HEALTH EDUCATION MATERIAL */}
          {section === 'education' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-orange-600">📚</span>
                  Health Education & Counselling Material
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { id: 1, title: 'ANC Guidelines', type: 'PDF', icon: '📄', category: 'Pregnancy' },
                    { id: 2, title: 'Immunization Schedule', type: 'Chart', icon: '📊', category: 'Child Health' },
                    { id: 3, title: 'Nutrition Guidelines', type: 'PDF', icon: '📄', category: 'Nutrition' },
                    { id: 4, title: 'Family Planning Methods', type: 'Video', icon: '🎥', category: 'Family Planning' },
                    { id: 5, title: 'Newborn Care Guide', type: 'PDF', icon: '📄', category: 'Child Health' },
                    { id: 6, title: 'Hygiene Practices', type: 'Poster', icon: '🖼️', category: 'General Health' }
                  ].map((material) => (
                    <div
                      key={material.id}
                      className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow cursor-pointer hover:border-orange-600"
                      onClick={() => alert(`Opening ${material.title}...`)}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-lg ${
                          material.type === 'PDF' ? 'bg-red-100' :
                          material.type === 'Video' ? 'bg-blue-100' :
                          material.type === 'Chart' ? 'bg-green-100' : 'bg-purple-100'
                        }`}>
                          <span className="text-2xl">{material.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-2">{material.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">{material.type}</span>
                            <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">{material.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REPORTS & ANALYTICS */}
          {section === 'reports' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-orange-600">📈</span>
                  Monthly Reports & Analytics
                </h3>

                {/* Service Coverage */}
                <div className="mb-8">
                  <h4 className="font-medium text-gray-800 mb-4">Service Coverage</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(reportsData.coverage).map(([key, data]) => (
                      <div key={key} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-800 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h5>
                          <span className="text-lg font-bold text-orange-600">{data.percentage}%</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          Achieved: {data.achieved} / Target: {data.target}
                        </p>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-orange-600 h-3 rounded-full transition-all"
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-purple-600 mb-2">{reportsData.vhndSessions}</div>
                      <p className="text-gray-600">VHND Sessions This Month</p>
                    </div>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-600 mb-2">{reportsData.highRiskCases}</div>
                      <p className="text-gray-600">High-Risk Cases Under Monitoring</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">{reportsData.ashaPerformance}%</div>
                      <p className="text-gray-600">Average ASHA Performance</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ASHA PERFORMANCE MONITORING */}
          {section === 'asha_performance' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-orange-600">⭐</span>
                  ASHA Performance Monitoring
                </h3>

                <div className="space-y-4">
                  {ashaList.map((asha) => (
                    <div
                      key={asha.id}
                      className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-700 font-bold text-lg">{asha.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{asha.name}</h4>
                            <p className="text-sm text-gray-600">{asha.village} | {asha.phone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${
                            asha.performance >= 90 ? 'text-green-600' :
                            asha.performance >= 75 ? 'text-orange-600' :
                            'text-red-600'
                          }`}>
                            {asha.performance}%
                          </div>
                          <p className="text-xs text-gray-500">Performance</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
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
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                          View Details
                        </button>
                        <button className="flex-1 px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 text-sm">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES / VIDEO */}
          {section === 'chat' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-orange-600">💬</span>
                  Messages & Video Consultation
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <button
                    onClick={() => alert('Starting video call with PHC/CHC...')}
                    className="border-2 border-orange-600 rounded-xl p-6 hover:bg-orange-50 transition-colors text-left"
                  >
                    <div className="text-4xl mb-3">📹</div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Video Call with PHC/CHC
                    </h4>
                    <p className="text-sm text-gray-600">
                      Connect with doctors for consultations and case discussions
                    </p>
                  </button>

                  <button
                    onClick={() => alert('Opening ASHA messaging...')}
                    className="border-2 border-blue-600 rounded-xl p-6 hover:bg-blue-50 transition-colors text-left"
                  >
                    <div className="text-4xl mb-3">💬</div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Message ASHA Workers
                    </h4>
                    <p className="text-sm text-gray-600">
                      Send instructions, updates, and coordinate field visits
                    </p>
                  </button>
                </div>

                {/* Recent Messages */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-4">Recent Messages</h4>
                  <div className="space-y-3">
                    {[
                      { id: 1, from: 'PHC Supervisor', message: 'Please submit monthly report by tomorrow', time: '2 hours ago', unread: true },
                      { id: 2, from: 'ASHA Sunita', message: 'Priya Sharma needs immediate ANC visit', time: '5 hours ago', unread: true },
                      { id: 3, from: 'District Office', message: 'VHND session scheduled for Feb 5', time: '1 day ago', unread: false }
                    ].map((msg) => (
                      <div
                        key={msg.id}
                        className={`border-2 p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow ${
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
            </div>
          )}

          {/* SETTINGS */}
          {section === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-orange-600">⚙️</span>
                  Settings & Configuration
                </h3>
                
                <div className="grid gap-6">
                  {/* Profile Settings */}
                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="text-orange-600">👤</span>
                      Profile Information
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                          value={anm.name}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                          value={anm.phone}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input 
                          type="email" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                          value={anm.email}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PHC</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500" 
                          value={anm.phc}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="text-orange-600">🔔</span>
                      Notification Preferences
                    </h4>
                    <div className="space-y-4">
                      {[
                        { id: 'due_visits', label: 'Due Visit Reminders', description: 'Get alerts for upcoming visits' },
                        { id: 'stock_alerts', label: 'Stock Level Alerts', description: 'Notify when stock falls below threshold' },
                        { id: 'asha_messages', label: 'ASHA Messages', description: 'Receive messages from ASHA workers' },
                        { id: 'phc_notifications', label: 'PHC Notifications', description: 'Important updates from PHC' }
                      ].map((setting) => (
                        <label key={setting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <div>
                            <p className="font-medium">{setting.label}</p>
                            <p className="text-sm text-gray-500">{setting.description}</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600" />
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Data Sync */}
                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="text-orange-600">🔄</span>
                      Data Synchronization
                    </h4>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">Enable Auto Sync</p>
                          <p className="text-sm text-gray-500">Automatically sync data with central server</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600" />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">Offline Mode</p>
                          <p className="text-sm text-gray-500">Allow data entry when offline</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-600" />
                      </label>
                      <div>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                          Sync Data Now
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Language Settings */}
                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <span className="text-orange-600">🌐</span>
                      Language & Region
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select className="w-full md:w-64 border rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                          <option>English</option>
                          <option>हिंदी (Hindi)</option>
                          <option>বাংলা (Bengali)</option>
                          <option>ਪੰਜਾਬੀ (Punjabi)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HELP & GUIDELINES */}
          {section === 'help' && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <span className="text-orange-600">❓</span>
                  Help & Guidelines
                </h3>

                <div className="space-y-6">
                  {/* SOPs */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">Standard Operating Procedures</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: 'ANC Visit SOP', icon: '📋', category: 'Maternal Health' },
                        { title: 'PNC Visit SOP', icon: '📋', category: 'Child Health' },
                        { title: 'Immunization SOP', icon: '💉', category: 'Child Health' },
                        { title: 'VHND Guidelines', icon: '📚', category: 'Community Health' },
                        { title: 'Referral Protocol', icon: '🏥', category: 'Emergency' },
                        { title: 'Stock Management Guide', icon: '📦', category: 'Logistics' }
                      ].map((sop, index) => (
                        <button
                          key={index}
                          onClick={() => alert(`Opening ${sop.title}...`)}
                          className="border-2 border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow text-left hover:border-orange-600"
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

                  {/* Training Materials */}
                  <div>
                    <h4 className="font-medium text-gray-800 mb-4">Training Videos & Materials</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        'Safe Delivery Practices',
                        'Newborn Care',
                        'Infection Prevention',
                        'Growth Monitoring',
                        'Family Planning Counseling',
                        'Emergency Response'
                      ].map((video, index) => (
                        <button
                          key={index}
                          onClick={() => alert(`Playing ${video}...`)}
                          className="border-2 border-gray-200 p-4 rounded-xl hover:shadow-md transition-shadow hover:border-orange-600"
                        >
                          <div className="text-3xl mb-2">🎥</div>
                          <h5 className="font-medium text-gray-800 text-sm">{video}</h5>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Support */}
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <h4 className="font-medium text-gray-800 mb-2">Need Help?</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Contact PHC supervisor or technical support for assistance
                    </p>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Call Support
                      </button>
                      <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}