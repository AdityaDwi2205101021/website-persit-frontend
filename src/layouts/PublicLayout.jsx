import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../components/PublicLayout.css";
import LogoPersit from "../assets/LogoPersit.png";
import { FaBars } from "react-icons/fa";

export default function PublicLayout() {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className="public-layout">
      <header className="public-navbar">
        <div className="navbar-container">
          <img src={LogoPersit} alt="Logo Persit" className="navbar-logo-beranda" />
          <div className="navbar-title-beranda">
            PERSIT KARTIKA CHANDRA KIRANA <br />
            CABANG XVII KODIM 0803 MADIUN <br />
            KOORCAB REM 081 PD V/BRAWIJAYA
          </div>
          <button className="hamburger-btn" onClick={() => setShowNav(!showNav)}>
            <FaBars
              size={35}
              style={{
                border: "2px solid #145c44",
                padding: "6px",
                borderRadius: "3px",
              }}
            />
          </button>
        </div>

        <nav className={`nav-links ${showNav ? "active" : ""}`}>
          <Link to="/" onClick={() => setShowNav(false)}>Beranda</Link>
          <Link to="/profil" onClick={() => setShowNav(false)}>Profil</Link>
          <Link to="/berita-kegiatan" onClick={() => setShowNav(false)}>Berita Kegiatan</Link>
          <Link to="/galeri" onClick={() => setShowNav(false)}>Galeri</Link>
          <Link to="/anggota-summary" onClick={() => setShowNav(false)}>Keanggotaan</Link>
        </nav>
        {/* overlay */}
<div
  className={`nav-overlay ${showNav ? "active" : ""}`}
  onClick={() => setShowNav(false)}
></div>
      </header>

      <main className="public-content">
        <Outlet />
      </main>

      <footer className="public-footer">
  <div className="footer-container">
    {/* Kiri: Ikon Sosial Media */}
    <div className="footer-socials">
      <a href="https://maps.app.goo.gl/D3qRvDjTZmtWYTxp6" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-map-marker-alt"></i>
      </a>
      <a href="https://web.facebook.com/persit.k.madiun" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-facebook"></i>
      </a>
      <a href="https://www.instagram.com/persitcabangxviikodim0803" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://www.youtube.com/@kodim0803madiun" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-youtube"></i>
      </a>
    </div>

    {/* Kanan: Info Persit */}
    <div className="footer-info">
      <img src={LogoPersit} alt="Logo Persit" className="footer-logo" />
      <div className="footer-text">
        <p className="footer-nama">
          PERSIT KARTIKA CHANDRA KIRANA CABANG XVII <br />
          KODIM 0803 KOORCAB REM 081 PD V/BRAWIJAYA
        </p>
        <p className="footer-alamat">
          Jl. Pahlawan No.25, Madiun, Jawa Timur 63117
          (0351) 454716
        </p>
       <a href="/login" target="_blank"  className="login-logo"rel="noopener noreferrer">
  <i className="fas fa-user-circle"></i>
</a>

      </div>
    </div>
  </div>
</footer>
</div>
  );
}
