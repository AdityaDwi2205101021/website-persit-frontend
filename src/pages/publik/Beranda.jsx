import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../../components/Beranda.css";
import api from "../../services/apiPublic";
import { useNavigate } from "react-router-dom";

// === Tambahan untuk peta ===
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fungsi bikin ikon custom dari foto
const createCustomIcon = (fotoUrl) => {
  return L.icon({
    iconUrl: fotoUrl || "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
    className: "custom-leaflet-icon"
  });
};

export default function Beranda() {
  const [galeriSlider, setGaleriSlider] = useState([]);
  const [beritaTerbaru, setBeritaTerbaru] = useState([]);
  const [titikPersit, setTitikPersit] = useState([]);
  const navigate = useNavigate();
  const [modalImage, setModalImage] = useState(null);

  const handleImageClick = (imgSrc) => setModalImage(imgSrc);
  const closeModal = () => setModalImage(null);

  // Ambil galeri slider
  useEffect(() => {
    api
      .get("/galeri-slider")
      .then((res) => {
        const galeri = res.data.map((item) => ({
          ...item,
          gambar: item.gambar?.startsWith("http")
            ? item.gambar
            : `http://localhost:8000${item.gambar}`,
        }));
        setGaleriSlider(galeri);
      })
      .catch((err) => console.error("Gagal ambil galeri:", err));
  }, []);

  // Ambil berita kegiatan
  useEffect(() => {
    api
      .get("/berita-kegiatan")
      .then((res) => setBeritaTerbaru(res.data))
      .catch((err) => console.error("Gagal ambil berita:", err));
  }, []);

  // Ambil titik peta Persit (API publik)
  useEffect(() => {
    api
      .get("/peta-wilayah-publik")
      .then((res) => setTitikPersit(res.data || []))
      .catch((err) => console.error("Gagal ambil titik peta:", err));
  }, []);

  return (
    <div className="beranda-container">
      {/* Slider Galeri */}
      <div className="hero-slider">
        <Swiper modules={[Navigation]} navigation loop className="swiper-container">
          {galeriSlider.length > 0 ? (
            galeriSlider.map((foto) => (
              <SwiperSlide key={foto.id}>
                <img
                  src={foto.gambar}
                  alt={foto.judul || "Foto Galeri"}
                  className="slider-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/default-image.jpg";
                  }}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <img src="/default-image.jpg" alt="Default" className="slider-image" />
            </SwiperSlide>
          )}
        </Swiper>
      </div>

      {/* BERITA KEGIATAN */}
<div className="section-highlight">
  <div className="container">
    <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#1b4332" }}>
      Berita Kegiatan
    </h2>
<div className="row">
  {beritaTerbaru.length > 0 ? (
    beritaTerbaru
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)) // urutkan dari terbaru
      .slice(0, 3) // ambil 4 teratas
      .map((item) => (
        <div className="col-md-4 mb-5 mt-3" key={item.id}> {/* 4 kolom sejajar */}
          <div
            className="card shadow-sm border-1 h-100"
            style={{
              width: "100%", height: "100%",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={`http://localhost:8000/storage/${item.gambar}`}
              className="card-img-top"
              alt={item.gambar}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-image.jpg";
              }}
            />
            <div className="berita-body">
              <h5 className="berita-title">{item.judul}</h5>
              <small className="berita-text">
                {item.updated_at
                  ? new Date(item.updated_at).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Tanggal tidak tersedia"}
              </small>
              <p className="berita-text" style={{ flexGrow: 1 }}>
                {item.konten
                  ? item.konten.slice(0, 50) + "..."
                  : "Tidak ada isi"}
              </p>
              <button
                className="berita-btn"
                onClick={() => navigate(`/berita/${item.id}`)}
              >
                Baca Selengkapnya
              </button>
            </div>
          </div>
        </div>
      ))
  ) : (
    <p className="text-center">Tidak ada berita terbaru.</p>
  )}
</div>

</div>
      {/* Galeri Kegiatan */}
      <div className="section-highlight">
        <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#1b4332" }}>Galeri Kegiatan</h2>
        <div className="galeri-grid">
          {galeriSlider.slice(0, 4).map((foto) => (
          <div className="card shadow-sm border-1 h-100"
            style={{  
              width: "100%", height: "100%",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            >
              <img
                src={foto.gambar}
                alt={foto.judul || "Foto Galeri"}
                style={{
                width: "100%",
                height: "100",
                objectFit: "cover",
              }}
                className="galeri-thumbnail"
                onClick={() => handleImageClick(foto.gambar)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default-image.jpg";
                }}
              />
            </div>
          ))}
        </div>
      </div>
{/* Peta Wilayah Persit */}
<div className="section-highlight">
  <h2 style={{ textAlign: "center", marginBottom: "10px", color: "#1b4332" }}>
    Peta Wilayah Cabang Persit
  </h2>
  <p style={{ textAlign: "center", marginBottom: "20px", fontSize: "14px", color: "#555" }}>
    Temukan lokasi cabang Persit di wilayah Kodim 0803 Madiun.
  </p>
  <div
    style={{
      height: "450px",
      width: "100%",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}
  >
    <MapContainer
       center={[-7.65, 112.0]} 
      zoom={10}
      style={{ height: "100%", width: "100%" }}
       maxBounds={[
    [-11, 95],  // batas barat daya Indonesia (Sumatera bagian bawah)
    [6, 141]    // batas timur laut Indonesia (Papua bagian atas)
  ]}
  maxBoundsViscosity={1.0}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {titikPersit.length > 0 &&
        titikPersit.map((titik, idx) => {
          const fotoUrl = titik.gambar
            ? `http://localhost:8000/storage/${titik.gambar}`
            : "http://localhost:8000/default-marker.png";
          return (
            <Marker
              key={idx}
              position={[parseFloat(titik.latitude), parseFloat(titik.longitude)]}
              icon={createCustomIcon(fotoUrl)}
            >
              <Popup>
                <div style={{ textAlign: "center" }}>
                  <img
                    src={fotoUrl}
                    alt={titik.cabang}
                    style={{
                      width: "60%",
                      height: "60%",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "8px"
                    }}
                  />
                  <h4 style={{ marginBottom: "5px", color: "#1b4332" }}>{titik.cabang}</h4>
                  <p style={{ fontSize: "13px", color: "#555" }}>
                    {titik.deskripsi || "Tidak ada deskripsi"}
                  </p>
                </div>
              </Popup>
            </Marker>
          );
        })}
    </MapContainer>
  </div>
</div>
      {/* Modal Gambar */}
      {modalImage && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-button" onClick={closeModal}>
              &times;
            </button>
            <img src={modalImage} alt="Preview" />
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
