import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import api from "../../services/api"; // ganti axios -> api
import "../../components/KelolaBerita.css";

export default function KelolaBerita() {
  const [judul, setJudul] = useState("");
  const [isi, setIsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [gambar, setGambar] = useState(null);
  const [daftarBerita, setDaftarBerita] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchBerita();
  }, []);

  const fetchBerita = async () => {
    try {
      const res = await api.get("/berita");
      setDaftarBerita(res.data);
    } catch (error) {
      console.error("Gagal mengambil daftar berita:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!judul || !isi || !tanggal || (editId === null && !gambar)) {
      alert("Semua field harus diisi.");
      return;
    }

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("konten", isi);
    formData.append("tanggal", tanggal);
    if (gambar) formData.append("gambar", gambar);

    try {
      if (editId) {
        await api.post(`/berita/${editId}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Berita berhasil diperbarui!");
      } else {
        await api.post("/berita", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Berita berhasil ditambahkan!");
      }

      resetForm();
      fetchBerita();
    } catch (error) {
  if (error.response && error.response.status === 422) {
    console.error("Validasi gagal:", error.response.data);
    alert("Validasi gagal: " + JSON.stringify(error.response.data.errors));
  } else {
    console.error("Gagal menyimpan berita:", error);
    alert("Terjadi kesalahan saat menyimpan berita.");
  }
}
  };

  const handleEdit = (berita) => {
    setEditId(berita.id);
    setJudul(berita.judul);
    setIsi(berita.konten);
    setTanggal(berita.tanggal);
    setGambar(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus berita ini?")) return;

    try {
      await api.delete(`/berita/${id}`);
      alert("Berita berhasil dihapus.");
      fetchBerita();
    } catch (error) {
      console.error("Gagal menghapus berita:", error);
      alert("Terjadi kesalahan saat menghapus berita.");
    }
  };

  const resetForm = () => {
    setEditId(null);
    setJudul("");
    setIsi("");
    setTanggal("");
    setGambar(null);
  };

  return (
    <div className="kelola-berita-container">
      <AdminSidebar />
      <div className="konten-admin-berita"></div>
      <div className="kelola-berita-content">
        <div className="background-berita-logo">
          <img src="/LogoPersit.png" alt="Logo Persit Background" />
        </div>

        <h2>{editId ? "Edit Berita" : "Tambah Berita"}</h2>

        <form onSubmit={handleSubmit} className="form-berita" encType="multipart/form-data">
          <div>
            <label>Judul Berita:</label>
            <input
              type="text"
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Isi Berita:</label>
            <textarea
              value={isi}
              onChange={(e) => setIsi(e.target.value)}
              required
              rows="4"
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label>Tanggal Berita:</label>
            <input
              type="date"
              value={tanggal}
              onChange={(e) => setTanggal(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Gambar Berita:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setGambar(e.target.files[0])}
              {...(editId ? {} : { required: true })}
            />
          </div>

          <button className="btn-submit" type="submit">
            {editId ? "Perbarui Berita" : "Tambah Berita"}
          </button>
          {editId && (
            <button className="btn-reset" type="button" onClick={resetForm}>
              Batal Edit
            </button>
          )}
        </form>

        <hr />

        <h4>Daftar Berita</h4>
        {daftarBerita.map((berita) => (
          <div key={berita.id} className="anggota-card">
            <h5>{berita.judul}</h5>
            <small>{berita.tanggal}</small>
            <p>{berita.konten}</p>
            {berita.gambar && (
              <div className="foto-anggota">
                <img
                  src={`http://localhost:8000/storage/${berita.gambar}`}
                  alt="gambar berita"
                />
              </div>
            )}
            <button onClick={() => handleEdit(berita)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => handleDelete(berita.id)} className="btn-hapus">
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
