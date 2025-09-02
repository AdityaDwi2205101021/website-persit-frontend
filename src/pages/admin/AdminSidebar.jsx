import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/AdminSidebar.css"; // kita pindah sebagian styling ke CSS

export default function AdminSidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-y-sidebar">
      <div className="leaf-top" />
      
      <div className="logo-container">
        <img src="/LogoPersit.png" alt="Logo Persit" className="sidebar-logo" />
      </div>

      <h4 className="sidebar-title">ADMIN PERSIT KODIM 0803 MADIUN</h4>

      <ul className="sidebar-links">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/anggota">Anggota</Link></li>
        <li><Link to="/admin/struktur-organisasi">Struktur Organisasi</Link></li>
        <li><Link to="/admin/struktur-cabang">Struktur Ranting</Link></li>
        <li><Link to="/admin/berita">Berita</Link></li>
        <li><Link to="/admin/galeri">Galeri</Link></li>
        <li><Link to="/admin/peta-wilayah">Peta Wilayah</Link></li>
        <li><Link to="/admin/pimpinan-persit">Pimpinan Persit</Link></li>
        <li><Link to="/admin/pembina-persit">Pembina Persit</Link></li>
        <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
      </ul>

      <div className="leaf-bottom" />
    </div>
  );
}
