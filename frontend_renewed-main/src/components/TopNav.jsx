import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineWifi, AiOutlineGlobal, AiOutlineHeart } from 'react-icons/ai';
import { translate, getAvailableLanguages, setLanguage, getCurrentLanguage, getCurrentLanguageName } from '../services/translationService';

export default function TopNav() {
  const navigate = useNavigate();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const availableLangs = getAvailableLanguages();
  const currentLang = getCurrentLanguage();
  const currentLangName = getCurrentLanguageName();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Online/offline status listener
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setLangMenuOpen(false);
  };

  // Format time based on language
  const formatTime = () => {
    const options = { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: currentLang === 'en' // Use 12-hour format for English, 24-hour for others
    };
    return currentTime.toLocaleTimeString(currentLang, options);
  };

  // Format date based on language
  const formatDate = () => {
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return currentTime.toLocaleDateString(currentLang, options);
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-20">
        
        {/* Logo & Tagline */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
            <AiOutlineHeart className="text-2xl"/>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-2xl text-gray-900 bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
              {translate('E-Sannidhi')}
            </span>
            <span className="text-sm text-gray-500 mt-0.5">
              {translate('Bringing Healthcare Closer with AI-Powered Offline EHR')}
            </span>
          </div>
        </div>

        {/* Status, Time & Language */}
        <div className="flex items-center space-x-4">
          {/* Current Date & Time */}
          <div className="hidden md:flex flex-col items-end text-right">
            <span className="text-sm font-medium text-gray-900">
              {formatTime()}
            </span>
            <span className="text-xs text-gray-500">
              {formatDate()}
            </span>
          </div>

          {/* Online Status */}
          <div
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm border transition-all ${
              isOnline
                ? 'bg-green-50 text-green-700 border-green-200 shadow-sm'
                : 'bg-red-50 text-red-700 border-red-200'
            }`}
          >
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              isOnline ? 'bg-green-500' : 'bg-red-500'
            }`} />
            <AiOutlineWifi
              className={`w-4 h-4 ${
                isOnline ? 'text-green-600' : 'text-red-600'
              }`}
            />
            <span className="font-medium">
              {isOnline ? translate('Online') : translate('Offline')}
            </span>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all duration-200 border border-purple-200 shadow-sm text-sm font-medium min-w-[120px] justify-between"
              aria-label="Select language"
            >
              <span className="flex items-center">
                <AiOutlineGlobal className="mr-2 w-4 h-4" />
                {currentLangName}
              </span>
              <svg 
                className={`w-4 h-4 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-1">
                <div className="px-3 py-2 border-b border-gray-100">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {translate('Select Language')}
                  </span>
                </div>
                {availableLangs.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`flex items-center justify-between w-full text-left px-4 py-3 text-sm hover:bg-purple-50 transition-colors ${
                      lang.code === currentLang 
                        ? 'bg-purple-50 text-purple-700 font-semibold border-r-2 border-purple-600' 
                        : 'text-gray-700'
                    }`}
                  >
                    <span>{lang.nativeName}</span>
                    <span className="text-xs text-gray-400 ml-2">{lang.name}</span>
                    {lang.code === currentLang && (
                      <div className="w-2 h-2 bg-purple-600 rounded-full ml-2" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close language menu */}
      {langMenuOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setLangMenuOpen(false)}
        />
      )}
    </nav>
  );
}