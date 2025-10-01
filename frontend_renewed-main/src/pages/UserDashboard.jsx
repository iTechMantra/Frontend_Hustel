// src/pages/BeneficiaryDashboard.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout } from '../services/authService';
import { translate } from '../services/translationService';
import JitsiMeetingWrapper from '../components/JitsiMeetingWrapper';
import {
  Home, User, FileText, Calendar, TrendingUp, Bell, BookOpen,
  Phone, MessageSquare, Settings, HelpCircle, LogOut, Download,
  Plus, Eye, MapPin, Clock, CheckCircle, AlertCircle, Activity,
  Users, Baby, Heart, Shield, Stethoscope, Pill, Star, Upload,
  Camera, Video, FileSearch, ThumbsUp, ThumbsDown, ClipboardList,
  Award, UserCheck, FileCheck, ClipboardCheck, Target, BarChart3,
  Smartphone, Wifi, WifiOff, Cloud, CloudOff, Search, Send,
  CameraIcon, Mic, Volume2, PlayCircle, ArrowRight, ArrowLeft,
  Filter, ShoppingCart, Truck, Store, Clock4, CheckSquare,
  AlertTriangle, Info, Mail, Map, Navigation, VideoIcon
} from 'lucide-react';

// Comprehensive Dummy Data for Beneficiary Dashboard
const USER_PROFILE = {
  name: "Priya Sharma",
  age: 26,
  phone: "+91 98765 43210",
  address: "Rampur Village, Block Motihari, Bihar",
  familyId: "FAM2025001",
  rationCard: "BPL123456",
  bloodGroup: "B+",
  aadharNumber: "XXXX-XXXX-1234",
  familyMembers: [
    { name: "Rajesh Sharma", relation: "Husband", age: 30, healthId: "HID2025001" },
    { name: "Baby Rohan", relation: "Son", age: "4 months", healthId: "HID2025002" },
    { name: "Sita Devi", relation: "Mother-in-law", age: 58, healthId: "HID2025003" }
  ]
};

const HEALTH_REMINDERS = [
  { id: "r1", type: "ANC 4th Visit", date: "2025-10-05", time: "10:00 AM", status: "Upcoming", priority: "High", location: "PHC Balarampur", description: "Routine antenatal checkup with weight, BP measurement" },
  { id: "r2", type: "Iron Supplement", date: "2025-10-03", time: "After Lunch", status: "Daily", priority: "Medium", description: "Take iron tablets daily with food" },
  { id: "r3", type: "Ultrasound Scan", date: "2025-10-10", time: "11:30 AM", status: "Scheduled", priority: "High", location: "District Hospital", description: "Level II ultrasound for fetal development" },
  { id: "r4", type: "Blood Test", date: "2025-10-15", time: "09:00 AM", status: "Due", priority: "Medium", location: "PHC Lab", description: "Complete blood count and Hb test" },
  { id: "r5", type: "TT Injection", date: "2025-10-20", time: "02:00 PM", status: "Upcoming", priority: "High", location: "VHND Session", description: "Tetanus Toxoid booster dose" },
];

const PREGNANCY_DETAILS = {
  lmp: "2025-01-15",
  edd: "2025-10-22",
  gestation: "36 weeks 4 days",
  riskStatus: "Low Risk",
  bloodGroup: "B+",
  height: "158 cm",
  prePregnancyWeight: "55 kg",
  currentWeight: "62 kg",
  weightGain: "7 kg",
  bp: "120/80 mmHg",
  hb: "11.2 g/dL",
  urineTest: "Normal",
  bloodSugar: "95 mg/dL",
  ancVisits: [
    { visit: "ANC 1", date: "2025-02-15", status: "Completed", weight: "56 kg", bp: "118/78", hb: "10.8", findings: "Normal pregnancy confirmed" },
    { visit: "ANC 2", date: "2025-04-20", status: "Completed", weight: "58 kg", bp: "120/80", hb: "11.0", findings: "Fetal heartbeat detected" },
    { visit: "ANC 3", date: "2025-07-15", status: "Completed", weight: "60 kg", bp: "122/82", hb: "11.1", findings: "Normal growth scan" },
    { visit: "ANC 4", date: "2025-10-05", status: "Upcoming", weight: "-", bp: "-", hb: "-", findings: "Scheduled" }
  ],
  medications: ["Iron Folic Acid", "Calcium", "Multivitamins"],
  dietAdvice: ["High protein diet", "Iron-rich foods", "Adequate fluids"],
  precautions: ["Regular walks", "Adequate rest", "Avoid heavy lifting"]
};

const IMMUNIZATION_RECORDS = {
  mother: [
    { vaccine: "TT-1", date: "2025-02-15", status: "Completed", nextDue: "-" },
    { vaccine: "TT-2", date: "2025-04-20", status: "Completed", nextDue: "-" },
    { vaccine: "TT Booster", date: "2025-10-20", status: "Upcoming", nextDue: "2025-10-20" }
  ],
  child: [
    { vaccine: "BCG", date: "2025-03-15", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "OPV-0", date: "2025-03-15", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "Hepatitis B-1", date: "2025-03-15", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "Pentavalent-1", date: "2025-04-20", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "OPV-1", date: "2025-04-20", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "Rotavirus-1", date: "2025-04-20", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "Pentavalent-2", date: "2025-05-25", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "OPV-2", date: "2025-05-25", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "Rotavirus-2", date: "2025-05-25", status: "Completed", nextDue: "-", givenBy: "ANM Rekha" },
    { vaccine: "Pentavalent-3", date: "2025-10-30", status: "Due", nextDue: "2025-10-30", givenBy: "-" },
    { vaccine: "OPV-3", date: "2025-10-30", status: "Due", nextDue: "2025-10-30", givenBy: "-" },
    { vaccine: "Rotavirus-3", date: "2025-10-30", status: "Due", nextDue: "2025-10-30", givenBy: "-" },
    { vaccine: "IPV", date: "2025-10-30", status: "Due", nextDue: "2025-10-30", givenBy: "-" },
    { vaccine: "Measles-Rubella-1", date: "2026-03-15", status: "Scheduled", nextDue: "2026-03-15", givenBy: "-" }
  ]
};

const GROWTH_MONITORING = [
  { age: "Birth", weight: "2.8 kg", height: "48 cm", headCircumference: "34 cm", milestone: "Normal delivery", date: "2025-06-15", status: "Recorded" },
  { age: "1 week", weight: "2.9 kg", height: "49 cm", headCircumference: "34.5 cm", milestone: "Breastfeeding established", date: "2025-06-22", status: "Recorded" },
  { age: "1 month", weight: "3.5 kg", height: "52 cm", headCircumference: "36 cm", milestone: "Breastfeeding well", date: "2025-07-15", status: "Recorded" },
  { age: "2 months", weight: "4.2 kg", height: "55 cm", headCircumference: "38 cm", milestone: "Social smile, head control", date: "2025-08-15", status: "Recorded" },
  { age: "4 months", weight: "5.8 kg", height: "62 cm", headCircumference: "41 cm", milestone: "Rolling over, grasping objects", date: "2025-10-15", status: "Upcoming" },
];

const CHRONIC_DISEASE_RECORDS = [
  { condition: "Blood Pressure", value: "120/80 mmHg", date: "2025-09-28", status: "Normal", trend: "Stable", notes: "Within normal range" },
  { condition: "Blood Sugar", value: "95 mg/dL", date: "2025-09-28", status: "Normal", trend: "Stable", notes: "Fasting blood sugar" },
  { condition: "Hemoglobin", value: "11.2 g/dL", date: "2025-09-28", status: "Mild Anemia", trend: "Improving", notes: "Increased from 10.8 g/dL" },
  { condition: "Weight", value: "62 kg", date: "2025-09-28", status: "Normal", trend: "Increasing", notes: "Appropriate pregnancy weight gain" },
];

const PRESCRIPTIONS = [
  { id: "p1", doctor: "Dr. Sharma", date: "2025-09-28", medicines: ["Iron Folic Acid - 1 tab daily", "Calcium - 2 tabs daily", "Multivitamin - 1 tab daily"], file: "prescription_sep28.pdf", diagnosis: "Pregnancy with mild anemia" },
  { id: "p2", doctor: "ANM Rekha", date: "2025-07-15", medicines: ["Prenatal Vitamins - 1 tab daily"], file: "prescription_jul15.pdf", diagnosis: "Routine antenatal care" },
  { id: "p3", doctor: "Dr. Verma", date: "2025-04-20", medicines: ["Folic Acid - 1 tab daily"], file: "prescription_apr20.pdf", diagnosis: "Early pregnancy care" },
];

const LAB_REPORTS = [
  { id: "l1", test: "Complete Blood Count", date: "2025-09-28", lab: "PHC Lab", file: "cbc_sep28.pdf", status: "Normal", parameters: "Hb: 11.2, WBC: 7800, Platelets: 2.5L" },
  { id: "l2", test: "Blood Sugar Fasting", date: "2025-09-28", lab: "PHC Lab", file: "sugar_sep28.pdf", status: "Normal", parameters: "FBS: 95 mg/dL" },
  { id: "l3", test: "Urine Routine", date: "2025-07-15", lab: "PHC Lab", file: "urine_jul15.pdf", status: "Normal", parameters: "No protein, no sugar" },
  { id: "l4", test: "Ultrasound", date: "2025-07-15", lab: "District Hospital", file: "usg_jul15.pdf", status: "Normal", parameters: "Single live fetus, appropriate growth" },
];

const REFERRAL_HISTORY = [
  { id: "ref1", date: "2025-09-20", from: "ASHA Sunita", to: "PHC Doctor", reason: "Routine ANC Checkup", status: "Completed", outcome: "Normal checkup, prescription given" },
  { id: "ref2", date: "2025-10-05", from: "ANM Rekha", to: "Ultrasound Center", reason: "Level II Ultrasound", status: "Scheduled", outcome: "Awaiting appointment" },
  { id: "ref3", date: "2025-08-15", from: "ASHA Sunita", to: "PHC Lab", reason: "Hb Test", status: "Completed", outcome: "Hb: 11.2 g/dL, mild anemia" },
  { id: "ref4", date: "2025-06-20", from: "ANM Rekha", to: "PHC Doctor", reason: "Initial Pregnancy Registration", status: "Completed", outcome: "Pregnancy confirmed, ANC started" },
];

const MESSAGES = [
  { id: "m1", from: "ASHA Sunita", date: "2025-09-30", time: "10:30 AM", message: "Remember your ANC visit tomorrow at 10 AM. Don't forget to bring your reports and medicines.", priority: "High", read: false, type: "Appointment Reminder" },
  { id: "m2", from: "ANM Rekha", date: "2025-09-28", time: "03:15 PM", message: "Your Hb levels are improving. Continue iron tablets and include more green vegetables in your diet.", priority: "Medium", read: true, type: "Health Update" },
  { id: "m3", from: "PHC System", date: "2025-09-25", time: "09:00 AM", message: "VHND session on Oct 5th at Anganwadi Center. Nutrition demonstration for pregnant women and immunization for children.", priority: "Medium", read: true, type: "Campaign Alert" },
  { id: "m4", from: "Dr. Sharma", date: "2025-09-20", time: "11:00 AM", message: "Your ultrasound report is normal. Baby is growing well. Continue with prescribed medications.", priority: "Medium", read: true, type: "Test Results" },
  { id: "m5", from: "ASHA Sunita", date: "2025-09-18", time: "02:45 PM", message: "I will visit your home tomorrow for routine checkup. Please keep your health records ready.", priority: "Medium", read: true, type: "Home Visit" },
  { id: "m6", from: "PHC System", date: "2025-09-15", time: "10:00 AM", message: "New health education videos on pregnancy care are available. Check the Health Education section.", priority: "Low", read: true, type: "Information" }
];

const HEALTH_EDUCATION = [
  { id: "e1", title: "Pregnancy Nutrition Guide", type: "Video", category: "Nutrition", duration: "15 min", downloads: 245, size: "45 MB", description: "Learn about essential nutrients during pregnancy" },
  { id: "e2", title: "Breastfeeding Benefits & Techniques", type: "Audio", category: "Infant Care", duration: "8 min", downloads: 189, size: "12 MB", description: "Audio guide for successful breastfeeding" },
  { id: "e3", title: "Family Planning Methods", type: "PDF", category: "Family Planning", duration: "12 pages", downloads: 156, size: "2.3 MB", description: "Complete guide to family planning options" },
  { id: "e4", title: "Newborn Care Basics", type: "Video", category: "Child Health", duration: "20 min", downloads: 278, size: "68 MB", description: "Essential newborn care practices" },
  { id: "e5", title: "Postnatal Care Guide", type: "PDF", category: "Maternal Health", duration: "15 pages", downloads: 134, size: "3.1 MB", description: "Care for mother after delivery" },
  { id: "e6", title: "Immunization Schedule", type: "PDF", category: "Child Health", duration: "8 pages", downloads: 298, size: "1.8 MB", description: "Complete vaccination timeline for children" },
];

const CAMPAIGNS = [
  { id: "c1", title: "Nutrition Awareness Drive", date: "2025-10-05", time: "10:00 AM", location: "Anganwadi Center", organizer: "ANM Rekha", status: "Upcoming", description: "Learn about balanced diet for pregnant women and children" },
  { id: "c2", title: "Immunization Camp", date: "2025-10-12", time: "09:00 AM", location: "PHC Balarampur", organizer: "PHC Staff", status: "Upcoming", description: "Free vaccination for children and pregnant women" },
  { id: "c3", title: "Health Checkup Camp", date: "2025-09-20", time: "10:00 AM", location: "Village Square", organizer: "ASHA Sunita", status: "Completed", description: "Free health checkups for entire family" },
  { id: "c4", title: "Hygiene Awareness Session", date: "2025-10-25", time: "11:00 AM", location: "Community Hall", organizer: "PHC Team", status: "Upcoming", description: "Importance of sanitation and hygiene practices" },
];

const MEDICINE_STOCK = [
  { medicine: "Iron Folic Acid Tablets", available: true, quantity: "50 strips", location: "ASHA Sunita", expiry: "2026-03-15", price: "Free" },
  { medicine: "Calcium Tablets", available: true, quantity: "30 strips", location: "ASHA Sunita", expiry: "2026-05-20", price: "Free" },
  { medicine: "Paracetamol", available: false, quantity: "Out of stock", location: "ASHA Sunita", expiry: "-", price: "₹10" },
  { medicine: "ORS Packets", available: true, quantity: "100 packets", location: "PHC Pharmacy", expiry: "2026-08-10", price: "Free" },
  { medicine: "Zinc Tablets", available: true, quantity: "80 strips", location: "PHC Pharmacy", expiry: "2026-04-25", price: "Free" },
  { medicine: "Prenatal Vitamins", available: true, quantity: "25 bottles", location: "PHC Pharmacy", expiry: "2026-02-28", price: "Free" },
];

const ASHA_CONTACT = {
  name: "Sunita Devi",
  phone: "+91 98765 43210",
  village: "Rampur",
  lastVisit: "2025-09-28",
  nextVisit: "2025-10-05",
  availability: "Available",
  experience: "3 years",
  totalFamilies: 45,
  photo: "👩‍⚕️",
  rating: 4.8,
  services: ["Home Visits", "Health Education", "Medicine Distribution", "Referral Support"]
};

const VHND_SCHEDULE = [
  { date: "2025-10-05", activities: ["ANC Checkups", "Immunization", "Nutrition Talk"], location: "Anganwadi Center", time: "10:00 AM - 2:00 PM" },
  { date: "2025-10-12", activities: ["Child Health Checkup", "Growth Monitoring", "Health Education"], location: "PHC Balarampur", time: "9:00 AM - 1:00 PM" },
  { date: "2025-10-19", activities: ["Family Planning", "Adolescent Health", "ANC Registration"], location: "Community Hall", time: "11:00 AM - 3:00 PM" },
];

const APPOINTMENTS = [
  { id: "a1", type: "ANC Visit", doctor: "Dr. Sharma", date: "2025-10-05", time: "10:00 AM", status: "Confirmed", location: "PHC Balarampur", purpose: "Routine antenatal checkup" },
  { id: "a2", type: "Ultrasound", doctor: "Dr. Verma", date: "2025-10-10", time: "11:30 AM", status: "Scheduled", location: "District Hospital", purpose: "Level II ultrasound scan" },
  { id: "a3", type: "Dental Checkup", doctor: "Dr. Gupta", date: "2025-10-15", time: "02:00 PM", status: "Pending", location: "PHC Dental Wing", purpose: "Routine dental examination" },
  { id: "a4", type: "Lab Test", doctor: "Lab Technician", date: "2025-10-08", time: "09:00 AM", status: "Confirmed", location: "PHC Laboratory", purpose: "Blood and urine tests" },
];

const VIDEO_CONSULTATIONS = [
  { id: "v1", doctor: "Dr. Sharma", date: "2025-09-25", time: "11:00 AM", duration: "15 mins", status: "Completed", notes: "Discussed pregnancy progress and medication" },
  { id: "v2", doctor: "Dr. Verma", date: "2025-10-02", time: "03:00 PM", duration: "20 mins", status: "Scheduled", notes: "Follow-up consultation" },
  { id: "v3", doctor: "Dr. Kapoor", date: "2025-09-15", time: "10:30 AM", duration: "25 mins", status: "Completed", notes: "Initial pregnancy consultation" },
];

const FEEDBACK_HISTORY = [
  { id: "f1", date: "2025-09-20", type: "Appreciation", category: "ASHA Service", message: "ASHA Sunita provides excellent support and guidance", status: "Resolved", response: "Thank you for your feedback!" },
  { id: "f2", date: "2025-09-15", type: "Suggestion", category: "PHC Facilities", message: "Waiting area needs more seating arrangements", status: "Under Review", response: "We are working on improving facilities" },
  { id: "f3", date: "2025-09-10", type: "Complaint", category: "Medicine Availability", message: "Iron tablets were out of stock last week", status: "Resolved", response: "Stock has been replenished" },
];

const PHARMACIES = [
  { id: "ph1", name: "Rampur Medical Store", distance: "0.5 km", address: "Main Road, Rampur", phone: "+91 98765 12345", rating: 4.2, delivery: true, timing: "8 AM - 10 PM" },
  { id: "ph2", name: "City Pharmacy", distance: "2 km", address: "Market Road, Motihari", phone: "+91 98765 67890", rating: 4.5, delivery: true, timing: "9 AM - 9 PM" },
  { id: "ph3", name: "Jan Aushadhi Store", distance: "1.2 km", address: "Near PHC, Balarampur", phone: "+91 98765 54321", rating: 4.0, delivery: false, timing: "8 AM - 8 PM" },
];

export default function BeneficiaryDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('home');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [complaint, setComplaint] = useState('');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [syncStatus, setSyncStatus] = useState('Synced');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    let currentUser = null;
    (async () => {
      currentUser = await getCurrentUser();
      if (!currentUser) {
        navigate('/user/login');
        return;
      }
      setUser(currentUser);
      setLoading(false);
    })();
  }, [navigate]);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setSyncStatus('Syncing...');
      setTimeout(() => setSyncStatus('Synced'), 2000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncStatus('Offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const getPriorityColor = (priority) => {
    switch(priority) {
      case "High": return "bg-red-100 text-red-700 border-red-200";
      case "Medium": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case "Completed": return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Upcoming": return <Calendar className="w-4 h-4 text-blue-600" />;
      case "Due": return <Clock className="w-4 h-4 text-orange-600" />;
      case "Daily": return <Activity className="w-4 h-4 text-purple-600" />;
      case "Scheduled": return <Calendar className="w-4 h-4 text-indigo-600" />;
      case "Confirmed": return <CheckSquare className="w-4 h-4 text-green-600" />;
      case "Pending": return <Clock4 className="w-4 h-4 text-orange-600" />;
      default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCallASHA = () => {
    window.open(`tel:${ASHA_CONTACT.phone}`);
  };

  const handleMessageASHA = () => {
    alert(`Opening chat with ASHA ${ASHA_CONTACT.name}`);
  };

  const handleUploadPrescription = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      alert('Prescription uploaded successfully!');
    };
    input.click();
  };

  const handleUploadReport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.jpg,.jpeg,.png';
    input.onchange = (e) => {
      alert('Lab report uploaded successfully!');
    };
    input.click();
  };

  const handleRequestAppointment = () => {
    alert('Appointment request sent to ASHA worker!');
  };

  const handleSubmitFeedback = () => {
    if (feedback) {
      alert('Thank you for your feedback!');
      setFeedback('');
    }
  };

  const handleSubmitComplaint = () => {
    if (complaint) {
      alert('Your complaint has been submitted. We will address it soon.');
      setComplaint('');
    }
  };

  const handleDownloadHealthCard = () => {
    alert('Downloading Digital Health Card...');
  };

  const handleStartVideoCall = () => {
    alert('Starting video consultation with doctor...');
  };

  const handleOrderMedicine = (medicine) => {
    alert(`Order placed for ${medicine}. ASHA will deliver it soon.`);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      alert('Message sent to ASHA worker!');
      setNewMessage('');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your health dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col border-r">
        <div className="p-5 border-b bg-gradient-to-r from-blue-600 to-blue-700">
          <h2 className="text-lg font-bold text-white">Beneficiary Dashboard</h2>
          <p className="text-blue-100 text-xs mt-1">Your Health, Your Records</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {[
            { key: "home", label: "Home / Overview", icon: <Home className="w-4 h-4" /> },
            { key: "profile", label: "My Profile", icon: <User className="w-4 h-4" /> },
            { key: "health_records", label: "My Health Records", icon: <FileText className="w-4 h-4" /> },
            { key: "appointments", label: "Appointments", icon: <Calendar className="w-4 h-4" /> },
            { key: "due_list", label: "Due List / Reminders", icon: <Bell className="w-4 h-4" /> },
            { key: "referrals", label: "Referrals / Visit History", icon: <TrendingUp className="w-4 h-4" /> },
            { key: "medicine_search", label: "Medicine Search", icon: <Pill className="w-4 h-4" /> },
            { key: "messages", label: "Messages & Alerts", icon: <MessageSquare className="w-4 h-4" /> },
            { key: "health_education", label: "Health Education", icon: <BookOpen className="w-4 h-4" /> },
            { key: "campaigns", label: "Campaigns / Awareness", icon: <Star className="w-4 h-4" /> },
            { key: "feedback", label: "Feedback / Complaints", icon: <ThumbsUp className="w-4 h-4" /> },
            { key: "contact_asha", label: "Contact ASHA", icon: <Phone className="w-4 h-4" /> },
            { key: "video_consult", label: "Video Consultation", icon: <Video className="w-4 h-4" /> },
            { key: "settings", label: "Settings", icon: <Settings className="w-4 h-4" /> },
            { key: "help", label: "Help / FAQ", icon: <HelpCircle className="w-4 h-4" /> },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setSection(item.key)}
              className={`w-full text-left px-3 py-2.5 rounded-lg font-medium transition-all flex items-center gap-3 text-sm ${
                section === item.key 
                  ? "bg-blue-600 text-white shadow-md" 
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-3 border-t">
          <div className="mb-3 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs font-semibold text-blue-900">{USER_PROFILE.name}</p>
            <p className="text-xs text-blue-700">Family ID: {USER_PROFILE.familyId}</p>
            <div className="flex items-center gap-2 mt-1">
              {isOnline ? <Wifi className="w-3 h-3 text-green-600" /> : <WifiOff className="w-3 h-3 text-red-600" />}
              <span className="text-xs text-gray-600">{syncStatus}</span>
            </div>
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
                {section === 'home' && 'Health Dashboard'}
                {section === 'profile' && 'My Profile & Family'}
                {section === 'health_records' && 'My Health Records'}
                {section === 'appointments' && 'Appointments'}
                {section === 'due_list' && 'Due List & Reminders'}
                {section === 'referrals' && 'Referrals & Visit History'}
                {section === 'medicine_search' && 'Medicine Search'}
                {section === 'messages' && 'Messages & Alerts'}
                {section === 'health_education' && 'Health Education'}
                {section === 'campaigns' && 'Campaigns & Awareness'}
                {section === 'feedback' && 'Feedback & Complaints'}
                {section === 'contact_asha' && 'Contact ASHA'}
                {section === 'video_consult' && 'Video Consultation'}
                {section === 'settings' && 'Settings'}
                {section === 'help' && 'Help & FAQ'}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Family Health Portal - {USER_PROFILE.address}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                {isOnline ? <Cloud className="w-4 h-4 text-green-600" /> : <CloudOff className="w-4 h-4 text-red-600" />}
                <span className="text-sm text-gray-700">{isOnline ? 'Online' : 'Offline'}</span>
              </div>
              <button className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4" />
                Oct 1, 2025
              </button>
              <button 
                onClick={handleDownloadHealthCard}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                Health Card
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* HOME SECTION */}
          {section === "home" && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-xl shadow-lg text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {USER_PROFILE.name}!</h2>
                <p className="opacity-90">Access your complete health information, upcoming appointments, and connect with healthcare providers</p>
                <div className="flex items-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Baby className="w-4 h-4" />
                    <span>Pregnancy: {PREGNANCY_DETAILS.gestation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4" />
                    <span>EDD: {PREGNANCY_DETAILS.edd}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    <span>Risk: {PREGNANCY_DETAILS.riskStatus}</span>
                  </div>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-blue-600">{HEALTH_REMINDERS.filter(r => r.status === 'Upcoming' || r.status === 'Due').length}</p>
                      <p className="text-gray-600 text-sm mt-1">Upcoming Appointments</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-blue-600">
                    <Activity className="w-3 h-3 mr-1" /> Next: {HEALTH_REMINDERS[0]?.date}
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-green-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-green-600">{IMMUNIZATION_RECORDS.child.filter(i => i.status === 'Completed').length}</p>
                      <p className="text-gray-600 text-sm mt-1">Vaccinations Done</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" /> {IMMUNIZATION_RECORDS.child.filter(i => i.status === 'Due').length} due soon
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-purple-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-purple-600">{MESSAGES.filter(m => !m.read).length}</p>
                      <p className="text-gray-600 text-sm mt-1">Unread Messages</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <Bell className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-purple-600">
                    <Bell className="w-3 h-3 mr-1" /> New updates from ASHA
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-md border-l-4 border-orange-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-orange-600">{USER_PROFILE.familyMembers.length}</p>
                      <p className="text-gray-600 text-sm mt-1">Family Members</p>
                    </div>
                    <div className="bg-orange-100 p-3 rounded-lg">
                      <Users className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-xs text-orange-600">
                    <UserCheck className="w-3 h-3 mr-1" /> All registered
                  </div>
                </div>
              </div>

              {/* Quick Actions & Today's Reminders */}
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Today's Health Reminders
                  </h3>
                  <div className="space-y-3">
                    {HEALTH_REMINDERS.slice(0, 3).map((reminder) => (
                      <div key={reminder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(reminder.status)}
                          <div>
                            <p className="font-semibold text-sm">{reminder.type}</p>
                            <p className="text-xs text-gray-600">{reminder.date} {reminder.time && `• ${reminder.time}`}</p>
                            {reminder.location && (
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {reminder.location}
                              </p>
                            )}
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(reminder.priority)}`}>
                          {reminder.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSection('due_list')}
                    className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium"
                  >
                    View All Reminders
                  </button>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Recent Messages
                  </h3>
                  <div className="space-y-3">
                    {MESSAGES.slice(0, 2).map(message => (
                      <div key={message.id} className={`flex items-start gap-3 p-3 rounded-lg border ${!message.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(message.priority)}`}>
                          {message.priority}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-semibold text-sm">{message.from}</p>
                            <span className="text-xs text-gray-500">{message.type}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{message.message.substring(0, 80)}...</p>
                          <p className="text-xs text-gray-500 mt-1">{message.date} at {message.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setSection('messages')}
                    className="w-full mt-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm font-medium"
                  >
                    View All Messages
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button 
                    onClick={() => setSection('health_records')}
                    className="p-4 border-2 border-blue-200 rounded-lg hover:bg-blue-50 transition-colors text-center group"
                  >
                    <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Health Records</p>
                    <p className="text-xs text-gray-600 mt-1">View medical history</p>
                  </button>
                  <button 
                    onClick={() => setSection('appointments')}
                    className="p-4 border-2 border-green-200 rounded-lg hover:bg-green-50 transition-colors text-center group"
                  >
                    <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Book Appointment</p>
                    <p className="text-xs text-gray-600 mt-1">Schedule visit</p>
                  </button>
                  <button 
                    onClick={() => setSection('medicine_search')}
                    className="p-4 border-2 border-purple-200 rounded-lg hover:bg-purple-50 transition-colors text-center group"
                  >
                    <Pill className="w-8 h-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Medicine Search</p>
                    <p className="text-xs text-gray-600 mt-1">Check availability</p>
                  </button>
                  <button 
                    onClick={handleCallASHA}
                    className="p-4 border-2 border-orange-200 rounded-lg hover:bg-orange-50 transition-colors text-center group"
                  >
                    <Phone className="w-8 h-8 text-orange-600 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">Call ASHA</p>
                    <p className="text-xs text-gray-600 mt-1">Immediate help</p>
                  </button>
                </div>
              </div>

              {/* Family Health Overview */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Family Health Overview
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {USER_PROFILE.familyMembers.map((member, index) => (
                    <div key={index} className="border-2 border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-bold text-gray-800">{member.name}</h4>
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <User className="w-4 h-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Relation:</span>
                          <span className="font-semibold">{member.relation}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age:</span>
                          <span className="font-semibold">{member.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Health ID:</span>
                          <span className="font-mono text-xs">{member.healthId}</span>
                        </div>
                      </div>
                      <button className="w-full mt-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm">
                        View Health Records
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* APPOINTMENTS SECTION */}
          {section === "appointments" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Calendar className="w-6 h-6 text-blue-600" />
                    Appointments Management
                  </h3>
                  <button 
                    onClick={handleRequestAppointment}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm"
                  >
                    <Plus className="w-4 h-4" /> Request Appointment
                  </button>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Upcoming Appointments */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-800">Upcoming Appointments</h4>
                    {APPOINTMENTS.filter(a => a.status !== 'Completed').map((appointment) => (
                      <div key={appointment.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              {getStatusIcon(appointment.status)}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">{appointment.type}</h4>
                              <p className="text-sm text-gray-600">Dr. {appointment.doctor}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            appointment.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                            appointment.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Date & Time:</p>
                            <p className="font-semibold">{appointment.date} at {appointment.time}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Location:</p>
                            <p className="font-semibold flex items-center gap-1">
                              <MapPin className="w-3 h-3" /> {appointment.location}
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-gray-500">Purpose:</p>
                            <p className="font-semibold">{appointment.purpose}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                            Reschedule
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            Cancel
                          </button>
                          <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm">
                            Get Directions
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Quick Actions & History */}
                  <div className="space-y-6">
                    {/* Quick Booking */}
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                      <h4 className="font-semibold mb-4">Quick Appointment Booking</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg hover:bg-blue-100 text-sm font-medium text-left flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-blue-600" />
                          General Checkup
                        </button>
                        <button className="w-full px-4 py-3 bg-white border border-green-300 rounded-lg hover:bg-green-100 text-sm font-medium text-left flex items-center gap-2">
                          <Baby className="w-4 h-4 text-green-600" />
                          ANC Visit
                        </button>
                        <button className="w-full px-4 py-3 bg-white border border-purple-300 rounded-lg hover:bg-purple-100 text-sm font-medium text-left flex items-center gap-2">
                          <Pill className="w-4 h-4 text-purple-600" />
                          Medicine Collection
                        </button>
                        <button className="w-full px-4 py-3 bg-white border border-orange-300 rounded-lg hover:bg-orange-100 text-sm font-medium text-left flex items-center gap-2">
                          <FileSearch className="w-4 h-4 text-orange-600" />
                          Lab Test
                        </button>
                      </div>
                    </div>

                    {/* Appointment History */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h4 className="font-semibold mb-4">Recent Appointments</h4>
                      <div className="space-y-3">
                        {APPOINTMENTS.filter(a => a.status === 'Completed').slice(0, 3).map((appointment) => (
                          <div key={appointment.id} className="p-3 bg-white rounded border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">{appointment.type}</p>
                                <p className="text-xs text-gray-600">Dr. {appointment.doctor}</p>
                              </div>
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{appointment.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MESSAGES & ALERTS SECTION */}
          {section === "messages" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                    Messages & Alerts
                  </h3>
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm">
                      <Plus className="w-4 h-4" /> New Message
                    </button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Messages List */}
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-semibold text-lg text-gray-800">All Messages</h4>
                    <div className="space-y-3">
                      {MESSAGES.map((message) => (
                        <div 
                          key={message.id} 
                          className={`border-2 p-5 rounded-xl cursor-pointer transition-all ${
                            !message.read ? 'border-blue-200 bg-blue-50' : 'border-gray-200'
                          } hover:shadow-md`}
                          onClick={() => setSelectedNotification(message.id === selectedNotification ? null : message.id)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <div className={`p-2 rounded-lg ${
                                message.priority === 'High' ? 'bg-red-100' :
                                message.priority === 'Medium' ? 'bg-orange-100' : 'bg-blue-100'
                              }`}>
                                <Bell className={`w-5 h-5 ${
                                  message.priority === 'High' ? 'text-red-600' :
                                  message.priority === 'Medium' ? 'text-orange-600' : 'text-blue-600'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-bold text-lg">{message.from}</h4>
                                  <span className={`px-2 py-1 rounded text-xs font-semibold border ${getPriorityColor(message.priority)}`}>
                                    {message.priority}
                                  </span>
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                                    {message.type}
                                  </span>
                                  {!message.read && (
                                    <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs font-semibold">
                                      New
                                    </span>
                                  )}
                                </div>
                                <p className="text-gray-700 mb-2">{message.message}</p>
                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {message.date} at {message.time}
                                  </span>
                                </div>
                                {selectedNotification === message.id && (
                                  <div className="mt-4 pt-4 border-t">
                                    <div className="flex gap-2">
                                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                                        Reply
                                      </button>
                                      <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                                        Mark as Read
                                      </button>
                                      <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 text-sm">
                                        Delete
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

                  {/* Quick Actions & Compose */}
                  <div className="space-y-6">
                    {/* Compose New Message */}
                    <div className="bg-white p-5 rounded-xl border-2 border-gray-200">
                      <h4 className="font-semibold mb-4">Send Message to ASHA</h4>
                      <div className="space-y-3">
                        <textarea 
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message here..."
                          className="w-full border rounded-lg p-3 text-sm h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={handleSendMessage}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                          >
                            <Send className="w-4 h-4 inline mr-2" />
                            Send
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            <CameraIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contacts */}
                    <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                      <h4 className="font-semibold mb-3 text-red-800">Emergency Contacts</h4>
                      <div className="space-y-2">
                        <button className="w-full p-3 bg-white border border-red-300 rounded-lg hover:bg-red-100 text-sm text-left flex items-center gap-2">
                          <Phone className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="font-medium">Emergency Helpline</p>
                            <p className="text-xs text-gray-600">Call 108 for ambulance</p>
                          </div>
                        </button>
                        <button className="w-full p-3 bg-white border border-red-300 rounded-lg hover:bg-red-100 text-sm text-left flex items-center gap-2">
                          <Phone className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="font-medium">PHC Emergency</p>
                            <p className="text-xs text-gray-600">+91 98765 00000</p>
                          </div>
                        </button>
                        <button 
                          onClick={handleCallASHA}
                          className="w-full p-3 bg-white border border-red-300 rounded-lg hover:bg-red-100 text-sm text-left flex items-center gap-2"
                        >
                          <Phone className="w-4 h-4 text-red-600" />
                          <div>
                            <p className="font-medium">ASHA Worker</p>
                            <p className="text-xs text-gray-600">{ASHA_CONTACT.phone}</p>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Notification Settings */}
                    <div className="bg-blue-50 p-5 rounded-xl border border-blue-200">
                      <h4 className="font-semibold mb-3">Notification Settings</h4>
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Appointment Reminders</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Medicine Alerts</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Health Tips</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600" />
                          <span className="text-sm">Campaign Updates</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MEDICINE SEARCH SECTION */}
          {section === "medicine_search" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <Pill className="w-6 h-6 text-blue-600" />
                    Medicine Search & Availability
                  </h3>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search medicines..." 
                        className="pl-10 pr-4 py-2 border rounded-lg text-sm w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Medicine Availability */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-800">Available Medicines</h4>
                    <div className="space-y-3">
                      {MEDICINE_STOCK.filter(med => 
                        med.available && 
                        (searchQuery === '' || med.medicine.toLowerCase().includes(searchQuery.toLowerCase()))
                      ).map((medicine, index) => (
                        <div key={index} className="border-2 border-green-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-4">
                              <div className="bg-green-100 p-3 rounded-lg">
                                <Pill className="w-5 h-5 text-green-600" />
                              </div>
                              <div>
                                <h4 className="font-bold text-lg">{medicine.medicine}</h4>
                                <p className="text-sm text-gray-600">Available at: {medicine.location}</p>
                              </div>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                              In Stock
                            </span>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Quantity Available:</p>
                              <p className="font-semibold">{medicine.quantity}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Expiry Date:</p>
                              <p className="font-semibold">{medicine.expiry}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Price:</p>
                              <p className="font-semibold text-green-600">{medicine.price}</p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button 
                              onClick={() => handleOrderMedicine(medicine.medicine)}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm flex items-center gap-2"
                            >
                              <ShoppingCart className="w-4 h-4" /> Order Now
                            </button>
                            <button className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-sm">
                              Contact Supplier
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Out of Stock Medicines */}
                    <div className="mt-6">
                      <h4 className="font-semibold text-lg text-gray-800 mb-3">Currently Unavailable</h4>
                      <div className="space-y-2">
                        {MEDICINE_STOCK.filter(med => !med.available).map((medicine, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div>
                              <p className="font-medium text-sm">{medicine.medicine}</p>
                              <p className="text-xs text-gray-600">Location: {medicine.location}</p>
                            </div>
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold">
                              Out of Stock
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Pharmacy Information & Quick Actions */}
                  <div className="space-y-6">
                    {/* Nearby Pharmacies */}
                    <div className="bg-white p-5 rounded-xl border-2 border-blue-200">
                      <h4 className="font-semibold mb-4">Nearby Pharmacies</h4>
                      <div className="space-y-3">
                        {PHARMACIES.map((pharmacy) => (
                          <div key={pharmacy.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-semibold text-sm">{pharmacy.name}</h5>
                              <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                                <span className="text-xs font-medium">{pharmacy.rating}</span>
                              </div>
                            </div>
                            <div className="space-y-1 text-xs text-gray-600">
                              <p className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {pharmacy.address}
                              </p>
                              <p>📞 {pharmacy.phone}</p>
                              <p>🕒 {pharmacy.timing}</p>
                              <div className="flex justify-between items-center mt-2">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  pharmacy.delivery ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                }`}>
                                  {pharmacy.delivery ? 'Home Delivery' : 'Store Pickup'}
                                </span>
                                <span className="text-blue-600 text-xs font-medium">{pharmacy.distance} away</span>
                              </div>
                            </div>
                            <div className="flex gap-2 mt-3">
                              <button className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700">
                                Call
                              </button>
                              <button className="flex-1 px-3 py-1 border border-blue-600 text-blue-600 rounded text-xs hover:bg-blue-50">
                                Directions
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Medicine Order History */}
                    <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
                      <h4 className="font-semibold mb-4">Recent Orders</h4>
                      <div className="space-y-2">
                        {[
                          { medicine: "Iron Folic Acid", date: "2025-09-25", status: "Delivered", quantity: "1 strip" },
                          { medicine: "Calcium Tablets", date: "2025-09-20", status: "Delivered", quantity: "1 strip" },
                          { medicine: "Prenatal Vitamins", date: "2025-09-15", status: "Delivered", quantity: "1 bottle" }
                        ].map((order, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                            <div>
                              <p className="font-medium text-sm">{order.medicine}</p>
                              <p className="text-xs text-gray-500">{order.date} • {order.quantity}</p>
                            </div>
                            <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                              {order.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Emergency Medicine Request */}
                    <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                      <h4 className="font-semibold mb-3 text-orange-800">Emergency Medicine Request</h4>
                      <p className="text-sm text-orange-700 mb-3">
                        Need medicine urgently? Contact your ASHA worker for immediate assistance.
                      </p>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleCallASHA}
                          className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium"
                        >
                          <Phone className="w-4 h-4 inline mr-2" />
                          Call ASHA
                        </button>
                        <button className="px-4 py-2 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 text-sm">
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
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
                    <BookOpen className="w-6 h-6 text-blue-600" />
                    Health Education Materials
                  </h3>
                  <div className="flex gap-3">
                    <select className="px-4 py-2 border rounded-lg text-sm">
                      <option>All Categories</option>
                      <option>Pregnancy</option>
                      <option>Child Health</option>
                      <option>Nutrition</option>
                      <option>Family Planning</option>
                    </select>
                    <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm">
                      <Filter className="w-4 h-4" /> Filter
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {HEALTH_EDUCATION.map((material) => (
                    <div key={material.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-lg transition-shadow group">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`p-3 rounded-lg ${
                          material.type === 'Video' ? 'bg-blue-100' :
                          material.type === 'Audio' ? 'bg-purple-100' : 'bg-green-100'
                        }`}>
                          {material.type === 'Video' && <PlayCircle className="w-6 h-6 text-blue-600" />}
                          {material.type === 'Audio' && <Volume2 className="w-6 h-6 text-purple-600" />}
                          {material.type === 'PDF' && <FileText className="w-6 h-6 text-green-600" />}
                        </div>
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-semibold">
                          {material.type}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                        {material.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                          {material.category}
                        </span>
                        <span>{material.duration} • {material.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          <Download className="w-3 h-3 inline mr-1" />
                          {material.downloads} downloads
                        </span>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs flex items-center gap-1">
                            <PlayCircle className="w-3 h-3" /> View
                          </button>
                          <button className="px-3 py-1 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 text-xs flex items-center gap-1">
                            <Download className="w-3 h-3" /> Download
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Audio Player Section */}
                <div className="mt-8 bg-purple-50 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-semibold mb-4 text-purple-800">Audio Health Guides</h4>
                  <div className="space-y-4">
                    {HEALTH_EDUCATION.filter(m => m.type === 'Audio').map((audio) => (
                      <div key={audio.id} className="flex items-center justify-between p-4 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 p-3 rounded-lg">
                            <Volume2 className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <h5 className="font-medium text-sm">{audio.title}</h5>
                            <p className="text-xs text-gray-500">{audio.duration}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700">
                            <PlayCircle className="w-4 h-4" />
                          </button>
                          <button className="p-2 border border-purple-600 text-purple-600 rounded-full hover:bg-purple-50">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REFERRALS SECTION */}
          {section === "referrals" && (
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  Referrals & Visit History
                </h3>

                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Referral History */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg text-gray-800">Referral History</h4>
                    {REFERRAL_HISTORY.map((referral) => (
                      <div key={referral.id} className="border-2 border-gray-200 p-5 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-4">
                            <div className="bg-blue-100 p-3 rounded-lg">
                              {getStatusIcon(referral.status)}
                            </div>
                            <div>
                              <h4 className="font-bold text-lg">Referral to {referral.to}</h4>
                              <p className="text-sm text-gray-600">Referred by: {referral.from}</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${
                            referral.status === 'Completed' ? 'bg-green-100 text-green-700' :
                            referral.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {referral.status}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Date:</p>
                            <p className="font-semibold">{referral.date}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Reason:</p>
                            <p className="font-semibold text-red-600">{referral.reason}</p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-gray-500">Outcome:</p>
                            <p className="font-semibold">{referral.outcome}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                            View Details
                          </button>
                          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                            Download Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Visit Statistics & Quick Actions */}
                  <div className="space-y-6">
                    {/* Visit Statistics */}
                    <div className="bg-white p-5 rounded-xl border-2 border-blue-200">
                      <h4 className="font-semibold mb-4">Visit Statistics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{REFERRAL_HISTORY.length}</div>
                          <div className="text-xs text-gray-600">Total Referrals</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{REFERRAL_HISTORY.filter(r => r.status === 'Completed').length}</div>
                          <div className="text-xs text-gray-600">Completed</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{REFERRAL_HISTORY.filter(r => r.status === 'Scheduled').length}</div>
                          <div className="text-xs text-gray-600">Scheduled</div>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">4</div>
                          <div className="text-xs text-gray-600">This Month</div>
                        </div>
                      </div>
                    </div>

                    {/* Request New Referral */}
                    <div className="bg-green-50 p-5 rounded-xl border border-green-200">
                      <h4 className="font-semibold mb-3">Need a Referral?</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Request a referral to specialist doctors or advanced healthcare facilities.
                      </p>
                      <div className="space-y-2">
                        <button className="w-full px-4 py-3 bg-white border border-green-300 rounded-lg hover:bg-green-100 text-sm font-medium text-left flex items-center gap-2">
                          <Stethoscope className="w-4 h-4 text-green-600" />
                          Specialist Doctor
                        </button>
                        <button className="w-full px-4 py-3 bg-white border border-green-300 rounded-lg hover:bg-green-100 text-sm font-medium text-left flex items-center gap-2">
                          <FileSearch className="w-4 h-4 text-green-600" />
                          Diagnostic Test
                        </button>
                        <button className="w-full px-4 py-3 bg-white border border-green-300 rounded-lg hover:bg-green-100 text-sm font-medium text-left flex items-center gap-2">
                          <Baby className="w-4 h-4 text-green-600" />
                          Maternal Care
                        </button>
                      </div>
                    </div>

                    {/* Upcoming Visits */}
                    <div className="bg-orange-50 p-5 rounded-xl border border-orange-200">
                      <h4 className="font-semibold mb-3">Upcoming Visits</h4>
                      <div className="space-y-2">
                        {REFERRAL_HISTORY.filter(r => r.status === 'Scheduled').map((referral) => (
                          <div key={referral.id} className="p-3 bg-white rounded border">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">{referral.to}</p>
                                <p className="text-xs text-gray-600">{referral.reason}</p>
                              </div>
                              <Clock className="w-4 h-4 text-orange-600" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{referral.date}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ADDITIONAL SECTIONS WOULD CONTINUE HERE */}
          {/* Due List, Campaigns, Feedback, Contact ASHA, Video Consultation, Settings, Help */}

        </div>
      </div>
    </div>
  );
}