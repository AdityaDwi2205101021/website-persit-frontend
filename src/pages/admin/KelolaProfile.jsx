import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import "../../components/KelolaProfil.css";

export default function KelolaProfil() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [dataProfil, setDataProfil] = useState([]);
  const [editId, setEditId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("isi", isi);
    if (gambar) {
      formData.append("gambar", gambar);
    }

    try {
      if (editId) {
        await axios.post(`http://localhost:8000/api/profil/${editId}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:8000/api/profil", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      fetchDataProfil();
      setJudul("");
      setIsi("");
      setGambar(null);
      setEditId(null);
    } catch (error) {
      console.error("Gagal kirim data profil:", error);
    }
  };

  const handleEdit = (item) => {
    setJudul(item.judul);
    setIsi(item.isi);
    setEditId(item.id);
    setGambar(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/profil/${id}`);
      fetchDataProfil();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  const fetchDataProfil = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/profil");
      const data = Array.isArray(res.data.profil) ? res.data.profil : [];
      setDataProfil(data);
    } catch (error) {
      console.error("Gagal ambil data profil:", error);
      setDataProfil([]);
    }
  };

  useEffect(() => {
    fetchDataProfil();
  }, []);

  return (
    <div className="kelola-profil-container">
      <AdminSidebar />
      <div className="konten-admin-profil"></div>
      <div className="kelola-profil-content">
        <div className="background-profil-logo">
          <img src="/LogoPersit.png" alt="Logo Persit" />
        </div>

        <h2>Kelola Profil Persit</h2>

        <form
          onSubmit={handleSubmit}
          className="kelola-profil-form"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label>Judul Profil:</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Isi Profil:</label>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              required
              rows="5"
            />
          </div>

          <div className="form-group">
            <label>Gambar (opsional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn-submit">
            {editId ? "Update Profil" : "Simpan Profil"}
          </button>
        </form>

        <hr />

        {dataProfil.length > 0 ? (
          <div className="daftar-profil">
            <h3>Daftar Profil</h3>
            {dataProfil.map((item, index) => (
              <div key={index} className="profil-item">
                <h4>{item.judul}</h4>
                <p>{item.isi}</p>
                {item.gambar && (
                  <img
                    src={`http://localhost:8000/storage/${item.gambar}`}
                    alt="Foto Profil"
                  />
                )}
                <div style={{ marginTop: "10px" }}>
                  <button
                    onClick={() => handleEdit(item)}
                    style={{
                      marginRight: "10px",
                      padding: "6px 12px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ marginTop: "2rem" }}>Belum ada data profil.</p>
        )}
      </div>
    </div>
  );
}
