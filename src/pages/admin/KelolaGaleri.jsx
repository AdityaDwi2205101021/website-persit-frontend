import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "./AdminSidebar";
import logoPersit from "../../assets/LogoPersit.png"; 
import "../../components/KelolaGaleri.css"; 

export default function KelolaGaleri() {
  const [galeri, setGaleri] = useState([]);
  const [form, setForm] = useState({
    id: null,
    judul: "",
    tanggal_pelaksanaan: "",
    gambar: null,
    preview: null,
  });
  const [isEdit, setIsEdit] = useState(false);

  const fetchGaleri = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/galeri", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setGaleri(res.data);
    } catch (error) {
      console.error("Gagal mengambil data galeri:", error);
    }
  };

  useEffect(() => {
    fetchGaleri();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "gambar") {
      const file = files[0];
      setForm((prev) => ({
        ...prev,
        gambar: file,
        preview: URL.createObjectURL(file),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("judul", form.judul);
    formData.append("tanggal_pelaksanaan", form.tanggal_pelaksanaan);
    if (form.gambar) {
      formData.append("gambar", form.gambar);
    }

    try {
      if (isEdit) {
        await axios.post(`http://localhost:8000/api/galeri/${form.id}?_method=PUT`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Data berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:8000/api/galeri", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        alert("Data berhasil ditambahkan!");
      }

      fetchGaleri();
      setForm({ id: null, judul: "", tanggal_pelaksanaan: "", gambar: null, preview: null });
      setIsEdit(false);
    } catch (error) {
      console.error("Gagal menyimpan data:", error);
      alert("Gagal menyimpan data.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus galeri ini?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/galeri/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchGaleri();
    } catch (error) {
      console.error("Gagal menghapus:", error);
      alert("Gagal menghapus data.");
    }
  };

  const handleEdit = (item) => {
    setForm({
      id: item.id,
      judul: item.judul,
      tanggal_pelaksanaan: item.tanggal_pelaksanaan,
      gambar: null,
      preview: `http://localhost:8000/storage/${item.gambar}`,
    });
    setIsEdit(true);
    window.scrollTo(0, 0);
  };

  return (
    <div className="kelola-galeri-container">
      <AdminSidebar />
      <div className="konten-admin-galeri"></div>
      <div className="background-galeri-logo">
        <img src={logoPersit} alt="Logo Persit" />
      </div>

      <div className="kelola-galeri-content">
        <h2>{isEdit ? "Edit Galeri Kegiatan" : "Kelola Galeri Kegiatan"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-galeri">
          <input
            type="text"
            name="judul"
            value={form.judul}
            onChange={handleChange}
            placeholder="Judul Gambar"
            required
          />
          <input
            type="date"
            name="tanggal_pelaksanaan"
            value={form.tanggal_pelaksanaan}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            name="gambar"
            accept="image/*"
            onChange={handleChange}
          />
          {form.preview && (
            <img src={form.preview} alt="Preview" className="preview-img" />
          )}
          <button type="submit" className="btn-submit-galeri">
            {isEdit ? "Update Galeri" : "Tambah ke Galeri"}
          </button>
        </form>

        <hr />
        <h4>Galeri Tersimpan:</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          {galeri.map((item) => (
            <div key={item.id} className="galeri-item">
              <img
                src={`http://localhost:8000/storage/${item.gambar}`}
                alt={item.judul}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  height: "150px",
                  borderRadius: "6px",
                }}
              />
              <h5>{item.judul}</h5>
              <p><small>{item.tanggal_pelaksanaan}</small></p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  onClick={() => handleEdit(item)}
                  className="btn btn-warning btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="btn-hapus"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
