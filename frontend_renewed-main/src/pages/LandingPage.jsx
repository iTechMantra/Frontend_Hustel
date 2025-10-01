// src/pages/LandingPage.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCurrentLanguage,
  setLanguage,
  getToggleLanguage,
  getToggleLanguageName,
  translate,
  initializeTranslations,
} from "../services/translationService";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import {
  Shield,
  Brain,
  Video,
  FileText,
  Heart,
  User,
  Stethoscope,
  Activity,
  Bell,
  MapPin,
  Award,
  Users,
} from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(getCurrentLanguage());
  const roleSectionRef = useRef(null);

  useEffect(() => {
    initializeTranslations();
  }, [navigate]);


  const handleRoleSelect = (role) => {
    switch (role) {
      case "patient":
        navigate("/patient/signup");
        break;
      case "asha":
        navigate("/asha/signup");
        break;
      case "anm":
        navigate("/anm/signup");
        break;
      case "phc":
        navigate("/phc/signup");
        break;
      default:
        break;
    }
  };

  // --- Features Section ---
  const FeatureCard = ({ icon, title, description, color }) => (
    <div className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-pink-100">
      <div
        className={`${color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {translate(title)}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {translate(description)}
      </p>
    </div>
  );

  const features = [
    {
      icon: <Brain className="h-6 w-6 text-white" />,
      title: "AI Symptom Checker",
      description:
        "Simple AI tool for quick health guidance – built to support ASHAs in the field.",
      color: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      icon: <Video className="h-6 w-6 text-white" />,
      title: "Video Consultations",
      description: "Patients connect with PHC doctors securely when needed.",
      color: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
    {
      icon: <FileText className="h-6 w-6 text-white" />,
      title: "Digital Health Passbook",
      description: "Every family carries a QR health record – like a ration card, but digital.",
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
    },
    {
      icon: <Activity className="h-6 w-6 text-white" />,
      title: "ANC & Immunization Tracker",
      description: "Reminders for pregnant mothers and vaccines – even offline.",
      color: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "ASHA Rewards",
      description:
        "Earn points & badges for completed visits – celebrate every effort.",
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
    {
      icon: <MapPin className="h-6 w-6 text-white" />,
      title: "Smart Household Mapping",
      description:
        "Digital registers replacing paper – ASHAs save time & reduce errors.",
      color: "bg-gradient-to-br from-green-400 to-green-600",
    },
  ];

  // --- Roles Section ---
  const roles = [
    {
      role: "asha",
      title: "ASHA Worker",
      description:
        "Your village’s health champion – record data offline, get reminders, and earn rewards.",
      icon: <Heart className="h-8 w-8 text-white" />,
      gradient: "bg-gradient-to-br from-pink-400 to-pink-600",
    },
    {
      role: "anm",
      title: "ANM",
      description:
        "Supervise ASHAs, validate data, and guide maternal & child healthcare.",
      icon: <Stethoscope className="h-8 w-8 text-white" />,
      gradient: "bg-gradient-to-br from-purple-400 to-purple-600",
    },
    {
      role: "phc",
      title: "PHC Staff",
      description:
        "Access dashboards, reports, and village analytics for better planning.",
      icon: <Users className="h-8 w-8 text-white" />,
      gradient: "bg-gradient-to-br from-teal-400 to-teal-600",
    },
    {
      role: "patient",
      title: "Patient",
      description:
        "View your health passbook, get reminders, and consult doctors via ASHA.",
      icon: <User className="h-8 w-8 text-white" />,
      gradient: "bg-gradient-to-br from-blue-400 to-blue-600",
    },
  ];

  const RoleCard = ({ role, title, description, icon, gradient }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      onClick={() => handleRoleSelect(role)}
      className="group cursor-pointer bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 h-full"
    >
      <div
        className={`${gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">
        {translate(title)}
      </h3>
      <p className="text-gray-600 mb-4">{translate(description)}</p>
      <div className="flex items-center text-pink-600 font-semibold group-hover:translate-x-1 transition-transform duration-300">
        <span>{translate("Get Started →")}</span>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-teal-50 font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-100 via-white to-teal-100 py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
            {translate("E-Sannidhi")}{" "}
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-teal-500 bg-clip-text text-transparent">
              {translate("Healthcare Starts with You")}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-10 leading-relaxed">
            {translate(
              "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations."
            )}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() =>
                roleSectionRef.current.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gradient-to-r from-pink-500 to-teal-500 hover:from-pink-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {translate("Get Started Today")}
            </button>
           
 

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translate("Key Features")}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {translate(
                "Built for ASHAs, ANMs, PHC staff, and patients in rural India."
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Role Selection */}
      <section ref={roleSectionRef} className="py-16 md:py-20 bg-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {translate("Choose Your Role")}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {translate(
                "Select your role to see your personalized healthcare dashboard."
              )}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {roles.map((role) => (
              <RoleCard key={role.role} {...role} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
