import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import api from "../../services/api";
import "../../components/KelolaStruktur.css";

export default function KelolaStruktur() {
  const [form, setForm] = useState({
    id: null,
    tanggal_terakhir_diubah: "",
    foto: null,
    preview: null,
  });
  const [strukturData, setStrukturData] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  // Ambil data struktur
  const fetchData = async () => {
    try {
      const res = await api.get("/struktur-foto");
      // Kalau backend cuma mengembalikan 1 foto, ubah jadi array
      const data = res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : [];
      setStrukturData(data);
    } catch (err) {
      console.error("Gagal ambil data struktur:", err);
      setStrukturData([]);
    }
  };

  // Handle perubahan form
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto" && files[0]) {
      setForm((prev) => ({
        ...prev,
        foto: files[0],
        preview: URL.createObjectURL(files[0]),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.tanggal_terakhir_diubah) {
      alert("Tanggal terakhir diubah wajib diisi.");
      return;
    }

    const formData = new FormData();
    if (form.foto) formData.append("foto", form.foto);
    formData.append("tanggal_terakhir_diubah", form.tanggal_terakhir_diubah);

    try {
      if (isEdit) {
        await api.post(`/struktur-foto/${form.id}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // Hapus foto lama kalau ada
        if (strukturData.length > 0) {
          await api.delete(`/struktur-foto/${strukturData[0].id}`);
        }
        await api.post("/struktur-foto", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ id: null, tanggal_terakhir_diubah: "", foto: null, preview: null });
      setIsEdit(false);
      fetchData();
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  // Edit foto
  const handleEdit = (item) => {
    setForm({
      id: item.id,
      tanggal_terakhir_diubah: item.tanggal_terakhir_diubah || "",
      foto: null,
      preview: item.foto ? `http://localhost:8000/storage/${item.foto}` : null,
    });
    setIsEdit(true);
    window.scrollTo(0, 0);
  };

  // Hapus foto
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus foto ini?")) return;
    try {
      await api.delete(`/struktur-foto/${id}`);
      fetchData();
      setForm({ id: null, tanggal_terakhir_diubah: "", foto: null, preview: null });
      setIsEdit(false);
    } catch (err) {
      console.error("Gagal menghapus:", err);
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="kelola-galeri-container">
      <AdminSidebar />
      <div className="kelola-galeri-content">
        <h2>{isEdit ? "Edit Struktur Organisasi" : "Kelola Struktur Organisasi"}</h2>

          <div className="template-link-container">
            <a
              href="https://www.canva.com/design/DAGwkJDagno/s4hM3hEkHm4TqW9RxsAoeA/edit?utm_content=DAGwkJDagno&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-template"
            >
              Lihat Template Struktur Organisasi
            </a>
          </div>

        {/* Form upload */}
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-galeri">
          <label>Tanggal Terakhir Diubah:</label>
          <input
            type="date"
            name="tanggal_terakhir_diubah"
            value={form.tanggal_terakhir_diubah}
            onChange={handleChange}
            required
          />
          <label>Unggah Foto Struktur:</label>
          <input
            type="file"
            name="foto"
            accept="image/*"
            onChange={handleChange}
          />
          {form.preview && (
            <div className="preview-container">
              <p>Preview Foto:</p>
              <img src={form.preview} alt="Preview" className="preview-img" />
            </div>
          )}
          <button type="submit" className="btn-submit-galeri">
            {isEdit ? "Update Struktur" : "Unggah Struktur"}
          </button>
        </form>

        <hr />

        {/* Galeri foto */}
        <h4>Struktur Organisasi Tersimpan:</h4>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          {strukturData.length === 0 && <p>Belum ada foto struktur organisasi.</p>}
          {strukturData.map((item) => (
            <div key={item.id} className="galeri-item">
              <img
                src={`http://localhost:8000/storage/${item.foto}`}
                alt={`Struktur ${item.id}`}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  height: "150px",
                  borderRadius: "6px",
                }}
              />
              <p><small>Terakhir diubah: {item.tanggal_terakhir_diubah}</small></p>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleEdit(item)} className="btn btn-warning btn-sm">
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-hapus">
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
