// src/services/translationService.js

// Translation dictionaries for multiple languages
const dictionaries = {
  en: {
    // Common
    'Welcome': 'Welcome',
    'Login': 'Login',
    'Sign up': 'Sign up',
    'Logout': 'Logout',
    'Home': 'Home',
    'Profile': 'Profile',
    'Settings': 'Settings',
    'Save': 'Save',
    'Cancel': 'Cancel',
    'Submit': 'Submit',
    'Search': 'Search',
    'Yes': 'Yes',
    'No': 'No',
    'OK': 'OK',
    'Error': 'Error',
    'Success': 'Success',
    'Loading': 'Loading',
    'Please wait': 'Please wait',

    // Navigation
    'Dashboard': 'Dashboard',
    'Messages': 'Messages',
    'Video Call': 'Video Call',
    'Health Records': 'Health Records',
    'Prescriptions': 'Prescriptions',
    'Medicine Search': 'Medicine Search',
    'Orders': 'Orders',
    'Waiting Room': 'Waiting Room',
    'Patients': 'Patients',
    'Statistics': 'Statistics',
    'Campaign': 'Campaign',
    'Add Patient': 'Add Patient',

    // Roles
    'Patient': 'Patient',
    'ASHA Worker': 'ASHA Worker',
    'ANM': 'ANM',
    'PHC Staff': 'PHC Staff',
    'Doctor': 'Doctor',
    'Pharmacy': 'Pharmacy',
    'Admin': 'Admin',

    // Landing / Hero
    'Healthcare': 'Healthcare',
    'Healthcare Starts with You': 'Healthcare Starts with You',
    'Healthcare Reimagined': 'Healthcare Reimagined',
    'Secure & Private': 'Secure & Private',
    '24/7 Available': '24/7 Available',
    'Community Care': 'Community Care',
    'Get Started Today': 'Get Started Today',
    'Choose Your Role': 'Choose Your Role',

    // Features
    'AI Symptom Checker': 'AI Symptom Checker',
    'Video Consultations': 'Video Consultations',
    'Digital Health Records': 'Digital Health Records',
    'Digital Health Passbook': 'Digital Health Passbook',
    'ANC & Immunization Tracker': 'ANC & Immunization Tracker',
    'Smart Notifications': 'Smart Notifications',
    'Smart Household Mapping': 'Smart Household Mapping',
    'ASHA Rewards': 'ASHA Rewards',

    // Dashboards
    'Reminders': 'Reminders',
    'Reports': 'Reports',
    'Appointments': 'Appointments',
    'Patient History': 'Patient History',
    'Sync Status': 'Sync Status',
    'Performance': 'Performance',
    'Emergency': 'Emergency',
    'Medicine Stock': 'Medicine Stock',
    'Community Trends': 'Community Trends',
    'Feedback': 'Feedback',

    "E-Sannidhi Healthcare Starts with You": "E-Sannidhi Healthcare Starts with You",
  "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
    "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.",

  "Key Features": "Key Features",
  "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
    "Built for ASHAs, ANMs, PHC staff, and patients in rural India.",

  "Select your role to see your personalized healthcare dashboard.": 
    "Select your role to see your personalized healthcare dashboard."
  },

  pa: {
    // Common
    'Welcome': 'ਸੁਆਗਤ ਹੈ',
    'Login': 'ਲੌਗਇਨ',
    'Sign up': 'ਸਾਇਨ ਅੱਪ',
    'Logout': 'ਲੌਗਆਉਟ',
    'Home': 'ਘਰ',
    'Profile': 'ਪ੍ਰੋਫਾਈਲ',
    'Settings': 'ਸੈੱਟਿੰਗਜ਼',
    'Save': 'ਸੇਵ ਕਰੋ',
    'Cancel': 'ਰੱਦ ਕਰੋ',
    'Submit': 'ਜਮ੍ਹਾ ਕਰੋ',
    'Search': 'ਖੋਜੋ',
    'Yes': 'ਹਾਂ',
    'No': 'ਨਹੀਂ',
    'OK': 'ਠੀਕ ਹੈ',
    'Error': 'ਗਲਤੀ',
    'Success': 'ਸਫਲਤਾ',
    'Loading': 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ',
    'Please wait': 'ਕਿਰਪਾ ਕਰਕੇ ਇੰਤਜ਼ਾਰ ਕਰੋ',

    // Navigation
    'Dashboard': 'ਡੈਸ਼ਬੋਰਡ',
    'Messages': 'ਸੰਦੇਸ਼',
    'Video Call': 'ਵੀਡੀਓ ਕਾਲ',
    'Health Records': 'ਸਿਹਤ ਰਿਕਾਰਡ',
    'Prescriptions': 'ਪ੍ਰੈਸਕ੍ਰਿਪਸ਼ਨ',
    'Patients': 'ਮਰੀਜ਼',
    'Statistics': 'ਆਂਕੜੇ',
    'Campaign': 'ਮੁਹਿੰਮ',
    'Add Patient': 'ਮਰੀਜ਼ ਜੋੜੋ',

    // Roles
    'Patient': 'ਮਰੀਜ਼',
    'ASHA Worker': 'ਆਸ਼ਾ ਵਰਕਰ',
    'ANM': 'ਏਐਨਐਮ',
    'PHC Staff': 'ਪੀਐਚਸੀ ਸਟਾਫ',
    'Doctor': 'ਡਾਕਟਰ',
    'Pharmacy': 'ਫਾਰਮਸੀ',
    'Admin': 'ਐਡਮਿਨ',

    // Landing / Hero
    'Healthcare': 'ਸਿਹਤ ਸੇਵਾ',
    'Healthcare Starts with You': 'ਸਿਹਤ ਸੇਵਾ ਤੁਹਾਡੇ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ',
    'Healthcare Reimagined': 'ਸਿਹਤ ਸੇਵਾ ਦਾ ਨਵਾਂ ਰੂਪ',
    'Secure & Private': 'ਸੁਰੱਖਿਅਤ ਅਤੇ ਪ੍ਰਾਈਵੇਟ',
    '24/7 Available': '24/7 ਉਪਲਬਧ',
    'Community Care': 'ਭਾਈਚਾਰਕ ਸਿਹਤ',
    'Get Started Today': 'ਅੱਜ ਹੀ ਸ਼ੁਰੂ ਕਰੋ',
    'Choose Your Role': 'ਆਪਣਾ ਰੋਲ ਚੁਣੋ',

    // Features
    'AI Symptom Checker': 'ਏਆਈ ਲੱਛਣ ਚੈਕਰ',
    'Video Consultations': 'ਵੀਡੀਓ ਸਲਾਹ',
    'Digital Health Records': 'ਡਿਜਿਟਲ ਸਿਹਤ ਰਿਕਾਰਡ',
    'Digital Health Passbook': 'ਡਿਜਿਟਲ ਸਿਹਤ ਪਾਸਬੁੱਕ',
    'ANC & Immunization Tracker': 'ਐਐਨਸੀ ਅਤੇ ਟੀਕਾਕਰਣ ਟ੍ਰੈਕਰ',
    'Smart Notifications': 'ਸਮਾਰਟ ਨੋਟੀਫਿਕੇਸ਼ਨ',
    'Smart Household Mapping': 'ਸਮਾਰਟ ਘਰੇਲੂ ਰਜਿਸਟਰ',
    'ASHA Rewards': 'ਆਸ਼ਾ ਇਨਾਮ',

    // Dashboards
    'Reminders': 'ਯਾਦ ਦਿਹਾਣੀਆਂ',
    'Reports': 'ਰਿਪੋਰਟਾਂ',
    'Appointments': 'ਮੁਲਾਕਾਤਾਂ',
    'Patient History': 'ਮਰੀਜ਼ ਇਤਿਹਾਸ',
    'Sync Status': 'ਸਿੰਕ ਸਥਿਤੀ',
    'Performance': 'ਕਾਰਗੁਜ਼ਾਰੀ',
    'Emergency': 'ਐਮਰਜੈਂਸੀ',
    'Medicine Stock': 'ਦਵਾਈ ਸਟਾਕ',
    'Community Trends': 'ਭਾਈਚਾਰਕ ਰੁਝਾਨ',
    'Feedback': 'ਫੀਡਬੈਕ',


      "E-Sannidhi Healthcare Starts with You": "ਈ-ਸੰਨਿਧੀ ਸਿਹਤ ਸੇਵਾ ਤੁਹਾਡੇ ਨਾਲ ਸ਼ੁਰੂ ਹੁੰਦੀ ਹੈ",
  "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
    "ਆਸ਼ਾ, ਏਐਨਐਮ, ਪੀਐਚਸੀ ਸਟਾਫ ਅਤੇ ਮਰੀਜ਼ਾਂ ਨੂੰ ਆਫਲਾਈਨ-ਪਹਿਲਾਂ ਟੂਲ, ਯਾਦ ਦਿਹਾਾਣੀਆਂ ਅਤੇ ਸੁਰੱਖਿਅਤ ਸਲਾਹਾਂ ਨਾਲ ਸਸ਼ਕਤ ਕਰਨਾ।",

  "Key Features": "ਮੁੱਖ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ",
  "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
    "ਭਾਰਤ ਦੇ ਪਿੰਡਾਂ ਵਿੱਚ ਆਸ਼ਾ, ਏਐਨਐਮ, ਪੀਐਚਸੀ ਸਟਾਫ ਅਤੇ ਮਰੀਜ਼ਾਂ ਲਈ ਬਣਾਇਆ ਗਿਆ।",

  "Select your role to see your personalized healthcare dashboard.": 
    "ਆਪਣਾ ਭੂਮਿਕਾ ਚੁਣੋ ਤਾਂ ਜੋ ਆਪਣਾ ਨਿੱਜੀ ਸਿਹਤ ਡੈਸ਼ਬੋਰਡ ਵੇਖ ਸਕੋ।"

  },

  hi: {
    // Common
    'Welcome': 'स्वागत है',
    'Login': 'लॉगिन',
    'Sign up': 'साइन अप',
    'Logout': 'लॉगआउट',
    'Home': 'होम',
    'Profile': 'प्रोफ़ाइल',
    'Settings': 'सेटिंग्स',
    'Save': 'सेव करें',
    'Cancel': 'रद्द करें',
    'Submit': 'सबमिट',
    'Search': 'खोजें',
    'Yes': 'हाँ',
    'No': 'नहीं',
    'OK': 'ठीक है',
    'Error': 'त्रुटि',
    'Success': 'सफलता',
    'Loading': 'लोड हो रहा है',
    'Please wait': 'कृपया प्रतीक्षा करें',

    // Navigation
    'Dashboard': 'डैशबोर्ड',
    'Messages': 'संदेश',
    'Video Call': 'वीडियो कॉल',
    'Health Records': 'स्वास्थ्य रिकॉर्ड',
    'Prescriptions': 'प्रिस्क्रिप्शन',
    'Patients': 'मरीज',
    'Statistics': 'आँकड़े',
    'Campaign': 'अभियान',
    'Add Patient': 'मरीज जोड़ें',

    // Roles
    'Patient': 'मरीज',
    'ASHA Worker': 'आशा कार्यकर्ता',
    'ANM': 'एएनएम',
    'PHC Staff': 'पीएचसी स्टाफ',
    'Doctor': 'डॉक्टर',
    'Pharmacy': 'फार्मेसी',
    'Admin': 'प्रशासक',

    // Landing / Hero
    'Healthcare': 'स्वास्थ्य सेवा',
    'Healthcare Starts with You': 'स्वास्थ्य सेवा की शुरुआत आपसे',
    'Healthcare Reimagined': 'स्वास्थ्य सेवा का नया रूप',
    'Secure & Private': 'सुरक्षित और निजी',
    '24/7 Available': '24/7 उपलब्ध',
    'Community Care': 'समुदाय देखभाल',
    'Get Started Today': 'आज ही शुरू करें',
    'Choose Your Role': 'अपनी भूमिका चुनें',

    // Features
    'AI Symptom Checker': 'एआई लक्षण चेकर',
    'Video Consultations': 'वीडियो परामर्श',
    'Digital Health Records': 'डिजिटल स्वास्थ्य रिकॉर्ड',
    'Digital Health Passbook': 'डिजिटल स्वास्थ्य पासबुक',
    'ANC & Immunization Tracker': 'गर्भावस्था और टीकाकरण ट्रैकर',
    'Smart Notifications': 'स्मार्ट सूचनाएं',
    'Smart Household Mapping': 'स्मार्ट परिवार मानचित्रण',
    'ASHA Rewards': 'आशा पुरस्कार',

    // Dashboards
    'Reminders': 'अनुस्मारक',
    'Reports': 'रिपोर्टें',
    'Appointments': 'नियुक्तियां',
    'Patient History': 'मरीज इतिहास',
    'Sync Status': 'सिंक स्थिति',
    'Performance': 'प्रदर्शन',
    'Emergency': 'आपातकाल',
    'Medicine Stock': 'दवा भंडार',
    'Community Trends': 'समुदाय रुझान',
    'Feedback': 'प्रतिक्रिया',

    "E-Sannidhi Healthcare Starts with You": "ई-सन्निधि स्वास्थ्य सेवा आपकी भागीदारी से ",
  "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
    "आशा, एएनएम, पीएचसी स्टाफ और मरीजों को ऑफलाइन-फर्स्ट टूल्स, रिमाइंडर और सुरक्षित परामर्श के साथ सक्षम बनाना।",

  "Key Features": "मुख्य विशेषताएं",
  "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
    "ग्रामीण भारत में आशा, एएनएम, पीएचसी स्टाफ और मरीजों के लिए बनाया गया।",

  "Select your role to see your personalized healthcare dashboard.": 
    "अपनी भूमिका चुनें और अपना व्यक्तिगत स्वास्थ्य डैशबोर्ड देखें।"
  },

  kn: {
    // Common
    'Welcome': 'ಸ್ವಾಗತ',
    'Login': 'ಲಾಗಿನ್',
    'Sign up': 'ಸೈನ್ ಅಪ್',
    'Logout': 'ಲಾಗೌಟ್',
    'Home': 'ಮನೆ',
    'Profile': 'ಪ್ರೊಫೈಲ್',
    'Settings': 'ಸೆಟ್ಟಿಂಗ್ಸ್',
    'Save': 'ಉಳಿಸಿ',
    'Cancel': 'ರದ್ದುಮಾಡಿ',
    'Submit': 'ಸಲ್ಲಿಸಿ',
    'Search': 'ಹುಡುಕಿ',
    'Yes': 'ಹೌದು',
    'No': 'ಇಲ್ಲ',
    'OK': 'ಸರಿ',
    'Error': 'ದೋಷ',
    'Success': 'ಯಶಸ್ಸು',
    'Loading': 'ಲೋಡ್ ಆಗುತ್ತಿದೆ',
    'Please wait': 'ದಯವಿಟ್ಟು ನಿರೀಕ್ಷಿಸಿ',

    // Navigation
    'Dashboard': 'ಡ್ಯಾಶ್ಬೋರ್ಡ್',
    'Messages': 'ಸಂದೇಶಗಳು',
    'Video Call': 'ವೀಡಿಯೊ ಕರೆ',
    'Health Records': 'ಆರೋಗ್ಯ ದಾಖಲೆಗಳು',
    'Prescriptions': 'ಔಷಧ 처방',
    'Patients': 'ರೋಗಿಗಳು',
    'Statistics': 'ಸಂಖ್ಯೆಗಳು',
    'Campaign': 'ಪ್ರಚಾರ',
    'Add Patient': 'ರೋಗಿಯನ್ನು ಸೇರಿಸಿ',

    // Roles
    'Patient': 'ರೋಗಿ',
    'ASHA Worker': 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆ',
    'ANM': 'ಎಎನ್‌ಎಮ್',
    'PHC Staff': 'ಪಿಎಚ್‌ಸಿ ಸಿಬ್ಬಂದಿ',
    'Doctor': 'ವೈದ್ಯ',
    'Pharmacy': 'ಔಷಧ ಅಂಗಡಿ',
    'Admin': 'ನಿರ್ವಾಹಕ',

    // Landing / Hero
    'Healthcare': 'ಆರೋಗ್ಯ ಸೇವೆ',
    'Healthcare Starts with You': 'ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮಿಂದ ',
    'Healthcare Reimagined': 'ಆರೋಗ್ಯ ಸೇವೆಯ ಹೊಸ ರೂಪ',
    'Secure & Private': 'ಭದ್ರ ಮತ್ತು ಖಾಸಗಿ',
    '24/7 Available': '24/7 ಲಭ್ಯವಿದೆ',
    'Community Care': 'ಸಮುದಾಯ ಕಾಳಜಿ',
    'Get Started Today': 'ಇಂದು ಪ್ರಾರಂಭಿಸಿ',
    'Choose Your Role': 'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ',

    // Features
    'AI Symptom Checker': 'ಎಐ ಲಕ್ಷಣ ತಪಾಸಕ',
    'Video Consultations': 'ವೀಡಿಯೊ ಸಮಾಲೋಚನೆ',
    'Digital Health Records': 'ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ದಾಖಲೆಗಳು',
    'Digital Health Passbook': 'ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ಪಾಸ್‌ಬುಕ್',
    'ANC & Immunization Tracker': 'ಗರ್ಭಾವಸ್ಥೆ ಮತ್ತು ಲಸಿಕೆ ಟ್ರ್ಯಾಕರ್',
    'Smart Notifications': 'ಸ್ಮಾರ್ಟ್ ಸೂಚನೆಗಳು',
    'Smart Household Mapping': 'ಸ್ಮಾರ್ಟ್ ಕುಟುಂಬ ಮ್ಯಾಪಿಂಗ್',
    'ASHA Rewards': 'ಆಶಾ ಬಹುಮಾನಗಳು',

    // Dashboards
    'Reminders': 'ನೆನಪಿಗಳು',
    'Reports': 'ವರದಿಗಳು',
    'Appointments': 'ನೇಮಕಾತಿಗಳು',
    'Patient History': 'ರೋಗಿ ಇತಿಹಾಸ',
    'Sync Status': 'ಸಿಂಕ್ ಸ್ಥಿತಿ',
    'Performance': 'ಪ್ರದರ್ಶನ',
    'Emergency': 'ತುರ್ತು',
    'Medicine Stock': 'ಔಷಧಿ ಸ್ಟಾಕ್',
    'Community Trends': 'ಸಮುದಾಯ ಪ್ರವೃತ್ತಿಗಳು',
    'Feedback': 'ಪ್ರತಿಕ್ರಿಯೆ',

     "E-Sannidhi Healthcare Starts with You": "ಇ-ಸನ್ನಿಧಿ ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮಿಂದ ",
  "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
    "ಆಶಾ, ಎಎನ್‌ಎಂ, ಪಿಎಚ್‌ಸಿ ಸಿಬ್ಬಂದಿ ಮತ್ತು ರೋಗಿಗಳನ್ನು ಆಫ್‌ಲೈನ್-ಮೊದಲು ಸಾಧನಗಳು, ರಿಮೈಂಡರ್‌ಗಳು ಮತ್ತು ಸುರಕ್ಷಿತ ಸಲಹೆಗಳ ಮೂಲಕ ಶಕ್ತಗೊಳಿಸಲಾಗುತ್ತಿದೆ.",

  "Key Features": "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
  "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
    "ಗ್ರಾಮೀಣ ಭಾರತದ ಆಶಾ, ಎಎನ್‌ಎಂ, ಪಿಎಚ್‌ಸಿ ಸಿಬ್ಬಂದಿ ಮತ್ತು ರೋಗಿಗಳಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",

  "Select your role to see your personalized healthcare dashboard.": 
    "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ನೋಡಲು ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ."
  },
};

// Initialize translations
export const initializeTranslations = () => {
  console.log('Translations initialized');
};

// Language helpers
export const setLanguage = (langCode) => {
  localStorage.setItem('appLanguage', langCode);
};

export const getCurrentLanguage = () => {
  return localStorage.getItem('appLanguage') || 'en';
};

export const getToggleLanguage = () =>
  getCurrentLanguage() === 'en' ? 'pa' : 'en';

export const getToggleLanguageName = () =>
  getCurrentLanguage() === 'en' ? 'ਪੰਜਾਬੀ' : 'English';

// Main translation function
export const translate = (text) => {
  const lang = getCurrentLanguage();
  const dict = dictionaries[lang];
  if (dict && dict[text]) return dict[text];
  return text;
};

// Get all available languages
export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
];
