// Keanggotaan.js
import React from "react";
import { Link } from "react-router-dom";
import "./Keanggotaan.css";

export default function Keanggotaan() {
  return (
    <div className="keanggotaan-container">
      <div className="keanggotaan-content">
        <div className="keanggotaan-header">
          <div className="k-text">Keanggotaan Persit</div>
          <Link to="/anggota-summary" className="btn-statistik">
            Statistik Anggota
          </Link>
        </div>

        <div className="keanggotaan-body">
          <section className="aturan-anggota">
            <h3>Aturan Anggota</h3>
            <p>Isi aturan anggota di sini...</p>
          </section>

          <section className="hak-kewajiban">
            <h3>Hak & Kewajiban Anggota</h3>
            <p>Isi hak dan kewajiban anggota di sini...</p>
          </section>
        </div>
      </div>
    </div>
  );
}
