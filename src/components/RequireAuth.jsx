import React, { useEffect, useMemo, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getSession, getDashboardPathForRole } from "../services/authService";

export default function RequireAuth({ role: requiredRole, children }) {
  const location = useLocation();
  const [checking, setChecking] = useState(true);
  const session = useMemo(() => getSession(), []);

  useEffect(() => {
    // Simulate async check to allow for a short loading state
    const t = setTimeout(() => setChecking(false), 0);
    return () => clearTimeout(t);
  }, []);

  if (checking) {
    return <div style={{ padding: 16 }}>Authenticating...</div>;
  }

  if (!session) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole && session.role !== requiredRole) {
    return <Navigate to={getDashboardPathForRole(session.role)} replace />;
  }

  return <>{children}</>;
}
