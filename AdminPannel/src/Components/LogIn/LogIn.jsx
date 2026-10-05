import React, { useState } from "react";
import "./LogIn.css";

// Hardcoded credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "123456",
};

const LogIn = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Simulate small delay so it feels like a real request
    setTimeout(() => {
      const u = username.trim();
      const p = password;

      if (u === ADMIN_CREDENTIALS.username && p === ADMIN_CREDENTIALS.password) {
        const userData = {
          username: u,
          role: "admin",
          isMock: true,
          loginAt: new Date().toISOString(),
        };
        onLoginSuccess(userData);
      } else {
        setError("Invalid username or password.");
        setLoading(false);
      }
    }, 300);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Admin Login</h1>

        {error && <div className="login-alert error">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              autoComplete="username"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </label>

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="login-hint">
          Demo credentials: <strong>admin</strong> / <strong>123456</strong>
        </p>
      </div>
    </div>
  );
};

export default LogIn;