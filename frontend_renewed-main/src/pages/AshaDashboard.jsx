// src/pages/AshaDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import storageService from '../services/storageService';
import { translate } from '../services/translationService';
import JitsiMeetingWrapper from '../components/JitsiMeetingWrapper';
import { 
  Users, Home, Calendar, ClipboardList, BookOpen, TrendingUp, 
  Award, Bell, FileText, Settings, HelpCircle, LogOut, 
  Phone, MessageSquare, Plus, Eye, Download, Activity,
  CheckCircle, Clock, AlertCircle, MapPin, UserPlus,
  Baby, Heart, Stethoscope, Shield, UserCheck, FileSearch
} from 'lucide-react';

// Dummy data for ASHA dashboard
const BENEFICIARIES = [
  { id: "b1", type: "Pregnant Women", total: 25, highRisk: 5, registered: 22, anc1: 20, anc4: 18, institutional: 21 },
  { id: "b2", type: "Children (0-5 yrs)", total: 45, highRisk: 3, fullyImmunized: 38, partialImmunized: 5, notImmunized: 2 },
  { id: "b3", type: "Eligible Couples", total: 18, highRisk: 2, sterilization: 4, iud: 6, pills: 5, condoms: 3 },
  { id: "b4", type: "Adolescents", total: 32, highRisk: 4, counseled: 28, anemic: 8, normal: 24 },
];

const DUE_LIST = [
  { id: "d1", type: "ANC Visit", patient: "Priya Sharma", date: "2025-10-05", status: "Due", priority: "High" },
  { id: "d2", type: "Immunization", patient: "Baby Rohan", date: "2025-10-03", status: "Overdue", priority: "Critical" },
  { id: "d3", type: "PNC Visit", patient: "Sunita Devi", date: "2025-10-07", status: "Due", priority: "Medium" },
  { id: "d4", type: "Family Planning", patient: "Laxmi Bai", date: "2025-10-10", status: "Due", priority: "Medium" },
  { id: "d5", type: "Growth Monitoring", patient: "Baby Aisha", date: "2025-10-04", status: "Due", priority: "High" },
];

const HOME_VISITS = [
  { id: "v1", type: "ANC", patient: "Priya Sharma", date: "2025-09-28", status: "Completed", checklist: ["BP Check", "Weight", "Hb Test", "Counseling"] },
  { id: "v2", type: "Immunization", patient: "Baby Rohan", date: "2025-09-29", status: "Completed", checklist: ["BCG", "OPV", "Pentavalent"] },
  { id: "v3", type: "PNC", patient: "Sunita Devi", date: "2025-09-30", status: "Pending", checklist: ["Breastfeeding", "Nutrition", "Hygiene"] },
  { id: "v4", type: "Newborn Care", patient: "Baby Aisha", date: "2025-10-01", status: "Scheduled", checklist: ["Weight", "Feeding", "Cord Care"] },
];

const REFERRALS = [
  { id: "r1", date: "2025-09-28", patient: "Radha Kumari", age: 26, reason: "High BP during ANC (160/110)", to: "PHC Balarampur", status: "Pending", priority: "High" },
  { id: "r2", date: "2025-09-27", patient: "Pooja Sharma", age: 28, reason: "Severe Anemia (Hb 6.2)", to: "ANM Rekha Singh", status: "Completed", priority: "Critical" },
  { id: "r3", date: "2025-09-26", patient: "Mohan Das", age: 45, reason: "Persistent cough, TB Symptoms", to: "PHC Doctor", status: "In Progress", priority: "Medium" },
];

const INCENTIVES = [
  { id: "i1", task: "ANC Registration", count: 8, amount: 800, status: "Approved", date: "2025-09-25" },
  { id: "i2", task: "Institutional Delivery", count: 3, amount: 600, status: "Pending", date: "2025-09-28" },
  { id: "i3", task: "Immunization", count: 12, amount: 300, status: "Approved", date: "2025-09-20" },
  { id: "i4", task: "Family Planning", count: 5, amount: 250, status: "Approved", date: "2025-09-22" },
];

const NOTIFICATIONS = [
  { id: "n1", date: "2025-09-30", time: "10:30 AM", priority: "High", title: "VHND Session", body: "Village Health & Nutrition Day scheduled for Oct 5 at Anganwadi Center", from: "ANM Rekha Singh", read: false },
  { id: "n2", date: "2025-09-29", time: "02:15 PM", priority: "Medium", title: "Training Update", body: "New ANC counseling guidelines available. Please review by Oct 10.", from: "PHC Supervisor", read: false },
  { id: "n3", date: "2025-09-28", time: "09:00 AM", priority: "High", title: "High Risk Case", body: "Priya Sharma (6 months pregnant) identified as high risk. Monitor closely.", from: "ANM", read: true },
];

const HEALTH_EDUCATION = [
  { id: "e1", title: "ANC Counseling Guide", type: "PDF", category: "Maternal Health", size: "2.5 MB", downloads: 45 },
  { id: "e2", title: "Newborn Care Video", type: "Video", category: "Child Health", size: "125 MB", downloads: 38 },
  { id: "e3", title: "Nutrition Guide", type: "PDF", category: "Nutrition", size: "1.8 MB", downloads: 52 },
  { id: "e4", title: "Family Planning Methods", type: "PDF", category: "Family Planning", size: "950 KB", downloads: 67 },
];

// Registration forms data
const REGISTRATION_TYPES = [
  { id: "pregnancy", label: "New Pregnancy", icon: <Heart className="w-5 h-5" />, color: "bg-pink-100 text-pink-600" },
  { id: "infant", label: "New Infant/Birth", icon: <Baby className="w-5 h-5" />, color: "bg-blue-100 text-blue-600" },
  { id: "child", label: "Child Registration", icon: <Users className="w-5 h-5" />, color: "bg-green-100 text-green-600" },
  { id: "family", label: "Family Registration", icon: <UserPlus className="w-5 h-5" />, color: "bg-purple-100 text-purple-600" },
  { id: "eligible_couple", label: "Eligible Couple", icon: <UserCheck className="w-5 h-5" />, color: "bg-orange-100 text-orange-600" },
  { id: "scheme", label: "Scheme Enrollment", icon: <Shield className="w-5 h-5" />, color: "bg-indigo-100 text-indigo-600" },
];

export default function AshaDashboard() {
  const navigate = useNavigate();
  const [asha, setAsha] = useState(null);
  const [section, setSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedRegistrationType, setSelectedRegistrationType] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({});

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c"];

  useEffect(() => {
    let currentUser = null;
    (async () => {
      currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate('/asha/login');
        return;
      }
      setAsha(currentUser);
      setLoading(false);
    })();
  }, [navigate]);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "Critical": return "bg-red-100 text-red-700";
      case "High": return "bg-orange-100 text-orange-700";
      default: return "bg-blue-100 text-blue-700";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Pending": return <Clock className="w-4 h-4 text-orange-600" />;
      case "Scheduled": return <Calendar className="w-4 h-4 text-blue-600" />;
      case "Overdue": return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleRegistrationTypeSelect = (type) => {
    setSelectedRegistrationType(type);
    setRegistrationForm({ type: type.id });
  };

  const handleRegistrationSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Registration form submitted:', registrationForm);
    setShowRegistrationModal(false);
    setSelectedRegistrationType(null);
    setRegistrationForm({});
    // Show success message
    alert('Registration submitted successfully!');
  };

  const renderRegistrationForm = () => {
    if (!selectedRegistrationType) return null;

    const baseFields = [
      { name: 'fullName', label: 'Full Name', type: 'text', required: true },
      { name: 'age', label: 'Age', type: 'number', required: true },
      { name: 'contactNumber', label: 'Contact Number', type: 'tel', required: true },
      { name: 'address', label: 'Address', type: 'textarea', required: true },
    ];

    const specificFields = {
      pregnancy: [
        { name: 'lmpDate', label: 'Last Menstrual Period Date', type: 'date', required: true },
        { name: 'edd', label: 'Expected Delivery Date', type: 'date', required: true },
        { name: 'gravida', label: 'Gravida', type: 'number', required: true },
        { name: 'para', label: 'Para', type: 'number', required: true },
        { name: 'highRiskFactors', label: 'High Risk Factors', type: 'textarea', required: false },
      ],
      infant: [
        { name: 'dateOfBirth', label: 'Date of Birth', type: 'date', required: true },
        { name: 'gender', label: 'Gender', type: 'select', options: ['Male', 'Female'], required: true },
        { name: 'birthWeight', label: 'Birth Weight (kg)', type: 'number', step: '0.1', required: true },
        { name: 'motherName', label: "Mother's Name", type: 'text', required: true },
        { name: 'deliveryType', label: 'Delivery Type', type: 'select', options: ['Normal', 'C-Section'], required: true },
      ],
      family: [
        { name: 'familyHead', label: 'Family Head Name', type: 'text', required: true },
        { name: 'familyMembers', label: 'Number of Family Members', type: 'number', required: true },
        { name: 'rationCardNumber', label: 'Ration Card Number', type: 'text', required: false },
        { name: 'belowPovertyLine', label: 'Below Poverty Line', type: 'checkbox', required: false },
      ],
      scheme: [
        { name: 'schemeType', label: 'Scheme Type', type: 'select', options: ['Ayushman Bharat', 'JSY', 'JSSK', 'PMJAY'], required: true },
        { name: 'schemeId', label: 'Scheme ID/Number', type: 'text', required: true },
        { name: 'eligibilityDocument', label: 'Eligibility Document', type: 'file', required: false },
      ]
    };

    const fields = [...baseFields, ...(specificFields[selectedRegistrationType.id] || [])];

    return (
      <form onSubmit={handleRegistrationSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {fields.map((field) => (
            <div key={field.name} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  rows="3"
                  value={registrationForm[field.name] || ''}
                  onChange={(e) => setRegistrationForm({...registrationForm, [field.name]: e.target.value})}
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={registrationForm[field.name] || ''}
                  onChange={(e) => setRegistrationForm({...registrationForm, [field.name]: e.target.value})}
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  checked={registrationForm[field.name] || false}
                  onChange={(e) => setRegistrationForm({...registrationForm, [field.name]: e.target.checked})}
                />
              ) : field.type === 'file' ? (
                <input
                  type="file"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  onChange={(e) => setRegistrationForm({...registrationForm, [field.name]: e.target.files[0]})}
                />
              ) : (
                <input
                  type={field.type}
                  step={field.step}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  value={registrationForm[field.name] || ''}
                  onChange={(e) => setRegistrationForm({...registrationForm, [field.name]: e.target.value})}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold"
          >
            Submit Registration
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedRegistrationType(null);
              setRegistrationForm({});
            }}
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold"
          >
            Back to Types
          </button>
        </div>
      </form>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!asha) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">
                  {selectedRegistrationType ? `Register ${selectedRegistrationType.label}` : 'New Registration'}
                </h3>
                <button
                  onClick={() => {
                    setShowRegistrationModal(false);
                    setSelectedRegistrationType(null);
                    setRegistrationForm({});
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              {!selectedRegistrationType ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {REGISTRATION_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleRegistrationTypeSelect(type)}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:shadow-md transition-all hover:border-purple-300 text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${type.color}`}>
                          {type.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{type.label}</h4>
                          <p className="text-sm text-gray-600 mt-1">Click to register new {type.label.toLowerCase()}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                renderRegistrationForm()
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col border-r">
        <div className="p-5 border-b bg-gradient-to-r from-purple-600 to-purple-700">
          <h2 className="text-lg font-bold text-white">ASHA Dashboard</h2>
          <p className="text-purple-100 text-xs mt-1">Community Health Worker</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { key: "home", label: "Home / Overview", icon: <Home className="w-4 h-4" /> },
            { key: "beneficiaries", label: "My Beneficiaries", icon: <Users className="w-4 h-4" /> },
            { key: "registration", label: "Patient Registration", icon: <UserPlus className="w-4 h-4" /> },
            { key: "due_list", label: "Due List / Reminders", icon: <Calendar className="w-4 h-4" /> },
            { key: "home_visits", label: "Home Visit Checklist", icon: <ClipboardList className="w-4 h-4" /> },
            { key: "health_education", label: "Health Education", icon: <BookOpen className="w-4 h-4" /> },
            { key: "referrals", label: "Referrals", icon: <TrendingUp className="w-4 h-4" /> },
            { key: "incentives", label: "Incentives / Performance", icon: <Award className="w-4 h-4" /> },
            { key: "messages", label: "Messages / Notifications", icon: <Bell className="w-4 h-4" /> },
            { key: "reports", label: "Reports / History", icon: <FileText className="w-4 h-4" /> },
            { key: "video_call", label: "Video Consultation", icon: <Phone className="w-4 h-4" /> },
            { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
            { key: "help", label: "Help / FAQ", icon: <HelpCircle className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => {
                if (item.key === "registration") {
                  setShowRegistrationModal(true);
                } else {
                  setSection(item.key);
                }
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all flex items-center gap-3 text-sm ${
                section === item.key 
                  ? "bg-purple-600 text-white shadow-md" 
                  : "hover:bg-purple-50 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="mb-3 p-3 bg-purple-50 rounded-lg">
            <p className="text-xs font-semibold text-purple-900">{asha.name}</p>
            <p className="text-xs text-purple-700">ASHA Worker - Rampur</p>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full px-3 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <LogOut className="w-4 h-4" /> Logout
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
                {section === 'home' && 'ASHA Dashboard'}
                {section === 'beneficiaries' && 'My Beneficiaries'}
                {section === 'registration' && 'Patient Registration'}
                {section === 'due_list' && 'Due List & Reminders'}
                {section === 'home_visits' && 'Home Visit Checklist'}
                {section === 'health_education' && 'Health Education'}
                {section === 'referrals' && 'Referrals'}
                {section === 'incentives' && 'Incentives & Performance'}
                {section === 'messages' && 'Messages & Notifications'}
                {section === 'reports' && 'Reports & History'}
                {section === 'video_call' && 'Video Consultation'}
                {section === 'settings' && 'Settings'}
                {section === 'help' && 'Help & FAQ'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">ASHA Worker - Rampur Village, Block: Motihari</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                Oct 1, 2025
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* HOME SECTION */}
          {section === "home" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-xl shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {asha.name}!</h2>
                <p className="opacity-90">Monitor your community health tasks, track beneficiaries, and provide quality healthcare services</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">{BENEFICIARIES.reduce((sum, b) => sum + b.total, 0)}</p>
                      <p className="text-gray-600 text-sm mt-1">Total Beneficiaries</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" /> +5 from last month
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{DUE_LIST.filter(d => d.status === 'Due' || d.status === 'Overdue').length}</p>
                      <p className="text-gray-600 text-sm mt-1">Pending Tasks</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-orange-600">
                    <AlertCircle className="w-3 h-3 mr-1" /> Requires attention
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-orange-600">{BENEFICIARIES.reduce((sum, b) => sum + b.highRisk, 0)}</p>
                      <p className="text-gray-600 text-sm mt-1">High Risk Cases</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-orange-600">
                    <AlertCircle className="w-3 h-3 mr-1" /> Monitor closely
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">₹{INCENTIVES.filter(i => i.status === 'Approved').reduce((sum, i) => sum + i.amount, 0)}</p>
                      <p className="text-gray-600 text-sm mt-1">Monthly Incentives</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" /> Good performance
                  </div>
                </div>
              </div>

              {/* Quick Actions & Due List */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-600" />
                    Today's Due List
                  </h3>
                  <div className="space-y-3">
                    {DUE_LIST.slice(0, 4).map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(item.status)}
                          <div>
                            <p className="font-semibold text-sm">{item.patient}</p>
                            <p className="text-xs text-gray-600">{item.type} • Due: {item.date}</p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSection('due_list')}
                    className="w-full mt-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 text-sm font-medium"
                  >
                    View All Due Tasks
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-purple-600" />
                    Recent Notifications
                  </h3>
                  <div className="space-y-3">
                    {NOTIFICATIONS.slice(0, 3).map(n => (
                      <div key={n.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(n.priority)}`}>
                          {n.priority}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{n.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{n.body.substring(0, 80)}...</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSection('messages')}
                    className="w-full mt-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 text-sm font-medium"
                  >
                    View All Notifications
                  </button>
                </div>
              </div>

              {/* Quick Registration Options */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-purple-600" />
                  Quick Registration
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {REGISTRATION_TYPES.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setShowRegistrationModal(true);
                        handleRegistrationTypeSelect(type);
                      }}
                      className="p-3 border-2 border-gray-200 rounded-lg hover:shadow-md transition-all hover:border-purple-300 text-center"
                    >
                      <div className={`p-2 rounded-lg ${type.color} inline-flex`}>
                        {type.icon}
                      </div>
                      <p className="text-xs font-medium mt-2 text-gray-700">{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Beneficiary Overview */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Beneficiary Overview
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {BENEFICIARIES.map((b) => (
                    <div key={b.id} className="border-2 border-gray-200 p-4 rounded-xl hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-800">{b.type}</h4>
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Users className="w-4 h-4 text-purple-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="font-bold text-lg text-purple-600">{b.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">High Risk:</span>
                          <span className="font-bold text-red-600">{b.highRisk}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BENEFICIARIES SECTION */}
          {section === "beneficiaries" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="w-6 h-6 text-purple-600" />
                    My Beneficiaries
                  </h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Eye className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search beneficiaries..." 
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button 
                      onClick={() => setShowRegistrationModal(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm"
                    >
                      <Plus className="w-4 h-4" /> Add Beneficiary
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {BENEFICIARIES.map((b) => (
                    <div key={b.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800">{b.type}</h4>
                        <div className="bg-purple-100 p-2 rounded-lg">
                          <Users className="w-5 h-5 text-purple-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="font-bold text-xl text-purple-600">{b.total}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">High Risk:</span>
                          <span className="font-bold text-lg text-red-600">{b.highRisk}</span>
                        </div>
                        {b.registered && (
                          <div className="pt-2 border-t">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Registered:</span>
                              <span className="font-semibold">{b.registered}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <button className="w-full mt-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 text-sm font-medium flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* DUE LIST SECTION */}
          {section === "due_list" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-purple-600" />
                    Due List & Reminders
                  </h3>
                  <select 
                    className="px-4 py-2 border rounded-lg text-sm"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="Due">Due</option>
                    <option value="Overdue">Overdue</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-4">
                  {DUE_LIST.filter(item => filterStatus === "all" || item.status === filterStatus).map((item) => (
                    <div key={item.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            {getStatusIcon(item.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-lg">{item.patient}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                                {item.priority}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                item.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                item.status === 'Overdue' ? 'bg-red-100 text-red-700' :
                                'bg-orange-100 text-orange-700'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500">Service Type:</p>
                                <p className="font-semibold">{item.type}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Due Date:</p>
                                <p className="font-semibold">{item.date}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                            Mark Done
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            Reschedule
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HOME VISITS SECTION */}
          {section === "home_visits" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <ClipboardList className="w-6 h-6 text-purple-600" />
                    Home Visit Checklist
                  </h3>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" /> New Visit
                  </button>
                </div>

                <div className="space-y-4">
                  {HOME_VISITS.map((visit) => (
                    <div key={visit.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            {getStatusIcon(visit.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-lg">{visit.patient}</h4>
                              <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                                {visit.type}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                visit.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                visit.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {visit.status}
                              </span>
                            </div>
                            <p className="text-gray-600">Scheduled: {visit.date}</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h5 className="font-semibold text-sm mb-3">Checklist Items:</h5>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {visit.checklist.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input type="checkbox" className="w-4 h-4 text-purple-600" />
                              <span className="text-sm text-gray-700">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                          Complete Visit
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          Add Notes
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          Reschedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* HEALTH EDUCATION SECTION */}
          {section === "health_education" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                    Health Education Materials
                  </h3>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4" /> Download All
                  </button>
                </div>

                <div className="grid gap-4">
                  {HEALTH_EDUCATION.map((material) => (
                    <div key={material.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${material.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'}`}>
                          {material.type === 'PDF' ? 
                            <FileText className="w-6 h-6 text-red-600" /> : 
                            <Activity className="w-6 h-6 text-blue-600" />
                          }
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{material.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{material.category}</span>
                            <span>{material.size}</span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" /> {material.downloads} downloads
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                          <Eye className="w-4 h-4" /> View
                        </button>
                        <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 flex items-center gap-2 text-sm">
                          <Download className="w-4 h-4" /> Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REFERRALS SECTION */}
          {section === "referrals" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                    Patient Referrals
                  </h3>
                  <div className="flex gap-3">
                    <select 
                      className="px-4 py-2 border rounded-lg text-sm"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" /> New Referral
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {REFERRALS.filter(ref => filterStatus === "all" || ref.status === filterStatus).map((referral) => (
                    <div key={referral.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <MapPin className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-lg">{referral.patient}</h4>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {referral.age} years
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(referral.priority)}`}>
                                {referral.priority}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                referral.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                referral.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                'bg-orange-100 text-orange-700'
                              }`}>
                                {referral.status}
                              </span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Referral Reason:</p>
                                <p className="font-semibold">{referral.reason}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Referred To:</p>
                                <p className="font-semibold">{referral.to}</p>
                              </div>
                            </div>
                            <p className="text-gray-500 text-sm mt-2">Date: {referral.date}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm">
                          Update Status
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                          Contact Facility
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* INCENTIVES SECTION */}
          {section === "incentives" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-purple-600" />
                  Incentives & Performance
                </h3>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-5 rounded-xl text-white">
                    <p className="text-3xl font-bold">₹{INCENTIVES.filter(i => i.status === 'Approved').reduce((sum, i) => sum + i.amount, 0)}</p>
                    <p className="text-purple-100 mt-1">Approved Incentives</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 rounded-xl text-white">
                    <p className="text-3xl font-bold">₹{INCENTIVES.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0)}</p>
                    <p className="text-blue-100 mt-1">Pending Incentives</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-xl text-white">
                    <p className="text-3xl font-bold">{INCENTIVES.reduce((sum, i) => sum + i.count, 0)}</p>
                    <p className="text-green-100 mt-1">Total Tasks Completed</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {INCENTIVES.map((incentive) => (
                    <div key={incentive.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${
                            incentive.status === 'Approved' ? 'bg-green-100' : 'bg-orange-100'
                          }`}>
                            <Award className={`w-6 h-6 ${
                              incentive.status === 'Approved' ? 'text-green-600' : 'text-orange-600'
                            }`} />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{incentive.task}</h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                              <span>Count: {incentive.count}</span>
                              <span>Amount: ₹{incentive.amount}</span>
                              <span>Date: {incentive.date}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            incentive.status === 'Approved' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                          }`}>
                            {incentive.status}
                          </span>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES SECTION */}
          {section === "messages" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Bell className="w-6 h-6 text-purple-600" />
                  Messages & Notifications
                </h3>

                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    {NOTIFICATIONS.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`border-2 p-4 rounded-xl hover:shadow-md transition-shadow cursor-pointer ${
                          notification.read ? 'border-gray-200' : 'border-purple-200 bg-purple-50'
                        }`}
                        onClick={() => setSelectedNotification(notification)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-800">{notification.title}</h4>
                              <span className="text-xs text-gray-500">{notification.date} {notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.body}</p>
                            <p className="text-xs text-gray-500">From: {notification.from}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-gray-50 p-5 rounded-xl">
                    <h4 className="font-semibold mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-left">
                        <MessageSquare className="w-4 h-4 inline mr-2" />
                        Message ANM
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-left">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Call Supervisor
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-left">
                        <FileText className="w-4 h-4 inline mr-2" />
                        Generate Report
                      </button>
                      <button className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-left">
                        <Settings className="w-4 h-4 inline mr-2" />
                        Notification Settings
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REPORTS SECTION */}
          {section === "reports" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-purple-600" />
                  Reports & History
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="border-2 border-gray-200 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <FileText className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="font-semibold">Monthly Report</p>
                    <p className="text-sm text-gray-600">September 2025</p>
                  </div>
                  <div className="border-2 border-gray-200 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="font-semibold">Beneficiary Report</p>
                    <p className="text-sm text-gray-600">All beneficiaries</p>
                  </div>
                  <div className="border-2 border-gray-200 p-4 rounded-xl text-center hover:shadow-md transition-shadow">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="font-semibold">Performance Report</p>
                    <p className="text-sm text-gray-600">Quarterly review</p>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-xl p-5">
                  <h4 className="font-semibold mb-4">Recent Activities</h4>
                  <div className="space-y-3">
                    {[...HOME_VISITS, ...REFERRALS.slice(0, 2)].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        {getStatusIcon(activity.status)}
                        <div className="flex-1">
                          <p className="font-semibold text-sm">{activity.patient || activity.patient}</p>
                          <p className="text-xs text-gray-600">{activity.type || activity.reason}</p>
                        </div>
                        <span className="text-xs text-gray-500">{activity.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* VIDEO CALL SECTION */}
          {section === "video_call" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Phone className="w-6 h-6 text-purple-600" />
                  Video Consultation
                </h3>
                
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-2 border-gray-200 p-5 rounded-xl">
                      <h4 className="font-semibold mb-3">Start New Consultation</h4>
                      <div className="space-y-3">
                        <input 
                          type="text" 
                          placeholder="Patient Name" 
                          className="w-full px-4 py-2 border rounded-lg text-sm"
                        />
                        <input 
                          type="text" 
                          placeholder="Contact Number" 
                          className="w-full px-4 py-2 border rounded-lg text-sm"
                        />
                        <select className="w-full px-4 py-2 border rounded-lg text-sm">
                          <option>Select ANM/Doctor</option>
                          <option>ANM Rekha Singh</option>
                          <option>Dr. Sharma - PHC</option>
                          <option>Dr. Verma - CHC</option>
                        </select>
                        <textarea 
                          placeholder="Reason for consultation..." 
                          rows="3"
                          className="w-full px-4 py-2 border rounded-lg text-sm"
                        ></textarea>
                        <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                          Start Video Call
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="border-2 border-gray-200 p-5 rounded-xl">
                      <h4 className="font-semibold mb-3">Recent Consultations</h4>
                      <div className="space-y-3">
                        {[
                          { patient: "Priya Sharma", date: "2025-09-28", doctor: "ANM Rekha Singh", status: "Completed" },
                          { patient: "Ramesh Kumar", date: "2025-09-25", doctor: "Dr. Sharma", status: "Completed" },
                          { patient: "Sunita Devi", date: "2025-09-20", doctor: "ANM Rekha Singh", status: "Completed" }
                        ].map((consult, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold text-sm">{consult.patient}</p>
                              <p className="text-xs text-gray-600">{consult.doctor} • {consult.date}</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                              {consult.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-2 border-gray-200 p-5 rounded-xl">
                      <h4 className="font-semibold mb-3">Available Contacts</h4>
                      <div className="space-y-2">
                        {[
                          { name: "ANM Rekha Singh", role: "ANM", status: "Available" },
                          { name: "Dr. Sharma", role: "PHC Doctor", status: "Available" },
                          { name: "Dr. Verma", role: "CHC Specialist", status: "Busy" }
                        ].map((contact, index) => (
                          <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <div className={`w-2 h-2 rounded-full ${
                                contact.status === 'Available' ? 'bg-green-500' : 'bg-orange-500'
                              }`}></div>
                              <span className="font-medium text-sm">{contact.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{contact.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Jitsi Video Call Component */}
                <div className="mt-6">
                  <JitsiMeetingWrapper
                    roomName={`ASHA-${asha.id}-${Date.now()}`}
                    displayName={asha.name}
                    onMeetingEnd={() => console.log('Meeting ended')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS SECTION */}
          {section === "settings" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-purple-600" />
                  Settings
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Profile Settings</h4>
                    <div className="space-y-3">
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        defaultValue={asha.name}
                        className="w-full px-4 py-2 border rounded-lg text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="Phone Number" 
                        className="w-full px-4 py-2 border rounded-lg text-sm"
                      />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full px-4 py-2 border rounded-lg text-sm"
                      />
                      <input 
                        type="text" 
                        placeholder="Village/Location" 
                        className="w-full px-4 py-2 border rounded-lg text-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">App Settings</h4>
                    <div className="space-y-3">
                      <select className="w-full px-4 py-2 border rounded-lg text-sm">
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Local Language</option>
                      </select>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">Offline Mode</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">Push Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">Auto-sync Data</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-6">
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold">
                    Save Changes
                  </button>
                  <button className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold">
                    Reset to Default
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* HELP SECTION */}
          {section === "help" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-purple-600" />
                  Help & FAQ
                </h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-semibold">Frequently Asked Questions</h4>
                    <div className="space-y-3">
                      {[
                        { q: "How to register a new pregnant woman?", a: "Go to Beneficiaries → Add New → Select Pregnant Woman category" },
                        { q: "What to do in case of high risk pregnancy?", a: "Immediately refer to ANM/PHC and mark as high risk in the system" },
                        { q: "How to record home visits?", a: "Use Home Visit Checklist section to record each visit with proper checklist" },
                        { q: "Incentive payment process?", a: "Incentives are processed monthly based on verified tasks in the system" }
                      ].map((faq, index) => (
                        <div key={index} className="border-2 border-gray-200 p-4 rounded-xl">
                          <h5 className="font-semibold text-sm mb-2">{faq.q}</h5>
                          <p className="text-sm text-gray-600">{faq.a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Quick Support</h4>
                    <div className="space-y-3">
                      <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium">
                        <Phone className="w-4 h-4" />
                        Call ANM Supervisor
                      </button>
                      <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center gap-2 text-sm font-medium">
                        <MessageSquare className="w-4 h-4" />
                        Message Support
                      </button>
                      <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-medium">
                        <FileText className="w-4 h-4" />
                        Download User Manual
                      </button>
                      <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 text-sm font-medium">
                        <Settings className="w-4 h-4" />
                        Training Materials
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