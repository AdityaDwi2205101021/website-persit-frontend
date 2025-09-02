import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../../services/api";
import "../../components/KelolaPeta.css";

export default function KelolaPeta() {
  const [cabang, setCabang] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [gambar, setGambar] = useState(null);
  const [titik, setTitik] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.get("/peta-wilayah")
      .then(res => setTitik(res.data))
      .catch(err => console.error("Gagal ambil data peta:", err));
  };

  const resetForm = () => {
    setCabang("");
    setLatitude("");
    setLongitude("");
    setGambar(null);
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      alert("Latitude dan Longitude harus valid.");
      return;
    }

    if (!gambar && !editId) {
      alert("Harap pilih gambar.");
      return;
    }

    const formData = new FormData();
    formData.append("cabang", cabang);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    if (gambar) formData.append("gambar", gambar);

    if (editId) {
      api.post(`/peta-wilayah/${editId}?_method=PUT`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          fetchData();
          resetForm();
        })
        .catch(err => console.error("Gagal update data:", err));
    } else {
      api.post("/peta-wilayah", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(() => {
          fetchData();
          resetForm();
        })
        .catch(err => console.error("Gagal simpan data:", err));
    }
  };

  const handleEdit = (item) => {
    setCabang(item.cabang);
    setLatitude(item.latitude);
    setLongitude(item.longitude);
    setEditId(item.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Yakin ingin menghapus titik ini?")) {
      api.delete(`/peta-wilayah/${id}`)
        .then(() => fetchData())
        .catch(err => console.error("Gagal hapus data:", err));
    }
  };

  function MapClickHandler() {
    useMapEvents({
      click(e) {
        setLatitude(e.latlng.lat.toFixed(6));
        setLongitude(e.latlng.lng.toFixed(6));
      },
    });
    return null;
  }

  return (
    <div className="kelola-peta-container">
      <AdminSidebar />
      <div className="konten-admin-peta"></div>
      <div className="kelola-peta-content">
        <div className="background-struktur-peta-logo">
          <img src="/logopersit.png" alt="Logo Persit" />
        </div>

        <h2>{editId ? "Edit Titik Peta" : "Tambah Titik Peta"}</h2>

        <form onSubmit={handleSubmit} className="form-peta" encType="multipart/form-data">
          <input type="text" value={cabang} onChange={(e) => setCabang(e.target.value)} placeholder="Nama Cabang" required />
          <input type="number" step="any" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="Latitude" required />
          <input type="number" step="any" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="Longitude" required />
          <input type="file" accept="image/*" onChange={(e) => setGambar(e.target.files[0])} />
          <button type="submit" className="btn-submit">{editId ? "Update" : "Tambah Titik"}</button>
          {editId && <button type="button" onClick={resetForm} className="btn-reset">Batal Edit</button>}
        </form>

        <MapContainer
          center={[-7.6256, 111.5231]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "400px", marginTop: "1rem", borderRadius: "10px", zIndex: 1 }}
        >
          <MapClickHandler />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {titik.map((item) => {
            const icon = L.icon({
              iconUrl: `http://localhost:8000/storage/${item.gambar}`,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40],
            });

            return (
              <Marker key={item.id} position={[item.latitude, item.longitude]} icon={icon}>
                <Popup>{item.cabang}</Popup>
              </Marker>
            );
          })}
        </MapContainer>

        <h4 style={{ marginTop: "1.5rem" }}>Daftar Titik</h4>
        <ul className="list-titik">
          {titik.map((item) => (
            <li key={item.id}>
              <strong>{item.cabang}</strong> — Lat: {item.latitude}, Lng: {item.longitude}
              <br />
              <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="btn-hapus">Hapus</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
