import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLE_OPTIONS, ROLE_LABELS, registerUser } from "../services/authService";

export default function Signup() {
  const navigate = useNavigate();
  const [role, setRole] = useState(ROLE_OPTIONS[0].value);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = registerUser({ role, name, phone, password });
      if (!res.ok) {
        setError(res.error || `Could not create ${ROLE_LABELS[role]} account.`);
      } else {
        navigate("/login", { replace: true, state: { registeredRole: role } });
      }
    } catch (err) {
      setError("Unexpected error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Create an account</h1>
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
            Full name
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }}
            />
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
          {loading ? "Creating..." : `Create ${ROLE_LABELS[role]} account`}
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button onClick={() => navigate("/login")} style={{ padding: "6px 10px" }}>
          Back to Login
        </button>
      </div>
    </div>
  );
}
