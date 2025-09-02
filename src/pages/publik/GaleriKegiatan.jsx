import { useEffect, useState } from "react";
import api from "../../services/apiPublic";
import "../../components/GaleriKegiatan.css";

export default function GaleriKegiatan() {
  const [galeri, setGaleri] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    api.get("/galeri-slider")
      .then((res) => {
        const galeriData = res.data.map((item) => ({
          ...item,
          gambar: item.gambar?.startsWith("http")
            ? item.gambar
            : `http://localhost:8000${item.gambar}`,
        }));
        setGaleri(galeriData);
      })
      .catch((err) => console.error("Gagal ambil galeri:", err));
  }, []);

  const handleImageClick = (imgSrc) => {
    setModalImage(imgSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="galeri-kegiatan-page">
      <div className="D-text">Galeri Kegiatan</div>
      <div className="galeri-grid-custom">
        {galeri.map((foto) => (
          <div key={foto.id} className="galeri-item-custom" onClick={() => handleImageClick(foto.gambar)}>
            <img
              src={foto.gambar}
              alt={foto.judul || "Foto Galeri"}
              className="galeri-thumbnail-custom"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-image.jpg";
              }}
            />
          </div>
        ))}
      </div>

      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>
              &times;
            </button>
            <img src={modalImage} alt="Preview" className="modal-image" />
          </div>
        </div>
      )}
    </div>
  );
}
