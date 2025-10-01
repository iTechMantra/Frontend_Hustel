// src/pages/PHCDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { translate } from "../services/translationService";
import { logout, getCurrentUser } from "../services/authService";
import JitsiMeetingWrapper from "../components/JitsiMeetingWrapper";
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Calendar, Users, Activity, AlertTriangle, Package, TrendingUp, FileText, Video, Bell, Settings, LogOut, Phone, MessageSquare, MapPin, Clock, Download, Filter, Search, Plus, Eye, Edit, Trash2, CheckCircle, XCircle, AlertCircle } from "lucide-react";

// Expanded Dummy Data
const BENEFICIARIES = [
  { id: "b1", type: "Pregnant Women", total: 120, highRisk: 25, registered: 110, anc1: 105, anc4: 85, institutional: 98 },
  { id: "b2", type: "Children (0-5 yrs)", total: 350, highRisk: 40, fullyImmunized: 280, partialImmunized: 50, notImmunized: 20 },
  { id: "b3", type: "Eligible Couples", total: 210, highRisk: 15, sterilization: 45, iud: 60, pills: 55, condoms: 35, others: 15 },
  { id: "b4", type: "Adolescents", total: 180, highRisk: 12, counseled: 140, anemic: 45, normal: 135 },
  { id: "b5", type: "Elderly (60+)", total: 95, highRisk: 38, diabetes: 25, hypertension: 42, both: 15 },
];

const REFERRALS = [
  { id: "r1", date: "2025-09-28", from: "ASHA - Sita Devi", worker_id: "ASH001", patient: "Radha Kumari", age: 26, reason: "High BP during ANC (160/110)", to: "District Hospital", status: "Pending", priority: "High", followup: "Required" },
  { id: "r2", date: "2025-09-27", from: "ANM - Rekha Singh", worker_id: "ANM002", patient: "Pooja Sharma", age: 28, reason: "Severe Anemia (Hb 6.2)", to: "CHC Balarampur", status: "Completed", priority: "Critical", followup: "Done" },
  { id: "r3", date: "2025-09-26", from: "ASHA - Sunita Devi", worker_id: "ASH003", patient: "Mohan Das", age: 45, reason: "Persistent cough, TB Symptoms", to: "District TB Center", status: "In Progress", priority: "Medium", followup: "Scheduled" },
  { id: "r4", date: "2025-09-25", from: "ANM - Geeta Kumari", worker_id: "ANM001", patient: "Baby Aisha", age: 2, reason: "Severe Acute Malnutrition (SAM)", to: "NRC Patna", status: "Completed", priority: "Critical", followup: "Done" },
  { id: "r5", date: "2025-09-24", from: "ASHA - Meena Devi", worker_id: "ASH002", patient: "Ramesh Kumar", age: 65, reason: "Uncontrolled Diabetes (BS 380)", to: "District Hospital", status: "In Progress", priority: "High", followup: "Required" },
  { id: "r6", date: "2025-09-23", from: "PHC Doctor", worker_id: "DOC001", patient: "Lalita Devi", age: 32, reason: "High risk pregnancy - twins", to: "Medical College Hospital", status: "Completed", priority: "Critical", followup: "Done" },
];

const STOCKS = [
  { id: "s1", item: "BCG Vaccine", category: "Vaccines", issued: 300, consumed: 180, balance: 120, minLevel: 150, alerts: "Low", lastUpdated: "2025-09-28", expiry: "2025-12-31" },
  { id: "s2", item: "Iron Folic Acid", category: "Medicines", issued: 500, consumed: 100, balance: 400, minLevel: 200, alerts: "Sufficient", lastUpdated: "2025-09-27", expiry: "2026-03-15" },
  { id: "s3", item: "ORS Packets", category: "Medicines", issued: 200, consumed: 150, balance: 50, minLevel: 100, alerts: "Critical", lastUpdated: "2025-09-28", expiry: "2026-01-20" },
  { id: "s4", item: "Paracetamol", category: "Medicines", issued: 1000, consumed: 700, balance: 300, minLevel: 250, alerts: "Moderate", lastUpdated: "2025-09-26", expiry: "2026-06-30" },
  { id: "s5", item: "Pentavalent Vaccine", category: "Vaccines", issued: 400, consumed: 290, balance: 110, minLevel: 150, alerts: "Low", lastUpdated: "2025-09-28", expiry: "2025-11-30" },
  { id: "s6", item: "Measles-Rubella Vaccine", category: "Vaccines", issued: 350, consumed: 180, balance: 170, minLevel: 150, alerts: "Sufficient", lastUpdated: "2025-09-27", expiry: "2025-12-15" },
  { id: "s7", item: "Albendazole", category: "Medicines", issued: 600, consumed: 480, balance: 120, minLevel: 200, alerts: "Low", lastUpdated: "2025-09-25", expiry: "2026-02-28" },
  { id: "s8", item: "Vitamin A", category: "Supplements", issued: 450, consumed: 200, balance: 250, minLevel: 150, alerts: "Sufficient", lastUpdated: "2025-09-28", expiry: "2026-04-30" },
  { id: "s9", item: "Disposable Syringes", category: "Consumables", issued: 2000, consumed: 1850, balance: 150, minLevel: 500, alerts: "Critical", lastUpdated: "2025-09-28", expiry: "2026-08-31" },
  { id: "s10", item: "Cotton", category: "Consumables", issued: 50, consumed: 25, balance: 25, minLevel: 20, alerts: "Sufficient", lastUpdated: "2025-09-26", expiry: "2027-01-01" },
];

const DISEASE_CASES = [
  { month: "Jan", Malaria: 12, Dengue: 5, TB: 4, COVID: 8, Diarrhea: 35, Pneumonia: 18 },
  { month: "Feb", Malaria: 20, Dengue: 8, TB: 7, COVID: 6, Diarrhea: 42, Pneumonia: 22 },
  { month: "Mar", Malaria: 15, Dengue: 10, TB: 5, COVID: 3, Diarrhea: 38, Pneumonia: 15 },
  { month: "Apr", Malaria: 30, Dengue: 12, TB: 9, COVID: 4, Diarrhea: 45, Pneumonia: 20 },
  { month: "May", Malaria: 18, Dengue: 6, TB: 8, COVID: 2, Diarrhea: 30, Pneumonia: 12 },
  { month: "Jun", Malaria: 25, Dengue: 15, TB: 6, COVID: 3, Diarrhea: 50, Pneumonia: 25 },
  { month: "Jul", Malaria: 35, Dengue: 28, TB: 10, COVID: 5, Diarrhea: 65, Pneumonia: 30 },
  { month: "Aug", Malaria: 40, Dengue: 32, TB: 8, COVID: 4, Diarrhea: 58, Pneumonia: 28 },
  { month: "Sep", Malaria: 28, Dengue: 20, TB: 7, COVID: 2, Diarrhea: 48, Pneumonia: 18 },
];

const NOTIFICATIONS = [
  { id: "n1", date: "2025-09-30", time: "10:30 AM", priority: "High", title: "COVID Vaccination Drive", body: "Urgent! Extra doses available, cover backlog today.", from: "District Health Office", read: false },
  { id: "n2", date: "2025-09-29", time: "02:15 PM", priority: "Critical", title: "Stock Alert", body: "ORS packets and Disposable Syringes below critical level. Immediate replenishment requested.", from: "State Store", read: false },
  { id: "n3", date: "2025-09-28", time: "09:00 AM", priority: "Medium", title: "Training Session", body: "New SOP on Dengue surveillance uploaded. All staff must review by Oct 5.", from: "State Health Dept.", read: true },
  { id: "n4", date: "2025-09-27", time: "11:45 AM", priority: "High", title: "Outbreak Alert", body: "Dengue cases rising in nearby villages. Enhanced surveillance required.", from: "District Surveillance Unit", read: true },
  { id: "n5", date: "2025-09-26", time: "03:30 PM", priority: "Medium", title: "HMIS Reporting", body: "Monthly HMIS report due by Oct 2. Please complete data entry.", from: "HMIS Cell", read: true },
];

const ASHA_ANM_DATA = [
  { id: "w1", name: "Sita Devi", role: "ASHA", village: "Rampur", phone: "9876543210", beneficiaries: 85, visits: 180, lastSync: "2025-09-28 04:30 PM", performance: 92 },
  { id: "w2", name: "Sunita Devi", role: "ASHA", village: "Laxmipur", phone: "9876543211", beneficiaries: 78, visits: 165, lastSync: "2025-09-28 03:15 PM", performance: 88 },
  { id: "w3", name: "Meena Devi", role: "ASHA", village: "Shivnagar", phone: "9876543212", beneficiaries: 92, visits: 195, lastSync: "2025-09-28 05:00 PM", performance: 95 },
  { id: "w4", name: "Rekha Singh", role: "ANM", subCenter: "SC-01", phone: "9876543220", beneficiaries: 250, visits: 420, lastSync: "2025-09-28 06:00 PM", performance: 90 },
  { id: "w5", name: "Geeta Kumari", role: "ANM", subCenter: "SC-02", phone: "9876543221", beneficiaries: 235, visits: 395, lastSync: "2025-09-28 05:45 PM", performance: 87 },
];

const MONTHLY_TARGETS = [
  { indicator: "ANC Registration", target: 100, achieved: 85, percentage: 85 },
  { indicator: "Institutional Deliveries", target: 95, achieved: 92, percentage: 97 },
  { indicator: "Full Immunization", target: 320, achieved: 280, percentage: 88 },
  { indicator: "Family Planning", target: 180, achieved: 165, percentage: 92 },
  { indicator: "TB Detection", target: 8, achieved: 7, percentage: 88 },
  { indicator: "Malaria Testing", target: 150, achieved: 145, percentage: 97 },
];

const TRAINING_MATERIALS = [
  { id: "t1", title: "SOP - Dengue Management", type: "PDF", category: "Disease Control", size: "2.5 MB", uploaded: "2025-09-28", downloads: 45 },
  { id: "t2", title: "How to Handle High-Risk ANC Cases", type: "Video", category: "Maternal Health", size: "125 MB", uploaded: "2025-09-25", downloads: 38 },
  { id: "t3", title: "COVID-19 Preparedness Guidelines", type: "PDF", category: "Pandemic Preparedness", size: "1.8 MB", uploaded: "2025-09-20", downloads: 52 },
  { id: "t4", title: "Immunization Schedule 2025", type: "PDF", category: "Child Health", size: "950 KB", uploaded: "2025-09-15", downloads: 67 },
  { id: "t5", title: "Nutrition Assessment Training", type: "Video", category: "Child Health", size: "98 MB", uploaded: "2025-09-10", downloads: 41 },
  { id: "t6", title: "Stock Management Protocol", type: "PDF", category: "Logistics", size: "1.2 MB", uploaded: "2025-09-05", downloads: 55 },
];

const VILLAGE_COVERAGE = [
  { village: "Rampur", population: 1250, households: 280, covered: 245, percentage: 88 },
  { village: "Laxmipur", population: 980, households: 220, covered: 198, percentage: 90 },
  { village: "Shivnagar", population: 1450, households: 325, covered: 276, percentage: 85 },
  { village: "Krishnapur", population: 750, households: 168, covered: 152, percentage: 90 },
  { village: "Maheshpur", population: 1100, households: 246, covered: 209, percentage: 85 },
];

const PERFORMANCE_METRICS = [
  { subject: "ANC Coverage", A: 85, B: 90, fullMark: 100 },
  { subject: "Immunization", A: 92, B: 95, fullMark: 100 },
  { subject: "Family Planning", A: 78, B: 85, fullMark: 100 },
  { subject: "Disease Surveillance", A: 88, B: 90, fullMark: 100 },
  { subject: "Stock Management", A: 75, B: 85, fullMark: 100 },
  { subject: "Data Quality", A: 82, B: 90, fullMark: 100 },
];

export default function PHCDashboard() {
  const [user] = useState({ name: "Dr. PHC Admin", role: "phc" });
  const [section, setSection] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState(null);

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a4de6c", "#d0ed57"];

  const getStockColor = (alert) => {
    switch(alert) {
      case "Critical": return "text-red-600 bg-red-50";
      case "Low": return "text-orange-600 bg-orange-50";
      case "Moderate": return "text-yellow-600 bg-yellow-50";
      default: return "text-green-600 bg-green-50";
    }
  };

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
      case "In Progress": return <Activity className="w-4 h-4 text-blue-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col border-r">
        <div className="p-5 border-b bg-gradient-to-r from-green-600 to-green-700">
          <h2 className="text-lg font-bold text-white">PHC Dashboard</h2>
          <p className="text-green-100 text-xs mt-1">Supervisory Control</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { key: "home", label: "Home", icon: <Activity className="w-4 h-4" /> },
            { key: "beneficiaries", label: "Beneficiaries", icon: <Users className="w-4 h-4" /> },
            { key: "workers", label: "Field Workers", icon: <Users className="w-4 h-4" /> },
            { key: "referrals", label: "Referrals", icon: <TrendingUp className="w-4 h-4" /> },
            { key: "coverage", label: "Coverage Reports", icon: <BarChart className="w-4 h-4" /> },
            { key: "stock", label: "Stock Management", icon: <Package className="w-4 h-4" /> },
            { key: "disease", label: "Disease Surveillance", icon: <AlertTriangle className="w-4 h-4" /> },
            { key: "training", label: "Training & SOPs", icon: <FileText className="w-4 h-4" /> },
            { key: "reports", label: "Reports & Analytics", icon: <BarChart className="w-4 h-4" /> },
            { key: "notifications", label: "Notifications", icon: <Bell className="w-4 h-4" /> },
            { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all flex items-center gap-3 text-sm ${
                section === item.key 
                  ? "bg-green-600 text-white shadow-md" 
                  : "hover:bg-green-50 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="mb-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-semibold text-blue-900">{user.name}</p>
            <p className="text-xs text-blue-700">PHC Administrator</p>
          </div>
          <button className="w-full px-3 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center justify-center gap-2 text-sm font-medium">
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
                {section.charAt(0).toUpperCase() + section.slice(1).replace(/([A-Z])/g, ' $1')}
              </h1>
              <p className="text-sm text-gray-500 mt-1">PHC Balarampur, Block: Motihari, District: East Champaran</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                Oct 1, 2025
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-medium">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* HOME */}
          {section === "home" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 rounded-xl shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
                <p className="opacity-90">Monitor and manage your PHC operations, track performance metrics, and ensure quality healthcare delivery</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">85%</p>
                      <p className="text-gray-600 text-sm mt-1">ANC Coverage</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" /> +5% from last month
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">92%</p>
                      <p className="text-gray-600 text-sm mt-1">Immunization</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Activity className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" /> +3% from last month
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-orange-600">18</p>
                      <p className="text-gray-600 text-sm mt-1">High Risk Cases</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <AlertTriangle className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-orange-600">
                    <AlertCircle className="w-3 h-3 mr-1" /> Requires attention
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">4</p>
                      <p className="text-gray-600 text-sm mt-1">Critical Stock Alerts</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-red-600">
                    <AlertCircle className="w-3 h-3 mr-1" /> Action required
                  </div>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    Monthly Disease Trends
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={DISEASE_CASES.slice(-6)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="Malaria" stackId="1" stroke="#8884d8" fill="#8884d8" />
                      <Area type="monotone" dataKey="Dengue" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                      <Area type="monotone" dataKey="Diarrhea" stackId="1" stroke="#ffc658" fill="#ffc658" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Target Achievement
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={MONTHLY_TARGETS}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="indicator" angle={-15} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                      <Bar dataKey="achieved" fill="#10b981" name="Achieved" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-green-600" />
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
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-green-600" />
                    Top Performing Workers
                  </h3>
                  <div className="space-y-3">
                    {ASHA_ANM_DATA.sort((a, b) => b.performance - a.performance).slice(0, 3).map(w => (
                      <div key={w.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-700 font-bold text-sm">{w.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{w.name}</p>
                            <p className="text-xs text-gray-600">{w.role} - {w.village || w.subCenter}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">{w.performance}%</p>
                          <p className="text-xs text-gray-500">Performance</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* BENEFICIARIES */}
          {section === "beneficiaries" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    Beneficiary Aggregation
                  </h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search beneficiaries..." 
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" /> Add Beneficiary
                    </button>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {BENEFICIARIES.map((b) => (
                    <div key={b.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-lg text-gray-800">{b.type}</h4>
                        <div className="bg-green-100 p-2 rounded-lg">
                          <Users className="w-5 h-5 text-green-600" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">Total:</span>
                          <span className="font-bold text-xl text-blue-600">{b.total}</span>
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
                      <button className="w-full mt-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 text-sm font-medium flex items-center justify-center gap-2">
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                  <h4 className="font-semibold mb-4 text-gray-800">Beneficiary Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie 
                        data={BENEFICIARIES} 
                        dataKey="total" 
                        nameKey="type" 
                        cx="50%" 
                        cy="50%" 
                        outerRadius={100} 
                        fill="#82ca9d" 
                        label
                      >
                        {BENEFICIARIES.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* FIELD WORKERS */}
          {section === "workers" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    Field Worker Management
                  </h3>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" /> Add Worker
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Area</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Phone</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Beneficiaries</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Visits</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Performance</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Sync</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {ASHA_ANM_DATA.map((w) => (
                        <tr key={w.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-700 font-bold text-xs">{w.name.charAt(0)}</span>
                              </div>
                              <span className="font-medium text-sm">{w.name}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${w.role === 'ASHA' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                              {w.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{w.village || w.subCenter}</td>
                          <td className="px-4 py-3 text-sm flex items-center gap-1">
                            <Phone className="w-3 h-3 text-gray-400" />
                            {w.phone}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold">{w.beneficiaries}</td>
                          <td className="px-4 py-3 text-sm font-semibold">{w.visits}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${w.performance >= 90 ? 'bg-green-500' : w.performance >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${w.performance}%` }}
                                ></div>
                              </div>
                              <span className="text-xs font-semibold">{w.performance}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">{w.lastSync}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-blue-50 rounded">
                                <Eye className="w-4 h-4 text-blue-600" />
                              </button>
                              <button className="p-1 hover:bg-green-50 rounded">
                                <Phone className="w-4 h-4 text-green-600" />
                              </button>
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <MessageSquare className="w-4 h-4 text-gray-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h4 className="font-semibold mb-4">Performance Radar</h4>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={PERFORMANCE_METRICS}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis />
                    <Radar name="Current Month" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    <Radar name="Target" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
                    <Legend />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* REFERRALS */}
          {section === "referrals" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-green-600" />
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
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" /> New Referral
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  {REFERRALS.filter(r => filterStatus === "all" || r.status === filterStatus).map((r) => (
                    <div key={r.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            {getStatusIcon(r.status)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-lg">{r.patient}</h4>
                              <span className="text-sm text-gray-500">Age: {r.age}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(r.priority)}`}>
                                {r.priority}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                r.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                r.status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {r.status}
                              </span>
                            </div>
                            <div className="grid md:grid-cols-2 gap-3 text-sm">
                              <div>
                                <p className="text-gray-500">Referred By:</p>
                                <p className="font-semibold">{r.from}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Referred To:</p>
                                <p className="font-semibold">{r.to}</p>
                              </div>
                              <div className="md:col-span-2">
                                <p className="text-gray-500">Reason:</p>
                                <p className="font-semibold text-red-600">{r.reason}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Date:</p>
                                <p className="font-semibold">{r.date}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Follow-up:</p>
                                <p className="font-semibold">{r.followup}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-blue-50 rounded-lg">
                            <Eye className="w-5 h-5 text-blue-600" />
                          </button>
                          <button className="p-2 hover:bg-green-50 rounded-lg">
                            <Phone className="w-5 h-5 text-green-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-lg">
                            <Edit className="w-5 h-5 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COVERAGE REPORTS */}
          {section === "coverage" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <BarChart className="w-6 h-6 text-green-600" />
                  Service Coverage Reports
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={DISEASE_CASES}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Malaria" stroke="#8884d8" strokeWidth={2} />
                    <Line type="monotone" dataKey="Dengue" stroke="#82ca9d" strokeWidth={2} />
                    <Line type="monotone" dataKey="TB" stroke="#ffc658" strokeWidth={2} />
                    <Line type="monotone" dataKey="COVID" stroke="#ff7f50" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6">Village-wise Coverage</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Village</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Population</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Households</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Covered</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Coverage %</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {VILLAGE_COVERAGE.map((v, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{v.village}</td>
                          <td className="px-4 py-3">{v.population}</td>
                          <td className="px-4 py-3">{v.households}</td>
                          <td className="px-4 py-3 font-semibold">{v.covered}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div 
                                  className={`h-2 rounded-full ${v.percentage >= 90 ? 'bg-green-500' : v.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                  style={{ width: `${v.percentage}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold">{v.percentage}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${
                              v.percentage >= 90 ? 'bg-green-100 text-green-700' :
                              v.percentage >= 80 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {v.percentage >= 90 ? 'Excellent' : v.percentage >= 80 ? 'Good' : 'Needs Improvement'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* STOCK MANAGEMENT */}
          {section === "stock" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Package className="w-6 h-6 text-green-600" />
                    Stock Management
                  </h3>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" /> Request Stock
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-2xl font-bold text-red-600">3</p>
                    <p className="text-sm text-gray-600">Critical</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <p className="text-2xl font-bold text-orange-600">3</p>
                    <p className="text-sm text-gray-600">Low</p>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-2xl font-bold text-yellow-600">1</p>
                    <p className="text-sm text-gray-600">Moderate</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <p className="text-2xl font-bold text-green-600">3</p>
                    <p className="text-sm text-gray-600">Sufficient</p>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Issued</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Consumed</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Balance</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Min Level</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expiry</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {STOCKS.map((s) => (
                        <tr key={s.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">{s.item}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 bg-gray-100 rounded text-xs">{s.category}</span>
                          </td>
                          <td className="px-4 py-3">{s.issued}</td>
                          <td className="px-4 py-3">{s.consumed}</td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-lg">{s.balance}</span>
                          </td>
                          <td className="px-4 py-3 text-gray-500">{s.minLevel}</td>
                          <td className="px-4 py-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStockColor(s.alerts)}`}>
                              {s.alerts}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs">{s.expiry}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button className="p-1 hover:bg-blue-50 rounded">
                                <Eye className="w-4 h-4 text-blue-600" />
                              </button>
                              <button className="p-1 hover:bg-green-50 rounded">
                                <Plus className="w-4 h-4 text-green-600" />
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

          {/* DISEASE SURVEILLANCE */}
          {section === "disease" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-green-600" />
                  Disease Surveillance Dashboard
                </h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={DISEASE_CASES}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Malaria" fill="#8884d8" />
                    <Bar dataKey="Dengue" fill="#82ca9d" />
                    <Bar dataKey="TB" fill="#ffc658" />
                    <Bar dataKey="COVID" fill="#ff7f50" />
                    <Bar dataKey="Diarrhea" fill="#a4de6c" />
                    <Bar dataKey="Pneumonia" fill="#d0ed57" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {["Malaria", "Dengue", "Diarrhea"].map((disease, idx) => {
                  const currentMonth = DISEASE_CASES[DISEASE_CASES.length - 1];
                  const previousMonth = DISEASE_CASES[DISEASE_CASES.length - 2];
                  const current = currentMonth[disease];
                  const previous = previousMonth[disease];
                  const change = ((current - previous) / previous * 100).toFixed(1);
                  
                  return (
                    <div key={idx} className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500">
                      <h4 className="font-semibold text-gray-700 mb-2">{disease}</h4>
                      <p className="text-3xl font-bold text-blue-600 mb-2">{current}</p>
                      <p className="text-xs text-gray-500">cases this month</p>
                      <div className={`mt-2 flex items-center text-xs ${change > 0 ? 'text-red-600' : 'text-green-600'}`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {change > 0 ? '+' : ''}{change}% from last month
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TRAINING */}
          {section === "training" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <FileText className="w-6 h-6 text-green-600" />
                    Training Materials & Guidelines
                  </h3>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm">
                    <Plus className="w-4 h-4" /> Upload Material
                  </button>
                </div>

                <div className="grid gap-4">
                  {TRAINING_MATERIALS.map((t) => (
                    <div key={t.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg ${t.type === 'PDF' ? 'bg-red-100' : 'bg-blue-100'}`}>
                          {t.type === 'PDF' ? 
                            <FileText className="w-6 h-6 text-red-600" /> : 
                            <Video className="w-6 h-6 text-blue-600" />
                          }
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{t.title}</h4>
                          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{t.category}</span>
                            <span>{t.size}</span>
                            <span>Uploaded: {t.uploaded}</span>
                            <span className="flex items-center gap-1">
                              <Download className="w-3 h-3" /> {t.downloads} downloads
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                          <Eye className="w-4 h-4" /> View
                        </button>
                        <button className="px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 flex items-center gap-2 text-sm">
                          <Download className="w-4 h-4" /> Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* REPORTS */}
          {section === "reports" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <BarChart className="w-6 h-6 text-green-600" />
                  Reports & Analytics
                </h3>

                <div className="grid lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                    <h4 className="font-semibold mb-4 text-gray-800">Beneficiary Distribution</h4>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie 
                          data={BENEFICIARIES} 
                          dataKey="total" 
                          nameKey="type" 
                          cx="50%" 
                          cy="50%" 
                          outerRadius={100} 
                          fill="#82ca9d" 
                          label
                        >
                          {BENEFICIARIES.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                    <h4 className="font-semibold mb-4 text-gray-800">Monthly Target Achievement</h4>
                    <div className="space-y-3">
                      {MONTHLY_TARGETS.map((target, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">{target.indicator}</span>
                            <span className="font-bold">{target.achieved}/{target.target}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${target.percentage >= 90 ? 'bg-green-500' : target.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${target.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                  <h4 className="font-semibold mb-4">Quick Reports</h4>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors">
                      <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Monthly HMIS Report</p>
                      <p className="text-xs text-gray-500 mt-1">Generate full report</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors">
                      <Download className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Stock Status Report</p>
                      <p className="text-xs text-gray-500 mt-1">Export to Excel</p>
                    </button>
                    <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-600 hover:bg-green-50 transition-colors">
                      <Activity className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm font-semibold">Performance Dashboard</p>
                      <p className="text-xs text-gray-500 mt-1">View detailed metrics</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {section === "notifications" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Bell className="w-6 h-6 text-green-600" />
                    Notifications & Alerts
                  </h3>
                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                    Mark all as read
                  </button>
                </div>

                <div className="space-y-3">
                  {NOTIFICATIONS.map((n) => (
                    <div 
                      key={n.id} 
                      className={`border-2 p-5 rounded-xl cursor-pointer transition-all ${
                        n.read ? 'border-gray-200 bg-white' : 'border-green-200 bg-green-50'
                      } hover:shadow-md`}
                      onClick={() => setSelectedNotification(n.id === selectedNotification ? null : n.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`p-2 rounded-lg ${
                            n.priority === 'Critical' ? 'bg-red-100' :
                            n.priority === 'High' ? 'bg-orange-100' :
                            'bg-blue-100'
                          }`}>
                            <Bell className={`w-5 h-5 ${
                              n.priority === 'Critical' ? 'text-red-600' :
                              n.priority === 'High' ? 'text-orange-600' :
                              'text-blue-600'
                            }`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-bold text-lg">{n.title}</h4>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(n.priority)}`}>
                                {n.priority}
                              </span>
                              {!n.read && (
                                <span className="px-2 py-1 bg-green-600 text-white rounded text-xs font-semibold">
                                  New
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 mb-2">{n.body}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {n.date} at {n.time}
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> From: {n.from}
                              </span>
                            </div>
                            {selectedNotification === n.id && (
                              <div className="mt-4 pt-4 border-t">
                                <div className="flex gap-2">
                                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm">
                                    Take Action
                                  </button>
                                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                                    Dismiss
                                  </button>
                                  <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                                    Forward
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SETTINGS */}
          {section === "settings" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-green-600" />
                  Settings & Configuration
                </h3>
                
                <div className="grid gap-6">
                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      PHC Profile
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PHC Name</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                          placeholder="PHC Name" 
                          defaultValue="PHC Balarampur" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Block</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                          placeholder="Block Name" 
                          defaultValue="Motihari" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
                        <input 
                          type="text" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                          placeholder="District" 
                          defaultValue="East Champaran" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
                        <input 
                          type="tel" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                          placeholder="Phone Number" 
                          defaultValue="06252-XXXXXX" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Activity className="w-5 h-5 text-green-600" />
                      Data Synchronization
                    </h4>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">Enable Auto Sync</p>
                          <p className="text-sm text-gray-500">Automatically sync data with central server</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600" />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">Real-time Updates</p>
                          <p className="text-sm text-gray-500">Get instant updates from field workers</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600" />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">Offline Mode</p>
                          <p className="text-sm text-gray-500">Allow data entry when offline</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600" />
                      </label>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-600" />
                      User Management
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Role</label>
                        <select className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500">
                          <option>Admin</option>
                          <option>Doctor</option>
                          <option>ANM</option>
                          <option>ASHA</option>
                          <option>Pharmacist</option>
                        </select>
                      </div>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Add New User
                      </button>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-green-600" />
                      Notification Preferences
                    </h4>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive important updates via email</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600" />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">SMS Alerts</p>
                          <p className="text-sm text-gray-500">Get critical alerts via SMS</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600" />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                        <div>
                          <p className="font-medium">Stock Alerts</p>
                          <p className="text-sm text-gray-500">Notify when stock falls below threshold</p>
                        </div>
                        <input type="checkbox" defaultChecked className="w-5 h-5 text-green-600" />
                      </label>
                    </div>
                  </div>

                  <div className="border-2 border-gray-200 p-6 rounded-xl">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-green-600" />
                      Stock Thresholds
                    </h4>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Critical Level</label>
                        <input 
                          type="number" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                          placeholder="Percentage" 
                          defaultValue="20" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Low Level</label>
                        <input 
                          type="number" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                          placeholder="Percentage" 
                          defaultValue="40" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Moderate Level</label>
                        <input 
                          type="number" 
                          className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500" 
                          placeholder="Percentage" 
                          defaultValue="60" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium">
                      Cancel
                    </button>
                    <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                      Save Changes
                    </button>
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