import { useNavigate } from "react-router-dom";
import "../../components/Profile.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProfilPublik() {
  // langsung isi data profil
  const navigate = useNavigate();

  return (
    <div className="profil-publik-container">
      {/* Background teks miring */}
      <div className="profil-publik-bg-text">
        {Array(50).fill(
          <div className="profil-publik-bg-line">
            {Array(30).fill("PERSIT KODIM MADIUN ").join("")}
          </div>
        )}
      </div>

      {/* Layout utama */}
      <div className="profil-publik-layout">
        {/* Kolom kiri: Profil */}
        <div className="profil-publik-content">
          {/* 🔹 Profil Persit */}
          <div className="text-center mb-4 profil-section">
            <h2 className="mt-3 fw-bold profil-title">
              <i className="bi bi-book-half me-2"></i> Persit Kartika Chandra Kirana
            </h2>
            <div className="profil-text-box">
              <p className="profil-text">
                <span className="highlight">Persit Kartika Chandra Kirana</span>{" "}
                (selanjutnya disebut <strong>Persit</strong>) adalah persatuan
                istri tentara (Angkatan Darat) yang didirikan oleh
                <span className="highlight"> Ratu Aminah Hidayat</span> pada
                <span className="highlight"> 3 April 1946</span> di Purwakarta,
                Jawa Barat. Organisasi ini berasaskan <strong>Pancasila</strong>{" "}
                dan <strong>Undang-Undang Dasar 1945</strong>.
              </p>
              <p className="profil-text">
                Dalam perkembangannya, Persit menyesuaikan organisasinya dengan
                reorganisasi <strong>TNI Angkatan Darat</strong> yang dimulai
                pada 1984. Dengan demikian, kedudukan Persit Kartika Chandra
                Kirana menjadi organisasi kemasyarakatan yang berinduk pada{" "}
                <strong>Dharma Pertiwi</strong>.
              </p>
            </div>
          </div>
</div>
        {/* Kolom kanan: Navigasi */}
        <div className="profil-publiks-sidebar">
          <h4>Navigasi</h4>
           <button
            className="profils-btn"
            onClick={() => navigate(`/visimisi`)}
          >
            VISI & MISI 
          </button>
          <button
            className="profils-btn"
            onClick={() => navigate(`/sejarah`)}
          >
            SEJARAH SINGKAT
          </button>
          <button
            className="profils-btn"
            onClick={() => navigate(`/struktur-organisasi`)}
          >
            STRUKTUR ORGANISASI CABANG
          </button>
          <button
            className="profils-btn"
            onClick={() => navigate(`/struktur-ranting`)}
          >
            STRUKTUR ORGANISASI RANTING SEJAJARAN CABANG
          </button>
          <button
            className="profils-btn"
            onClick={() => navigate(`/pimpinan-persit`)}
          >
            KETUA PERSIT CABANG XVII
          </button>
          <button
            className="profils-btn"
            onClick={() => navigate(`/pembina-persit`)}
          >
            PEMBINA PERSIT
          </button>
        </div>
      </div>
    </div>
  );
}
