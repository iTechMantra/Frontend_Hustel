import React from "react";
import { useNavigate } from "react-router-dom";
import { getSession, logout } from "../services/authService";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const name = session?.user?.name || "Doctor";

  function onLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>Doctor Dashboard</h2>
      <p>Welcome, {name}.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
