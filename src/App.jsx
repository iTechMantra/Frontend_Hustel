import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./components/RequireAuth";
import { ROLES } from "./services/authService";
import UserDashboard from "./pages/UserDashboard";
import ASHADashboard from "./pages/ASHADashboard";
import ANMDashboard from "./pages/ANMDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PHCDashboard from "./pages/PHCDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/user/dashboard"
        element={
          <RequireAuth role={ROLES.user}>
            <UserDashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/asha/dashboard"
        element={
          <RequireAuth role={ROLES.asha}>
            <ASHADashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/anm/dashboard"
        element={
          <RequireAuth role={ROLES.anm}>
            <ANMDashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/doctor/dashboard"
        element={
          <RequireAuth role={ROLES.doctor}>
            <DoctorDashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/phc/dashboard"
        element={
          <RequireAuth role={ROLES.phc_staff}>
            <PHCDashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/dashboard"
        element={
          <RequireAuth role={ROLES.admin}>
            <AdminDashboard />
          </RequireAuth>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
