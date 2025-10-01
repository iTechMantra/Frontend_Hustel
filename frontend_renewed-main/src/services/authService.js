// src/services/authService.js
import storageService from './storageService';
import CryptoJS from 'crypto-js';

export const ROLES = {
  USER: 'user',
  ASHA: 'asha',
  ANM: 'anm',
  DOCTOR: 'doctor',
  PHC_STAFF: 'phc_staff',
  PHARMACY: 'pharmacy',
  ADMIN: 'admin'
};

export const STORAGE_KEYS = {
  USERS: 'users',
  SESSION: 'session',
  OTP: 'otps'
};

// Helper: hash PIN (do not store raw PIN)
function hashPin(pin) {
  return CryptoJS.SHA256(String(pin)).toString();
}

// --------------------- SESSION MANAGEMENT ---------------------
export const setCurrentSession = async (session) => {
  try {
    // Use localStorage directly for reliability (like ASHA)
    console.log('Setting session:', session);
    localStorage.setItem('session', JSON.stringify(session));
    console.log('Session stored successfully in localStorage');
    return true;
  } catch (error) {
    console.error('Error setting session:', error);
    return false;
  }
};

export const getCurrentSession = async () => {
  try {
    // Use localStorage directly for reliability (like ASHA)
    const sessionData = localStorage.getItem('session');
    console.log('Retrieved session data:', sessionData);
    if (!sessionData) {
      console.log('No session data found');
      return { current: null };
    }
    const parsed = JSON.parse(sessionData);
    console.log('Parsed session:', parsed);
    return parsed;
  } catch (error) {
    console.error('Error getting session:', error);
    return { current: null };
  }
};

export const getCurrentUser = async () => {
  try {
    const session = await getCurrentSession();
    if (!session.current) return null;
    const { role, uuid, name, phone } = session.current;

    // For all roles, try to get the user from the patients table first
    const userRecord = await storageService.getPatientByUuid(uuid);
    if (userRecord) {
      return userRecord;
    }
    
    // If no stored record found, return session data as fallback
    return {
      uuid,
      name,
      phone,
      role,
      ...session.current
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const getCurrentRole = async () => {
  try {
    const session = await getCurrentSession();
    return session.current ? session.current.role : null;
  } catch (error) {
    console.error('Error getting current role:', error);
    return null;
  }
};

export const isAuthenticated = async () => {
  try {
    const session = await getCurrentSession();
    return !!session.current;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};

// --------------------- USER ---------------------
export const loginUser = async (phone, pin) => {
  try {
    // Verify PIN first
    const pinResult = await verifyPIN(pin, phone);
    if (!pinResult.success) {
      return { success: false, error: pinResult.error || 'Invalid PIN' };
    }
    
    // Set up user session
    await setCurrentSession({ 
      current: { 
        role: 'user', 
        uuid: phone, 
        name: 'Community Member', 
        phone, 
        loggedAt: new Date().toISOString() 
      } 
    });
    
    return { success: true, message: 'Login successful', uuid: phone };
  } catch (error) {
    console.error('User login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

export const registerUser = async (userData) => {
  try {
    // Store user in patients table with role
    const { uuid } = await storageService.addPatient({ 
      name: userData.name, 
      phone: userData.phone, 
      role: 'user',
      email: userData.email || '',
      location: userData.location || ''
    });
    
    // Set PIN if provided
    if (userData.pin) {
      await setOrUpdatePin(userData.pin, userData.phone);
    }
    
    return { success: true, uuid };
  } catch (error) {
    console.error('User registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// --------------------- DOCTOR ---------------------
export const loginDoctor = async (phone, pin) => {
  try {
    // Verify PIN first
    const pinResult = await verifyPIN(pin, phone);
    if (!pinResult.success) {
      return { success: false, error: pinResult.error || 'Invalid PIN' };
    }
    
    // Set up doctor session
    await setCurrentSession({ 
      current: { 
        role: 'doctor', 
        uuid: phone, 
        name: 'PHC Doctor', 
        phone, 
        loggedAt: new Date().toISOString() 
      } 
    });
    
    return { success: true, message: 'Login successful', uuid: phone };
  } catch (error) {
    console.error('Doctor login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

export const registerDoctor = async (doctorData) => {
  try {
    // Store doctor in patients table with role
    const { uuid } = await storageService.addPatient({ 
      name: doctorData.name, 
      phone: doctorData.phone, 
      role: 'doctor',
      email: doctorData.email || '',
      location: doctorData.location || '',
      specialization: doctorData.specialization || 'General Medicine',
      licenseNumber: doctorData.licenseNumber || '',
      hospital: doctorData.hospital || 'Primary Health Center'
    });
    
    // Set PIN if provided
    if (doctorData.pin) {
      await setOrUpdatePin(doctorData.pin, doctorData.phone);
    }
    
    return { success: true, uuid };
  } catch (error) {
    console.error('Doctor registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// --------------------- ANM ---------------------
export const loginANM = async (phone, pin) => {
  try {
    // Verify PIN first
    const pinResult = await verifyPIN(pin, phone);
    if (!pinResult.success) {
      return { success: false, error: pinResult.error || 'Invalid PIN' };
    }
    
    // Set up ANM session
    await setCurrentSession({ 
      current: { 
        role: 'anm', 
        uuid: phone, 
        name: 'ANM Staff', 
        phone, 
        loggedAt: new Date().toISOString() 
      } 
    });
    
    return { success: true, message: 'Login successful', uuid: phone };
  } catch (error) {
    console.error('ANM login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

export const registerANM = async (anmData) => {
  try {
    // Store ANM in patients table with role
    const { uuid } = await storageService.addPatient({ 
      name: anmData.name, 
      phone: anmData.phone, 
      role: 'anm',
      designation: 'Auxiliary Nurse Midwife',
      phc: anmData.phc || 'Primary Health Center'
    });
    
    // Set PIN if provided
    if (anmData.pin) {
      await setOrUpdatePin(anmData.pin, anmData.phone);
    }
    
    return { success: true, uuid };
  } catch (error) {
    console.error('ANM registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// --------------------- PHC STAFF ---------------------
export const loginPHC = async (phone, pin) => {
  try {
    // Verify PIN first
    const pinResult = await verifyPIN(pin, phone);
    if (!pinResult.success) {
      return { success: false, error: pinResult.error || 'Invalid PIN' };
    }
    
    // Set up PHC session
    await setCurrentSession({ 
      current: { 
        role: 'phc_staff', 
        uuid: phone, 
        name: 'PHC Staff', 
        phone, 
        loggedAt: new Date().toISOString() 
      } 
    });
    
    return { success: true, message: 'Login successful', uuid: phone };
  } catch (error) {
    console.error('PHC login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

export const registerPHC = async (phcData) => {
  try {
    // Store PHC staff in patients table with role
    const { uuid } = await storageService.addPatient({ 
      name: phcData.name, 
      phone: phcData.phone, 
      role: 'phc_staff',
      designation: phcData.designation || 'PHC Staff',
      center: phcData.center || 'Primary Health Center'
    });
    
    // Set PIN if provided
    if (phcData.pin) {
      await setOrUpdatePin(phcData.pin, phcData.phone);
    }
    
    return { success: true, uuid };
  } catch (error) {
    console.error('PHC registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// --------------------- ADMIN ---------------------
export const loginAdmin = async (phone, pin) => {
  try {
    // Verify PIN first
    const pinResult = await verifyPIN(pin, phone);
    if (!pinResult.success) {
      return { success: false, error: pinResult.error || 'Invalid PIN' };
    }
    
    // Set up Admin session
    await setCurrentSession({ 
      current: { 
        role: 'admin', 
        uuid: phone, 
        name: 'System Administrator', 
        phone, 
        loggedAt: new Date().toISOString() 
      } 
    });
    
    return { success: true, message: 'Login successful', uuid: phone };
  } catch (error) {
    console.error('Admin login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

export const registerAdmin = async (adminData) => {
  try {
    // Store admin in patients table with role
    const { uuid } = await storageService.addPatient({ 
      name: adminData.name, 
      phone: adminData.phone, 
      role: 'admin',
      designation: 'System Administrator',
      permissions: adminData.permissions || 'full'
    });
    
    // Set PIN if provided
    if (adminData.pin) {
      await setOrUpdatePin(adminData.pin, adminData.phone);
    }
    
    return { success: true, uuid };
  } catch (error) {
    console.error('Admin registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// --------------------- ASHA ---------------------
// OTP + PIN login flow (mocked OTP verify)
export const loginWithOTP = async (phone) => {
  // enqueue request if offline
  await storageService.enqueueSync('sessions', phone, 'otp_request');
  return { success: true, message: 'OTP sent (mock)' };
};

export const verifyOTPAndSetupSession = async ({ phone, name = 'ASHA Worker', uuid, role = 'asha' }) => {
  const userUuid = uuid || phone; // placeholder identifier
  await setCurrentSession({ current: { role, uuid: userUuid, name, phone, loggedAt: new Date().toISOString() } });
  return { success: true, uuid: userUuid };
};

export const setOrUpdatePin = async (pin, phone) => {
  const hashed = hashPin(pin);
  const pinKey = `pin_hash_${phone}`; // Make PIN storage user-specific
  // Use localStorage directly for consistency
  localStorage.setItem(pinKey, JSON.stringify({ hash: hashed }));
  return { success: true };
};

export const verifyPIN = async (pin, phone) => {
  const pinKey = `pin_hash_${phone}`; // Look up user-specific PIN
  // Use localStorage directly for consistency
  const storedData = localStorage.getItem(pinKey);
  if (!storedData) return { success: false, error: 'PIN not set' };
  try {
    const stored = JSON.parse(storedData);
    const ok = stored.hash === hashPin(pin);
    return ok ? { success: true } : { success: false, error: 'Invalid PIN' };
  } catch (error) {
    return { success: false, error: 'PIN not set' };
  }
};

export const registerAsha = async (ashaData) => {
  try {
    // Store ASHA in patients table with role
    const { uuid } = await storageService.addPatient({ 
      name: ashaData.name, 
      phone: ashaData.phone, 
      role: 'asha',
      email: ashaData.email || '',
      location: ashaData.location || '',
      aadhaar: ashaData.aadhaar || ''
    });
    
    // Set PIN if provided
    if (ashaData.pin) {
      await setOrUpdatePin(ashaData.pin, ashaData.phone);
    }
    
    return { success: true, uuid };
  } catch (error) {
    console.error('ASHA registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// --------------------- PHARMACY ---------------------
export const loginPharmacy = async (phone, pin) => {
  try {
    // Verify PIN first
    const pinResult = await verifyPIN(pin, phone);
    if (!pinResult.success) {
      return { success: false, error: pinResult.error || 'Invalid PIN' };
    }
    
    // Set up Pharmacy session
    await setCurrentSession({ 
      current: { 
        role: 'pharmacy', 
        uuid: phone, 
        name: 'Pharmacy Staff', 
        phone, 
        loggedAt: new Date().toISOString() 
      } 
    });
    
    return { success: true, message: 'Login successful', uuid: phone };
  } catch (error) {
    console.error('Pharmacy login error:', error);
    return { success: false, error: 'Login failed' };
  }
};

export const registerPharmacy = async (pharmacyData) => {
  try {
    // Store pharmacy in patients table with role
    const { uuid } = await storageService.addPatient({ 
      name: pharmacyData.name, 
      phone: pharmacyData.phone, 
      role: 'pharmacy',
      pharmacyName: pharmacyData.pharmacyName || 'Pharmacy',
      license: pharmacyData.license || 'N/A'
    });
    
    // Set PIN if provided
    if (pharmacyData.pin) {
      await setOrUpdatePin(pharmacyData.pin, pharmacyData.phone);
    }
    
    return { success: true, uuid };
  } catch (error) {
    console.error('Pharmacy registration error:', error);
    return { success: false, error: 'Registration failed' };
  }
};

// --------------------- LOGOUT ---------------------
export const logout = async () => {
  try {
    // Clear localStorage session directly
    localStorage.removeItem('session');
    return true;
  } catch (error) {
    console.error('Error logging out:', error);
    return false;
  }
};

// Biometric placeholders (to be integrated with Capacitor/Native later)
export const setupBiometric = async () => ({ success: true, message: 'Biometric setup placeholder' });
export const authenticateBiometric = async () => ({ success: true, message: 'Biometric auth placeholder' });