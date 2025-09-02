import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "../../components/LoginAdmin.css"; // tambahkan CSS custom

function LoginAdmin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Email atau password salah");
    }
  };

  return (
    <div className="login-admin-container">
      <div className="logo-header">
        <img src="/LogoPersit.png" alt="Logo Kecil" className="logo-small" />
      <div className="logo-text">
        <div className="header-text">PERSIT KARTIKA CANDRA KIRANA</div>
        <div className="H-text"> CABANG XVII DIM 0803 MADIUN</div>
        <div className="K-text"> KOORCAB REM 081 PD V/BRAWIJAYA</div>
      </div>  
      </div>

      <div className="backgroundlogin-logo">
        <img src="/LogoPersit.png" alt="Logo Besar" />
      </div>

      <div className="login-form-box">
        <h3 className="mb-6 text-center">LOGIN ADMIN</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-success w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginAdmin;
