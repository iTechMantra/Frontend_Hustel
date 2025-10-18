// Unified authentication service with 6-role support using localStorage

export const ROLES = {
  user: "user", // Patient/Community Member
  asha: "asha", // ASHA Worker
  anm: "anm", // ANM Supervisor
  doctor: "doctor", // PHC Doctor
  phc_staff: "phc_staff", // PHC Administrative Staff
  admin: "admin", // System Administrator
};

export const ROLE_LABELS = {
  [ROLES.user]: "User/Patient",
  [ROLES.asha]: "ASHA Worker",
  [ROLES.anm]: "ANM Supervisor",
  [ROLES.doctor]: "PHC Doctor",
  [ROLES.phc_staff]: "PHC Administrative Staff",
  [ROLES.admin]: "System Administrator",
};

export const DASHBOARD_PATHS = {
  [ROLES.user]: "/user/dashboard",
  [ROLES.asha]: "/asha/dashboard",
  [ROLES.anm]: "/anm/dashboard",
  [ROLES.doctor]: "/doctor/dashboard",
  [ROLES.phc_staff]: "/phc/dashboard",
  [ROLES.admin]: "/admin/dashboard",
};

export const ROLE_OPTIONS = [
  { value: ROLES.user, label: ROLE_LABELS[ROLES.user] },
  { value: ROLES.asha, label: ROLE_LABELS[ROLES.asha] },
  { value: ROLES.anm, label: ROLE_LABELS[ROLES.anm] },
  { value: ROLES.doctor, label: ROLE_LABELS[ROLES.doctor] },
  { value: ROLES.phc_staff, label: ROLE_LABELS[ROLES.phc_staff] },
  { value: ROLES.admin, label: ROLE_LABELS[ROLES.admin] },
];

const STORAGE_KEYS = {
  ACCOUNTS: "app.accounts", // { [role]: Array<{id,name,phone,password}> }
  SESSION: "app.session", // { role, user: {id,name,phone}, loginAt }
};

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function writeJSON(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function ensureRole(role) {
  if (!Object.values(ROLES).includes(role)) {
    throw new Error("Unsupported role: " + role);
  }
}

function getAccounts() {
  const data = readJSON(STORAGE_KEYS.ACCOUNTS, {});
  // Ensure all roles exist as arrays so UI can rely on shape
  const out = { ...data };
  for (const r of Object.values(ROLES)) {
    if (!Array.isArray(out[r])) out[r] = [];
  }
  return out;
}

function saveAccounts(accounts) {
  writeJSON(STORAGE_KEYS.ACCOUNTS, accounts);
}

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getDashboardPathForRole(role) {
  return DASHBOARD_PATHS[role] || "/login";
}

export function getSession() {
  return readJSON(STORAGE_KEYS.SESSION, null);
}

export function isAuthenticated(requiredRole) {
  const session = getSession();
  if (!session) return false;
  if (requiredRole && session.role !== requiredRole) return false;
  return true;
}

export function logout() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
}

export function registerUser({ role, name, phone, password }) {
  role = (role || "").trim();
  name = (name || "").trim();
  phone = (phone || "").trim();
  password = (password || "").trim();

  ensureRole(role);
  if (!name || !phone || !password) {
    return { ok: false, error: "All fields are required." };
  }

  const accounts = getAccounts();
  const list = accounts[role] || [];
  const exists = list.find((a) => a.phone === phone);
  if (exists) {
    return { ok: false, error: `${ROLE_LABELS[role]} account already exists for this phone.` };
  }

  const record = { id: generateId(), name, phone, password };
  accounts[role] = [...list, record];
  saveAccounts(accounts);

  return { ok: true };
}

export function loginUser({ role, phone, password }) {
  role = (role || "").trim();
  phone = (phone || "").trim();
  password = (password || "").trim();

  ensureRole(role);
  const accounts = getAccounts();
  const list = accounts[role] || [];
  const user = list.find((a) => a.phone === phone);
  if (!user) {
    return { ok: false, error: `${ROLE_LABELS[role]} account not found.` };
  }
  if (user.password !== password) {
    return { ok: false, error: `Invalid password for ${ROLE_LABELS[role]}.` };
  }

  const session = {
    role,
    user: { id: user.id, name: user.name, phone: user.phone },
    loginAt: Date.now(),
  };
  writeJSON(STORAGE_KEYS.SESSION, session);

  return { ok: true, redirect: getDashboardPathForRole(role) };
}

export default {
  ROLES,
  ROLE_LABELS,
  ROLE_OPTIONS,
  DASHBOARD_PATHS,
  getDashboardPathForRole,
  getSession,
  isAuthenticated,
  logout,
  registerUser,
  loginUser,
};
