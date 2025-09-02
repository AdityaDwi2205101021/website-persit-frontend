import React, { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";
import api from "../../services/api";
import "../../components/KelolaStrukturCabang.css";

export default function StrukturCabang() {
  const [form, setForm] = useState({
    id: null,
    tanggal_terakhir_diubah: "",
    foto: null,
    preview: null,
  });
  const [dataRanting, setDataRanting] = useState([]);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/ranting");
      const data = res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : [];
      setDataRanting(data);
    } catch (err) {
      console.error("Gagal ambil data ranting:", err);
      setDataRanting([]);
    }
  };

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
      if (isEdit && form.id) {
        await api.post(`/ranting/${form.id}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        // backend sudah hapus otomatis data lama di store()
        await api.post("/ranting", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setForm({ id: null, tanggal_terakhir_diubah: "", foto: null, preview: null });
      setIsEdit(false);
      fetchData();
    } catch (err) {
      console.error("Gagal simpan data ranting:", err);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

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

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus foto ranting ini?")) return;
    try {
      await api.delete(`/ranting/${id}`);
      fetchData();
      setForm({ id: null, tanggal_terakhir_diubah: "", foto: null, preview: null });
      setIsEdit(false);
    } catch (err) {
      console.error("Gagal hapus ranting:", err);
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="kelola-struktur-cabang-container">
      <AdminSidebar />
      <div className="kelola-struktur-cabang-content">
        <h2>{isEdit ? "Edit Struktur Ranting" : "Kelola Struktur Ranting"}</h2>
       <div className="template-link-ranting-container">
            <a
              href="https://www.canva.com/design/DAGwkJDagno/s4hM3hEkHm4TqW9RxsAoeA/edit?utm_content=DAGwkJDagno&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-template"
            >
              Lihat Template Struktur Organisasi
            </a>
          </div>

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-struktur-cabang">
          <label>Tanggal Terakhir Diubah:</label>
          <input
            type="date"
            name="tanggal_terakhir_diubah"
            value={form.tanggal_terakhir_diubah}
            onChange={handleChange}
            required
          />

          <label>Unggah Foto Struktur Ranting:</label>
          <input type="file" name="foto" accept="image/*" onChange={handleChange} />

          {form.preview && (
            <div className="preview-container">
              <p>Preview Foto:</p>
              <img src={form.preview} alt="Preview" />
            </div>
          )}

          <button type="submit" className="btn-submit">
            {isEdit ? "Update Struktur Ranting" : "Unggah Struktur Ranting"}
          </button>
        </form>

        <hr />

        <h4>Struktur Ranting Tersimpan:</h4>
        {dataRanting.length === 0 ? (
          <p>Belum ada foto struktur ranting.</p>
        ) : (
          <div className="daftar-struktur-ranting">
            {dataRanting.map((item) => (
              <div key={item.id} className="ranting-card">
                <img
                  src={`http://localhost:8000/storage/${item.foto}`}
                  alt={`Struktur Ranting ${item.id}`}
                />
                <p><small>Terakhir diubah: {item.tanggal_terakhir_diubah}</small></p>
                <div className="btn-group">
                  <button onClick={() => handleEdit(item)} className="btn-edit">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="btn-hapus">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
