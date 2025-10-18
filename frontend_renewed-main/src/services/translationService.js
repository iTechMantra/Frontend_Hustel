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
    "Beneficiaries": "Beneficiaries",
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
      "Select your role to see your personalized healthcare dashboard.",

    // ASHA Dashboard Specific
    'My Beneficiaries': 'My Beneficiaries',
    'Due List / Reminders': 'Due List / Reminders',
    'Home Visit Checklist': 'Home Visit Checklist',
    'Health Education': 'Health Education',
    'Referrals': 'Referrals',
    'Incentives / Performance': 'Incentives / Performance',
    'Messages / Notifications': 'Messages / Notifications',
    'Reports / History': 'Reports / History',
    'Video Consultation': 'Video Consultation',
    'Help / FAQ': 'Help / FAQ',
    'Patient Registration': 'Patient Registration',
    'New Pregnancy': 'New Pregnancy',
    'New Infant/Birth': 'New Infant/Birth',
    'Child Registration': 'Child Registration',
    'Family Registration': 'Family Registration',
    'Eligible Couple': 'Eligible Couple',
    'Scheme Enrollment': 'Scheme Enrollment',
    'Total Beneficiaries': 'Total Beneficiaries',
    'Pending Tasks': 'Pending Tasks',
    'High Risk Cases': 'High Risk Cases',
    'Monthly Incentives': 'Monthly Incentives',
    "Today's Due List": "Today's Due List",
    'Recent Notifications': 'Recent Notifications',
    'Quick Registration': 'Quick Registration',
    'Beneficiary Overview': 'Beneficiary Overview',
    'Health Education Materials': 'Health Education Materials',
    'Patient Referrals': 'Patient Referrals',
    'Incentives & Performance': 'Incentives & Performance',
    'Start New Consultation': 'Start New Consultation',
    'Recent Consultations': 'Recent Consultations',
    'Available Contacts': 'Available Contacts',
    'Profile Settings': 'Profile Settings',
    'App Settings': 'App Settings',
    'Frequently Asked Questions': 'Frequently Asked Questions',
    'Quick Support': 'Quick Support'
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
    "Beneficiaries": "लाभार्थी",
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

    "E-Sannidhi Healthcare Starts with You": "ई-सन्निधि स्वास्थ्य सेवा आपकी भागीदारी से",
    "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
      "आशा, एएनएम, पीएचसी स्टाफ और मरीजों को ऑफलाइन-फर्स्ट टूल्स, रिमाइंडर और सुरक्षित परामर्श के साथ सक्षम बनाना।",

    "Key Features": "मुख्य विशेषताएं",
    "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
      "ग्रामीण भारत में आशा, एएनएम, पीएचसी स्टाफ और मरीजों के लिए बनाया गया।",

    "Select your role to see your personalized healthcare dashboard.": 
      "अपनी भूमिका चुनें और अपना व्यक्तिगत स्वास्थ्य डैशबोर्ड देखें।",

    // ASHA Dashboard Specific
    'My Beneficiaries': 'मेरे लाभार्थी',
    'Due List / Reminders': 'बकाया सूची / अनुस्मारक',
    'Home Visit Checklist': 'घर भ्रमण चेकलिस्ट',
    'Health Education': 'स्वास्थ्य शिक्षा',
    'Referrals': 'रेफरल',
    'Incentives / Performance': 'प्रोत्साहन / प्रदर्शन',
    'Messages / Notifications': 'संदेश / सूचनाएं',
    'Reports / History': 'रिपोर्ट / इतिहास',
    'Video Consultation': 'वीडियो परामर्श',
    'Help / FAQ': 'सहायता / सामान्य प्रश्न',
    'Patient Registration': 'मरीज पंजीकरण',
    'New Pregnancy': 'नई गर्भावस्था',
    'New Infant/Birth': 'नवजात शिशु / जन्म',
    'Child Registration': 'बच्चे का पंजीकरण',
    'Family Registration': 'परिवार पंजीकरण',
    'Eligible Couple': 'पात्र दंपति',
    'Scheme Enrollment': 'योजना पंजीकरण',
    'Total Beneficiaries': 'कुल लाभार्थी',
    'Pending Tasks': 'लंबित कार्य',
    'High Risk Cases': 'उच्च जोखिम मामले',
    'Monthly Incentives': 'मासिक प्रोत्साहन',
    "Today's Due List": "आज की बकाया सूची",
    'Recent Notifications': 'हाल की सूचनाएं',
    'Quick Registration': 'त्वरित पंजीकरण',
    'Beneficiary Overview': 'लाभार्थी अवलोकन',
    'Health Education Materials': 'स्वास्थ्य शिक्षा सामग्री',
    'Patient Referrals': 'मरीज रेफरल',
    'Incentives & Performance': 'प्रोत्साहन और प्रदर्शन',
    'Start New Consultation': 'नई परामर्श शुरू करें',
    'Recent Consultations': 'हाल की परामर्श',
    'Available Contacts': 'उपलब्ध संपर्क',
    'Profile Settings': 'प्रोफ़ाइल सेटिंग्स',
    'App Settings': 'ऐप सेटिंग्स',
    'Frequently Asked Questions': 'अक्सर पूछे जाने वाले प्रश्न',
    'Quick Support': 'त्वरित सहायता'
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
    "Beneficiaries": "ਲਾਭਪਾਤਰੀ",
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
      "ਆਪਣਾ ਭੂਮਿਕਾ ਚੁਣੋ ਤਾਂ ਜੋ ਆਪਣਾ ਨਿੱਜੀ ਸਿਹਤ ਡੈਸ਼ਬੋਰਡ ਵੇਖ ਸਕੋ।",

    // ASHA Dashboard Specific
    'My Beneficiaries': 'ਮੇਰੇ ਲਾਭਪਾਤਰੀ',
    'Due List / Reminders': 'ਬਕਾਇਆ ਸੂਚੀ / ਯਾਦ ਦਿਹਾਣੀਆਂ',
    'Home Visit Checklist': 'ਘਰੇਲੂ ਮੁਲਾਕਾਤ ਚੈਕਲਿਸਟ',
    'Health Education': 'ਸਿਹਤ ਸਿੱਖਿਆ',
    'Referrals': 'ਰੈਫਰਲ',
    'Incentives / Performance': 'ਇਨਾਮ / ਕਾਰਗੁਜ਼ਾਰੀ',
    'Messages / Notifications': 'ਸੁਨੇਹੇ / ਸੂਚਨਾਵਾਂ',
    'Reports / History': 'ਰਿਪੋਰਟਾਂ / ਇਤਿਹਾਸ',
    'Video Consultation': 'ਵੀਡੀਓ ਸਲਾਹ',
    'Help / FAQ': 'ਮਦਦ / ਸਵਾਲ-ਜਵਾਬ',
    'Patient Registration': 'ਮਰੀਜ਼ ਦਰਜ ਕਰਨਾ',
    'New Pregnancy': 'ਨਵੀਂ ਗਰਭਾਵਸਥਾ',
    'New Infant/Birth': 'ਨਵਜਾਤ ਬੱਚਾ / ਜਨਮ',
    'Child Registration': 'ਬੱਚੇ ਦਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    'Family Registration': 'ਪਰਿਵਾਰ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    'Eligible Couple': 'ਪਾਤਰ ਜੋੜਾ',
    'Scheme Enrollment': 'ਸਕੀਮ ਦਰਜ ਕਰਨਾ',
    'Total Beneficiaries': 'ਕੁੱਲ ਲਾਭਪਾਤਰੀ',
    'Pending Tasks': 'ਲੰਬੇ ਕੰਮ',
    'High Risk Cases': 'ਉੱਚ ਜੋਖਮ ਵਾਲੇ ਮਾਮਲੇ',
    'Monthly Incentives': 'ਮਹੀਨਾਵਾਰ ਇਨਾਮ',
    "Today's Due List": "ਅੱਜ ਦੀ ਬਕਾਇਆ ਸੂਚੀ",
    'Recent Notifications': 'ਤਾਜ਼ਾ ਸੂਚਨਾਵਾਂ',
    'Quick Registration': 'ਤੁਰੰਤ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    'Beneficiary Overview': 'ਲਾਭਪਾਤਰੀ ਝਲਕ',
    'Health Education Materials': 'ਸਿਹਤ ਸਿੱਖਿਆ ਸਮੱਗਰੀ',
    'Patient Referrals': 'ਮਰੀਜ਼ ਰੈਫਰਲ',
    'Incentives & Performance': 'ਇਨਾਮ ਅਤੇ ਕਾਰਗੁਜ਼ਾਰੀ',
    'Start New Consultation': 'ਨਵੀਂ ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ',
    'Recent Consultations': 'ਤਾਜ਼ਾ ਸਲਾਹਾਂ',
    'Available Contacts': 'ਉਪਲਬਧ ਸੰਪਰਕ',
    'Profile Settings': 'ਪ੍ਰੋਫਾਈਲ ਸੈਟਿੰਗਾਂ',
    'App Settings': 'ਐਪ ਸੈਟਿੰਗਾਂ',
    'Frequently Asked Questions': 'ਅਕਸਰ ਪੁੱਛੇ ਜਾਣ ਵਾਲੇ ਸਵਾਲ',
    'Quick Support': 'ਤੁਰੰਤ ਸਹਾਇਤਾ'
  },

  ta: {
    // Common
    'Welcome': 'வரவேற்கிறோம்',
    'Login': 'உள்நுழைய',
    'Sign up': 'பதிவு செய்ய',
    'Logout': 'வெளியேறு',
    'Home': 'முகப்பு',
    'Profile': 'சுயவிவரம்',
    'Settings': 'அமைப்புகள்',
    'Save': 'சேமிக்க',
    'Cancel': 'ரத்து செய்',
    'Submit': 'சமர்ப்பிக்க',
    'Search': 'தேடு',
    'Yes': 'ஆம்',
    'No': 'இல்லை',
    'OK': 'சரி',
    'Error': 'பிழை',
    'Success': 'வெற்றி',
    'Loading': 'ஏற்றுகிறது',
    'Please wait': 'தயவு செய்து காத்திருக்கவும்',

    // Navigation
    'Dashboard': 'டாஷ்போர்டு',
    'Messages': 'செய்திகள்',
    'Video Call': 'வீடியோ அழைப்பு',
    'Health Records': 'சுகாதார பதிவுகள்',
    'Prescriptions': 'மருந்து பதிவுகள்',
    'Patients': 'நோயாளிகள்',
    'Statistics': 'புள்ளிவிவரங்கள்',
    'Campaign': 'பிரச்சாரம்',
    'Add Patient': 'நோயாளியை சேர்க்க',

    // Roles
    "Beneficiaries": "பயனாளிகள்",
    'Patient': 'நோயாளி',
    'ASHA Worker': 'ஆஷா தொழிலாளர்',
    'ANM': 'ஏஎன்எம்',
    'PHC Staff': 'பிஎச்சி ஊழியர்கள்',
    'Doctor': 'டாக்டர்',
    'Pharmacy': 'மருந்தகம்',
    'Admin': 'நிர்வாகி',

    // Landing / Hero
    'Healthcare': 'சுகாதார பராமரிப்பு',
    'Healthcare Starts with You': 'சுகாதாரம் உங்களுடன் தொடங்குகிறது',
    'Healthcare Reimagined': 'மீண்டும் கற்பனை செய்யப்பட்ட சுகாதாரம்',
    'Secure & Private': 'பாதுகாப்பான மற்றும் தனியார்',
    '24/7 Available': '24/7 கிடைக்கும்',
    'Community Care': 'சமூக பராமரிப்பு',
    'Get Started Today': 'இன்றே தொடங்குங்கள்',
    'Choose Your Role': 'உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்',

    // Features
    'AI Symptom Checker': 'AI அறிகுறி சரிபார்ப்பு',
    'Video Consultations': 'வீடியோ ஆலோசனைகள்',
    'Digital Health Records': 'டிஜிட்டல் சுகாதார பதிவுகள்',
    'Digital Health Passbook': 'டிஜிட்டல் சுகாதார பாஸ்புக்',
    'ANC & Immunization Tracker': 'கர்ப்ப மற்றும் தடுப்பூசி டிராக்கர்',
    'Smart Notifications': 'ஸ்மார்ட் அறிவிப்புகள்',
    'Smart Household Mapping': 'ஸ்மார்ட் குடும்ப மேப்பிங்',
    'ASHA Rewards': 'ஆஷா வெகுமதிகள்',

    // Dashboards
    'Reminders': 'நினைவூட்டல்கள்',
    'Reports': 'அறிக்கைகள்',
    'Appointments': 'நியமனங்கள்',
    'Patient History': 'நோயாளி வரலாறு',
    'Sync Status': 'ஒத்திசை நிலை',
    'Performance': 'செயல்திறன்',
    'Emergency': 'அவசரகால',
    'Medicine Stock': 'மருந்து பங்கு',
    'Community Trends': 'சமூக போக்குகள்',
    'Feedback': 'கருத்து',

    "E-Sannidhi Healthcare Starts with You": "ஈ-சன்னிதி சுகாதாரம் உங்களுடன் தொடங்குகிறது",
    "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
      "ஆஷா, ஏஎன்எம், பிஎச்சி ஊழியர்கள் மற்றும் நோயாளிகளை ஆஃப்லைன்-முதல் கருவிகள், நினைவூட்டல்கள் மற்றும் பாதுகாப்பான ஆலோசனைகளுடன் அதிகாரப்படுத்துதல்.",

    "Key Features": "முக்கிய அம்சங்கள்",
    "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
      "கிராமப்புற இந்தியாவில் உள்ள ஆஷாக்கள், ஏஎன்எம்கள், பிஎச்சி ஊழியர்கள் மற்றும் நோயாளிகளுக்காக கட்டப்பட்டது.",

    "Select your role to see your personalized healthcare dashboard.": 
      "உங்கள் தனிப்பட்ட சுகாதார டாஷ்போர்டைக் காண உங்கள் பங்கைத் தேர்ந்தெடுக்கவும்.",

    // ASHA Dashboard Specific
    'My Beneficiaries': 'எனது பயனாளிகள்',
    'Due List / Reminders': 'கடன்பட்ட பட்டியல் / நினைவூட்டல்கள்',
    'Home Visit Checklist': 'வீட்டு வருகை சரிபார்ப்புப் பட்டியல்',
    'Health Education': 'சுகாதார கல்வி',
    'Referrals': 'பரிந்துரைகள்',
    'Incentives / Performance': 'ஊக்கத் தொகைகள் / செயல்திறன்',
    'Messages / Notifications': 'செய்திகள் / அறிவிப்புகள்',
    'Reports / History': 'அறிக்கைகள் / வரலாறு',
    'Video Consultation': 'வீடியோ ஆலோசனை',
    'Help / FAQ': 'உதவி / அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'Patient Registration': 'நோயாளி பதிவு',
    'New Pregnancy': 'புதிய கர்ப்பம்',
    'New Infant/Birth': 'புதிய குழந்தை / பிறப்பு',
    'Child Registration': 'குழந்தை பதிவு',
    'Family Registration': 'குடும்ப பதிவு',
    'Eligible Couple': 'தகுதியுள்ள தம்பதிகள்',
    'Scheme Enrollment': 'திட்டம் பதிவு',
    'Total Beneficiaries': 'மொத்த பயனாளிகள்',
    'Pending Tasks': 'நிலுவையில் உள்ள பணிகள்',
    'High Risk Cases': 'அதிக ஆபத்து வழக்குகள்',
    'Monthly Incentives': 'மாதாந்திர ஊக்கத் தொகைகள்',
    "Today's Due List": "இன்றைய கடன்பட்ட பட்டியல்",
    'Recent Notifications': 'சமீபத்திய அறிவிப்புகள்',
    'Quick Registration': 'விரைவு பதிவு',
    'Beneficiary Overview': 'பயனாளி கண்ணோட்டம்',
    'Health Education Materials': 'சுகாதார கல்வி பொருட்கள்',
    'Patient Referrals': 'நோயாளி பரிந்துரைகள்',
    'Incentives & Performance': 'ஊக்கத் தொகைகள் மற்றும் செயல்திறன்',
    'Start New Consultation': 'புதிய ஆலோசனையைத் தொடங்கவும்',
    'Recent Consultations': 'சமீபத்திய ஆலோசனைகள்',
    'Available Contacts': 'கிடைக்கும் தொடர்புகள்',
    'Profile Settings': 'சுயவிவர அமைப்புகள்',
    'App Settings': 'பயன்பாட்டு அமைப்புகள்',
    'Frequently Asked Questions': 'அடிக்கடி கேட்கப்படும் கேள்விகள்',
    'Quick Support': 'விரைவு ஆதரவு'
  },

  te: {
    // Common
    'Welcome': 'స్వాగతం',
    'Login': 'లాగిన్',
    'Sign up': 'సైన్ అప్',
    'Logout': 'లాగ్అవుట్',
    'Home': 'హోమ్',
    'Profile': 'ప్రొఫైల్',
    'Settings': 'సెట్టింగ్లు',
    'Save': 'సేవ్ చేయండి',
    'Cancel': 'రద్దు చేయండి',
    'Submit': 'సమర్పించండి',
    'Search': 'శోధించండి',
    'Yes': 'అవును',
    'No': 'కాదు',
    'OK': 'సరే',
    'Error': 'లోపం',
    'Success': 'విజయం',
    'Loading': 'లోడ్ అవుతోంది',
    'Please wait': 'దయచేసి వేచి ఉండండి',

    // Navigation
    'Dashboard': 'డాష్బోర్డ్',
    'Messages': 'సందేశాలు',
    'Video Call': 'వీడియో కాల్',
    'Health Records': 'ఆరోగ్య రికార్డులు',
    'Prescriptions': 'ప్రిస్క్రిప్షన్లు',
    'Patients': 'రోగులు',
    'Statistics': 'గణాంకాలు',
    'Campaign': 'ప్రచారం',
    'Add Patient': 'రోగిని జోడించండి',

    // Roles
    "Beneficiaries": "లబ్ధిదారులు",
    'Patient': 'రోగి',
    'ASHA Worker': 'ఆశా కార్మికురాలు',
    'ANM': 'ఎయినెం',
    'PHC Staff': 'పీహెచ్సి సిబ్బంది',
    'Doctor': 'డాక్టర్',
    'Pharmacy': 'ఫార్మసీ',
    'Admin': 'అడ్మిన్',

    // Landing / Hero
    'Healthcare': 'ఆరోగ్య సంరక్షణ',
    'Healthcare Starts with You': 'ఆరోగ్యం మీతో మొదలవుతుంది',
    'Healthcare Reimagined': 'మళ్లీ ఊహించిన ఆరోగ్య సంరక్షణ',
    'Secure & Private': 'సురక్షిత మరియు ప్రైవేట్',
    '24/7 Available': '24/7 లభ్యం',
    'Community Care': 'కమ్యూనిటీ కేర్',
    'Get Started Today': 'ఈరోజే ప్రారంభించండి',
    'Choose Your Role': 'మీ పాత్రను ఎంచుకోండి',

    // Features
    'AI Symptom Checker': 'AI లక్షణాలు తనిఖీ',
    'Video Consultations': 'వీడియో సంప్రదింపులు',
    'Digital Health Records': 'డిజిటల్ ఆరోగ్య రికార్డులు',
    'Digital Health Passbook': 'డిజిటల్ ఆరోగ్య పాస్బుక్',
    'ANC & Immunization Tracker': 'గర్భం మరియు టీకాల ట్రాకర్',
    'Smart Notifications': 'స్మార్ట్ నోటిఫికేషన్లు',
    'Smart Household Mapping': 'స్మార్ట్ హౌస్హోల్డ్ మ్యాపింగ్',
    'ASHA Rewards': 'ఆశా రివార్డ్స్',

    // Dashboards
    'Reminders': 'రిమైండర్లు',
    'Reports': 'రిపోర్టులు',
    'Appointments': 'అపాయింట్మెంట్లు',
    'Patient History': 'రోగి చరిత్ర',
    'Sync Status': 'సింక్ స్టేటస్',
    'Performance': 'పనితీరు',
    'Emergency': 'అత్యవసర',
    'Medicine Stock': 'మందుల స్టాక్',
    'Community Trends': 'కమ్యూనిటీ ట్రెండ్స్',
    'Feedback': 'ఫీడ్బ్యాక్',

    "E-Sannidhi Healthcare Starts with You": "ఇ-సన్నిధి ఆరోగ్యం మీతో మొదలవుతుంది",
    "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
      "ఆశా, ఎయినెం, పీహెచ్సి సిబ్బంది మరియు రోగులను ఆఫ్లైన్-ఫస్ట్ టూల్స్, రిమైండర్లు మరియు సురక్షిత సంప్రదింపులతో సశక్తం చేయడం.",

    "Key Features": "ప్రధాన లక్షణాలు",
    "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
      "గ్రామీణ భారతదేశంలోని ఆశాలు, ఎయినెంలు, పీహెచ్సి సిబ్బంది మరియు రోగుల కోసం నిర్మించబడింది.",

    "Select your role to see your personalized healthcare dashboard.": 
      "మీ వ్యక్తిగత ఆరోగ్య డాష్బోర్డ్ను చూడటానికి మీ పాత్రను ఎంచుకోండి.",

    // ASHA Dashboard Specific
    'My Beneficiaries': 'నా లబ్ధిదారులు',
    'Due List / Reminders': 'డ్యూ లిస్ట్ / రిమైండర్లు',
    'Home Visit Checklist': 'హోమ్ విజిట్ చెక్లిస్ట్',
    'Health Education': 'ఆరోగ్య విద్య',
    'Referrals': 'రెఫరల్స్',
    'Incentives / Performance': 'ప్రోత్సాహకాలు / పనితీరు',
    'Messages / Notifications': 'సందేశాలు / నోటిఫికేషన్లు',
    'Reports / History': 'రిపోర్టులు / చరిత్ర',
    'Video Consultation': 'వీడియో కన్సల్టేషన్',
    'Help / FAQ': 'సహాయం / తరచుగా అడిగే ప్రశ్నలు',
    'Patient Registration': 'రోగి నమోదు',
    'New Pregnancy': 'కొత్త గర్భం',
    'New Infant/Birth': 'కొత్త శిశువు / జననం',
    'Child Registration': 'పిల్లల నమోదు',
    'Family Registration': 'కుటుంబ నమోదు',
    'Eligible Couple': 'అర్హత కలిగిన జంట',
    'Scheme Enrollment': 'స్కీమ్ నమోదు',
    'Total Beneficiaries': 'మొత్తం లబ్ధిదారులు',
    'Pending Tasks': 'పెండింగ్ టాస్క్లు',
    'High Risk Cases': 'హై రిస్క్ కేసులు',
    'Monthly Incentives': 'నెలవారీ ప్రోత్సాహకాలు',
    "Today's Due List": "నేటి డ్యూ లిస్ట్",
    'Recent Notifications': 'ఇటీవలి నోటిఫికేషన్లు',
    'Quick Registration': 'త్వరిత నమోదు',
    'Beneficiary Overview': 'లబ్ధిదారుల అవలోకనం',
    'Health Education Materials': 'ఆరోగ్య విద్య పదార్థాలు',
    'Patient Referrals': 'రోగి రెఫరల్స్',
    'Incentives & Performance': 'ప్రోత్సాహకాలు మరియు పనితీరు',
    'Start New Consultation': 'కొత్త కన్సల్టేషన్ ప్రారంభించండి',
    'Recent Consultations': 'ఇటీవలి సంప్రదింపులు',
    'Available Contacts': 'అందుబాటులో ఉన్న కాంటాక్ట్లు',
    'Profile Settings': 'ప్రొఫైల్ సెట్టింగ్లు',
    'App Settings': 'యాప్ సెట్టింగ్లు',
    'Frequently Asked Questions': 'తరచుగా అడిగే ప్రశ్నలు',
    'Quick Support': 'త్వరిత మద్దతు'
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
    'Prescriptions': 'ಔಷಧಿ ಪರ್ಚಿಗಳು',
    'Patients': 'ರೋಗಿಗಳು',
    'Statistics': 'ಅಂಕಿ ಅಂಶಗಳು',
    'Campaign': 'ಪ್ರಚಾರ',
    'Add Patient': 'ರೋಗಿಯನ್ನು ಸೇರಿಸಿ',

    // Roles
    "Beneficiaries": "ಲಾಭಾಂಶಿಗಳು",
    'Patient': 'ರೋಗಿ',
    'ASHA Worker': 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆ',
    'ANM': 'ಎಎನ್ಎಂ',
    'PHC Staff': 'ಪಿಎಚ್ಸಿ ಸಿಬ್ಬಂದಿ',
    'Doctor': 'ವೈದ್ಯರು',
    'Pharmacy': 'ಔಷಧಾಲಯ',
    'Admin': 'ನಿರ್ವಾಹಕ',

    // Landing / Hero
    'Healthcare': 'ಆರೋಗ್ಯ ಸೇವೆ',
    'Healthcare Starts with You': 'ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ',
    'Healthcare Reimagined': 'ಮರುಊಹಿಸಿದ ಆರೋಗ್ಯ ಸೇವೆ',
    'Secure & Private': 'ಸುರಕ್ಷಿತ ಮತ್ತು ಖಾಸಗಿ',
    '24/7 Available': '24/7 ಲಭ್ಯವಿದೆ',
    'Community Care': 'ಸಮುದಾಯ ಕಾಳಜಿ',
    'Get Started Today': 'ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ',
    'Choose Your Role': 'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ',

    // Features
    'AI Symptom Checker': 'ಎಐ ರೋಗ ಲಕ್ಷಣ ಪರಿಶೀಲಕ',
    'Video Consultations': 'ವೀಡಿಯೊ ಸಲಹೆಗಳು',
    'Digital Health Records': 'ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ದಾಖಲೆಗಳು',
    'Digital Health Passbook': 'ಡಿಜಿಟಲ್ ಆರೋಗ್ಯ ಪಾಸ್ಬುಕ್',
    'ANC & Immunization Tracker': 'ಗರ್ಭಿಣಿ ಮತ್ತು ಲಸಿಕೆ ಟ್ರ್ಯಾಕರ್',
    'Smart Notifications': 'ಸ್ಮಾರ್ಟ್ ಅಧಿಸೂಚನೆಗಳು',
    'Smart Household Mapping': 'ಸ್ಮಾರ್ಟ್ ಮನೆಮಾಳಿಗೆ ಮ್ಯಾಪಿಂಗ್',
    'ASHA Rewards': 'ಆಶಾ ಬಹುಮಾನಗಳು',

    // Dashboards
    'Reminders': 'ಜ್ಞಾಪನೆಗಳು',
    'Reports': 'ವರದಿಗಳು',
    'Appointments': 'ನೇಮಕಾತಿಗಳು',
    'Patient History': 'ರೋಗಿ ಇತಿಹಾಸ',
    'Sync Status': 'ಸಿಂಕ್ ಸ್ಥಿತಿ',
    'Performance': 'ಕಾರ್ಯಕ್ಷಮತೆ',
    'Emergency': 'ತುರ್ತು',
    'Medicine Stock': 'ಔಷಧಿ ಸ್ಟಾಕ್',
    'Community Trends': 'ಸಮುದಾಯ ಪ್ರವೃತ್ತಿಗಳು',
    'Feedback': 'ಪ್ರತಿಕ್ರಿಯೆ',

    "E-Sannidhi Healthcare Starts with You": "ಇ-ಸನ್ನಿಧಿ ಆರೋಗ್ಯ ಸೇವೆ ನಿಮ್ಮಿಂದ ಪ್ರಾರಂಭವಾಗುತ್ತದೆ",
    "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
      "ಆಶಾ, ಎಎನ್ಎಂ, ಪಿಎಚ್ಸಿ ಸಿಬ್ಬಂದಿ ಮತ್ತು ರೋಗಿಗಳನ್ನು ಆಫ್ಲೈನ್-ಮೊದಲ ಸಾಧನಗಳು, ಜ್ಞಾಪನೆಗಳು ಮತ್ತು ಸುರಕ್ಷಿತ ಸಲಹೆಗಳೊಂದಿಗೆ ಸಶಕ್ತಗೊಳಿಸುವುದು.",

    "Key Features": "ಮುಖ್ಯ ವೈಶಿಷ್ಟ್ಯಗಳು",
    "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
      "ಗ್ರಾಮೀಣ ಭಾರತದ ಆಶಾ, ಎಎನ್ಎಂ, ಪಿಎಚ್ಸಿ ಸಿಬ್ಬಂದಿ ಮತ್ತು ರೋಗಿಗಳಿಗಾಗಿ ನಿರ್ಮಿಸಲಾಗಿದೆ.",

    "Select your role to see your personalized healthcare dashboard.": 
      "ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಆರೋಗ್ಯ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ನೋಡಲು ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆರಿಸಿ.",

    // ASHA Dashboard Specific
    'My Beneficiaries': 'ನನ್ನ ಲಾಭಾಂಶಿಗಳು',
    'Due List / Reminders': 'ಬಾಕಿ ಪಟ್ಟಿ / ಜ್ಞಾಪನೆಗಳು',
    'Home Visit Checklist': 'ಮನೆ ಭೇಟಿ ಚೆಕ್ಲಿಸ್ಟ್',
    'Health Education': 'ಆರೋಗ್ಯ ಶಿಕ್ಷಣ',
    'Referrals': 'ರೆಫರಲ್ಗಳು',
    'Incentives / Performance': 'ಪ್ರೋತ್ಸಾಹಗಳು / ಕಾರ್ಯಕ್ಷಮತೆ',
    'Messages / Notifications': 'ಸಂದೇಶಗಳು / ಅಧಿಸೂಚನೆಗಳು',
    'Reports / History': 'ವರದಿಗಳು / ಇತಿಹಾಸ',
    'Video Consultation': 'ವೀಡಿಯೊ ಸಲಹೆ',
    'Help / FAQ': 'ಸಹಾಯ / ಸಾಮಾನ್ಯ ಪ್ರಶ್ನೆಗಳು',
    'Patient Registration': 'ರೋಗಿ ನೋಂದಣಿ',
    'New Pregnancy': 'ಹೊಸ ಗರ್ಭಧಾರಣೆ',
    'New Infant/Birth': 'ಹೊಸ ಶಿಶು / ಜನನ',
    'Child Registration': 'ಮಗು ನೋಂದಣಿ',
    'Family Registration': 'ಕುಟುಂಬ ನೋಂದಣಿ',
    'Eligible Couple': 'ಅರ್ಹ ದಂಪತಿಗಳು',
    'Scheme Enrollment': 'ಯೋಜನೆ ನೋಂದಣಿ',
    'Total Beneficiaries': 'ಒಟ್ಟು ಲಾಭಾಂಶಿಗಳು',
    'Pending Tasks': 'ಬಾಕಿ ಕಾರ್ಯಗಳು',
    'High Risk Cases': 'ಹೆಚ್ಚಿನ ಅಪಾಯದ ಪ್ರಕರಣಗಳು',
    'Monthly Incentives': 'ಮಾಸಿಕ ಪ್ರೋತ್ಸಾಹಗಳು',
    "Today's Due List": "ಇಂದಿನ ಬಾಕಿ ಪಟ್ಟಿ",
    'Recent Notifications': 'ಇತ್ತೀಚಿನ ಅಧಿಸೂಚನೆಗಳು',
    'Quick Registration': 'ತ್ವರಿತ ನೋಂದಣಿ',
    'Beneficiary Overview': 'ಲಾಭಾಂಶಿ ಅವಲೋಕನ',
    'Health Education Materials': 'ಆರೋಗ್ಯ ಶಿಕ್ಷಣ ಸಾಮಗ್ರಿಗಳು',
    'Patient Referrals': 'ರೋಗಿ ರೆಫರಲ್ಗಳು',
    'Incentives & Performance': 'ಪ್ರೋತ್ಸಾಹಗಳು ಮತ್ತು ಕಾರ್ಯಕ್ಷಮತೆ',
    'Start New Consultation': 'ಹೊಸ ಸಲಹೆ ಪ್ರಾರಂಭಿಸಿ',
    'Recent Consultations': 'ಇತ್ತೀಚಿನ ಸಲಹೆಗಳು',
    'Available Contacts': 'ಲಭ್ಯವಿರುವ ಸಂಪರ್ಕಗಳು',
    'Profile Settings': 'ಪ್ರೊಫೈಲ್ ಸೆಟ್ಟಿಂಗ್ಗಳು',
    'App Settings': 'ಅಪ್ಲಿಕೇಶನ್ ಸೆಟ್ಟಿಂಗ್ಗಳು',
    'Frequently Asked Questions': 'ಸಾಮಾನ್ಯವಾಗಿ ಕೇಳಲಾಗುವ ಪ್ರಶ್ನೆಗಳು',
    'Quick Support': 'ತ್ವರಿತ ಬೆಂಬಲ'
  },

  bn: {
    // Common
    'Welcome': 'স্বাগতম',
    'Login': 'লগইন',
    'Sign up': 'সাইন আপ',
    'Logout': 'লগআউট',
    'Home': 'হোম',
    'Profile': 'প্রোফাইল',
    'Settings': 'সেটিংস',
    'Save': 'সংরক্ষণ',
    'Cancel': 'বাতিল',
    'Submit': 'জমা দিন',
    'Search': 'অনুসন্ধান',
    'Yes': 'হ্যাঁ',
    'No': 'না',
    'OK': 'ঠিক আছে',
    'Error': 'ত্রুটি',
    'Success': 'সাফল্য',
    'Loading': 'লোড হচ্ছে',
    'Please wait': 'অনুগ্রহ করে অপেক্ষা করুন',

    // Navigation
    'Dashboard': 'ড্যাশবোর্ড',
    'Messages': 'বার্তা',
    'Video Call': 'ভিডিও কল',
    'Health Records': 'স্বাস্থ্য রেকর্ড',
    'Prescriptions': 'প্রেসক্রিপশন',
    'Patients': 'রোগী',
    'Statistics': 'পরিসংখ্যান',
    'Campaign': 'ক্যাম্পেইন',
    'Add Patient': 'রোগী যোগ করুন',

    // Roles
    "Beneficiaries": "উপকারভোগী",
    'Patient': 'রোগী',
    'ASHA Worker': 'আশা কর্মী',
    'ANM': 'এএনএম',
    'PHC Staff': 'পিএইচসি স্টাফ',
    'Doctor': 'ডাক্তার',
    'Pharmacy': 'ফার্মেসি',
    'Admin': 'অ্যাডমিন',

    // Landing / Hero
    'Healthcare': 'স্বাস্থ্যসেবা',
    'Healthcare Starts with You': 'স্বাস্থ্যসেবা আপনার সাথে শুরু হয়',
    'Healthcare Reimagined': 'পুনর্বিবেচিত স্বাস্থ্যসেবা',
    'Secure & Private': 'নিরাপদ ও ব্যক্তিগত',
    '24/7 Available': '24/7 উপলব্ধ',
    'Community Care': 'সম্প্রদায় যত্ন',
    'Get Started Today': 'আজই শুরু করুন',
    'Choose Your Role': 'আপনার ভূমিকা নির্বাচন করুন',

    // Features
    'AI Symptom Checker': 'এআই লক্ষণ চেকার',
    'Video Consultations': 'ভিডিও পরামর্শ',
    'Digital Health Records': 'ডিজিটাল স্বাস্থ্য রেকর্ড',
    'Digital Health Passbook': 'ডিজিটাল স্বাস্থ্য পাসবুক',
    'ANC & Immunization Tracker': 'গর্ভাবস্থা ও টিকাদান ট্র্যাকার',
    'Smart Notifications': 'স্মার্ট বিজ্ঞপ্তি',
    'Smart Household Mapping': 'স্মার্ট পরিবার ম্যাপিং',
    'ASHA Rewards': 'আশা পুরস্কার',

    // Dashboards
    'Reminders': 'অনুস্মারক',
    'Reports': 'রিপোর্ট',
    'Appointments': 'অ্যাপয়েন্টমেন্ট',
    'Patient History': 'রোগীর ইতিহাস',
    'Sync Status': 'সিঙ্ক অবস্থা',
    'Performance': 'কর্মক্ষমতা',
    'Emergency': 'জরুরী',
    'Medicine Stock': 'ওষুধের স্টক',
    'Community Trends': 'সম্প্রদায় প্রবণতা',
    'Feedback': 'ফিডব্যাক',

    "E-Sannidhi Healthcare Starts with You": "ই-সান্নিধি স্বাস্থ্যসেবা আপনার সাথে শুরু হয়",
    "Empowering ASHA, ANM, PHC staff & patients with offline-first tools, reminders, and secure consultations.": 
      "আশা, এএনএম, পিএইচসি স্টাফ এবং রোগীদের অফলাইন-ফার্স্ট টুল, অনুস্মারক এবং নিরাপদ পরামর্শের সাথে ক্ষমতায়ন করা।",

    "Key Features": "প্রধান বৈশিষ্ট্য",
    "Built for ASHAs, ANMs, PHC staff, and patients in rural India.": 
      "গ্রামীণ ভারতের আশা, এএনএম, পিএইচসি স্টাফ এবং রোগীদের জন্য নির্মিত।",

    "Select your role to see your personalized healthcare dashboard.": 
      "আপনার ব্যক্তিগত স্বাস্থ্য ড্যাশবোর্ড দেখতে আপনার ভূমিকা নির্বাচন করুন।",

    // ASHA Dashboard Specific
    'My Beneficiaries': 'আমার উপকারভোগী',
    'Due List / Reminders': 'বকেয়া তালিকা / অনুস্মারক',
    'Home Visit Checklist': 'বাড়ি পরিদর্শন চেকলিস্ট',
    'Health Education': 'স্বাস্থ্য শিক্ষা',
    'Referrals': 'রেফারেল',
    'Incentives / Performance': 'প্রণোদনা / কর্মক্ষমতা',
    'Messages / Notifications': 'বার্তা / বিজ্ঞপ্তি',
    'Reports / History': 'রিপোর্ট / ইতিহাস',
    'Video Consultation': 'ভিডিও পরামর্শ',
    'Help / FAQ': 'সাহায্য / প্রায়শই জিজ্ঞাসিত প্রশ্ন',
    'Patient Registration': 'রোগী নিবন্ধন',
    'New Pregnancy': 'নতুন গর্ভাবস্থা',
    'New Infant/Birth': 'নতুন শিশু / জন্ম',
    'Child Registration': 'শিশু নিবন্ধন',
    'Family Registration': 'পরিবার নিবন্ধন',
    'Eligible Couple': 'যোগ্য দম্পতি',
    'Scheme Enrollment': 'স্কিম নিবন্ধন',
    'Total Beneficiaries': 'মোট উপকারভোগী',
    'Pending Tasks': 'বকেয়া কাজ',
    'High Risk Cases': 'উচ্চ ঝুঁকির মামলা',
    'Monthly Incentives': 'মাসিক প্রণোদনা',
    "Today's Due List": "আজকের বকেয়া তালিকা",
    'Recent Notifications': 'সাম্প্রতিক বিজ্ঞপ্তি',
    'Quick Registration': 'দ্রুত নিবন্ধন',
    'Beneficiary Overview': 'উপকারভোগী ওভারভিউ',
    'Health Education Materials': 'স্বাস্থ্য শিক্ষা উপকরণ',
    'Patient Referrals': 'রোগী রেফারেল',
    'Incentives & Performance': 'প্রণোদনা এবং কর্মক্ষমতা',
    'Start New Consultation': 'নতুন পরামর্শ শুরু করুন',
    'Recent Consultations': 'সাম্প্রতিক পরামর্শ',
    'Available Contacts': 'উপলব্ধ পরিচিতি',
    'Profile Settings': 'প্রোফাইল সেটিংস',
    'App Settings': 'অ্যাপ সেটিংস',
    'Frequently Asked Questions': 'প্রায়শই জিজ্ঞাসিত প্রশ্ন',
    'Quick Support': 'দ্রুত সমর্থন'
  }
};

// Initialize translations
export const initializeTranslations = () => {
  console.log('Translations initialized for 7 languages');
};

// Language helpers
export const setLanguage = (langCode) => {
  localStorage.setItem('appLanguage', langCode);
  window.location.reload(); // Reload to apply translations
};

export const getCurrentLanguage = () => {
  return localStorage.getItem('appLanguage') || 'en';
};

export const getToggleLanguage = () => {
  const current = getCurrentLanguage();
  return current === 'en' ? 'hi' : 'en'; // Default toggle between English and Hindi
};

export const getToggleLanguageName = () => {
  const current = getCurrentLanguage();
  const languages = {
    'en': 'English',
    'hi': 'हिंदी',
    'pa': 'ਪੰਜਾਬੀ',
    'ta': 'தமிழ்',
    'te': 'తెలుగు',
    'kn': 'ಕನ್ನಡ',
    'bn': 'বাংলা'
  };
  return languages[getToggleLanguage()] || 'English';
};

// Main translation function
export const translate = (text) => {
  const lang = getCurrentLanguage();
  const dict = dictionaries[lang];
  if (dict && dict[text]) return dict[text];
  
  // Fallback to English if translation not found
  const englishDict = dictionaries['en'];
  return englishDict[text] || text;
};

// Get all available languages
export const getAvailableLanguages = () => [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

// Get current language name
export const getCurrentLanguageName = () => {
  const current = getCurrentLanguage();
  const languages = {
    'en': 'English',
    'hi': 'हिंदी',
    'pa': 'ਪੰਜਾਬੀ',
    'ta': 'தமிழ்',
    'te': 'తెలుగు',
    'kn': 'ಕನ್ನಡ',
    'bn': 'বাংলা'
  };
  return languages[current] || 'English';
};

// Utility function to translate entire objects
export const translateObject = (obj) => {
  if (typeof obj === 'string') {
    return translate(obj);
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => translateObject(item));
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const translatedObj = {};
    for (const key in obj) {
      translatedObj[key] = translateObject(obj[key]);
    }
    return translatedObj;
  }
  
  return obj;
};

// Language change listener for real-time updates
export const addLanguageChangeListener = (callback) => {
  window.addEventListener('languageChange', callback);
};

export const removeLanguageChangeListener = (callback) => {
  window.removeEventListener('languageChange', callback);
};

export const triggerLanguageChange = () => {
  window.dispatchEvent(new Event('languageChange'));
};