import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import AdminSidebar from "./AdminSidebar";
import "../../components/DashboardAdmin.css"; 

export default function DashboardAdmin() {
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => {
        console.error(err);
        navigate("/admin/dashboard");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar />
      <div className="konten-admin"></div>
      <div className="dashboard-content">
        <div className="background-dashboard-admin-logo">
          <img src="/LogoPersit.png" alt="Logo Besar" />
        </div>
        <div className="dashboard-box">
          <h2 className="dashboard-title">DASHBOARD ADMIN PERSIT CABANG XVII KODIM 0803 MADIUN</h2>
          {admin && (
            <p className="welcome-text">
              Selamat datang, <strong>{admin.name}</strong>!
            </p>
          )}
          <button onClick={handleLogout} className="btn btn-danger mt-3">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
