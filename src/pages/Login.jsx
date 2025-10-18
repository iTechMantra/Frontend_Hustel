import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROLE_OPTIONS, ROLE_LABELS, loginUser, getDashboardPathForRole } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState(ROLE_OPTIONS[0].value);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const from = useMemo(() => location.state?.from?.pathname, [location.state]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = loginUser({ role, phone, password });
      if (!res.ok) {
        setError(res.error || `Invalid account for ${ROLE_LABELS[role]}.`);
      } else {
        navigate(from || res.redirect || getDashboardPathForRole(role), { replace: true });
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Login</h1>
      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
            >
              {ROLE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
              required
              style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
            />
          </label>
        </div>

        {error ? (
          <div role="alert" style={{ color: "#b00020", marginBottom: 12 }}>
            {error}
          </div>
        ) : null}

        <button type="submit" disabled={loading} style={{ padding: "8px 12px" }}>
          {loading ? "Logging in..." : `Login as ${ROLE_LABELS[role]}`}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate("/signup")} style={{ padding: "6px 10px" }}>
          Create an account
        </button>
      </div>
    </div>
  );
}
