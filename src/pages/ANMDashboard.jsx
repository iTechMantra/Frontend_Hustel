import React from "react";
import { useNavigate } from "react-router-dom";
import { getSession, logout } from "../services/authService";

export default function ANMDashboard() {
  const navigate = useNavigate();
  const session = getSession();
  const name = session?.user?.name || "ANM";

  function onLogout() {
    logout();
    navigate("/", { replace: true });
  }

  return (
    <div style={{ padding: 16 }}>
      <h2>ANM Supervisor Dashboard</h2>
      <p>Welcome, {name}.</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
