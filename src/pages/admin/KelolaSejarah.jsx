import React, { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import "../../components/KelolaSejarah.css";

export default function KelolaSejarah() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [gambar, setGambar] = useState(null);
  const [dataSejarah, setDataSejarah] = useState([]);
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
        await axios.post(`http://localhost:8000/api/sejarah/${editId}?_method=PUT`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post("http://localhost:8000/api/sejarah", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      fetchDataSejarah();
      setJudul("");
      setIsi("");
      setGambar(null);
      setEditId(null);
    } catch (error) {
      console.error("Gagal kirim data:", error);
    }
  };

  const handleEdit = (item) => {
    setJudul(item.judul);
    setIsi(item.isi);
    setEditId(item.id);
    setGambar(null); // Reset gambar, karena <input type="file"> tidak bisa diisi secara programatik
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/api/sejarah/${id}`);
      fetchDataSejarah();
    } catch (error) {
      console.error("Gagal menghapus:", error);
    }
  };

  const fetchDataSejarah = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/sejarah");
      const data = Array.isArray(res.data.sejarah) ? res.data.sejarah : [];
      setDataSejarah(data);
    } catch (error) {
      console.error("Gagal ambil data sejarah:", error);
      setDataSejarah([]);
    }
  };

  useEffect(() => {
    fetchDataSejarah();
  }, []);

  return (
    <div className="kelola-sejarah-container">
      <AdminSidebar />
      <div className="konten-admin-sejarah"></div>
      <div className="kelola-sejarah-content">
        <div className="background-sejarah-logo">
          <img src="/LogoPersit.png" alt="Logo Persit" />
        </div>

        <h2>Kelola Sejarah Persit</h2>

        <form
          onSubmit={handleSubmit}
          className="kelola-sejarah-form"
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label>Judul Sejarah:</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Isi Sejarah:</label>
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
              onChange={(e) => {
                const file = e.target.files[0];
                setGambar(file);
              }}
            />
          </div>

          <button type="submit" className="btn-submit">
            {editId ? "Update Sejarah" : "Simpan Sejarah"}
          </button>
        </form>

        <hr />

        {Array.isArray(dataSejarah) && dataSejarah.length > 0 ? (
          <div className="daftar-sejarah">
            <h3>Daftar Sejarah</h3>
            {dataSejarah.map((item, index) => (
              <div key={index} className="sejarah-item">
                <h4>{item.judul}</h4>
                <p>{item.isi}</p>
                {item.gambar && (
                  <img
                    src={`http://localhost:8000/storage/${item.gambar}`}
                    alt="Foto sejarah"
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
          <p style={{ marginTop: "2rem" }}>Belum ada data sejarah.</p>
        )}
      </div>
    </div>
  );
}
