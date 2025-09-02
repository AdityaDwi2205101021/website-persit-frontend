import React, { useEffect, useState } from "react";
import api from "../../services/api"; // ⬅ ganti axios langsung dengan api.js
import AdminSidebar from "./AdminSidebar";
import "../../components/KelolaPimpinanPersit.css";
import LogoPersit from '../../assets/LogoPersit.png';

export default function KelolaPimpinanPersit() {
  const [form, setForm] = useState({
    id: null, // untuk edit
    nama: "",
    tanggal_mulai: "",
    tanggal_berakhir: "",
    foto: null,
  });
  const [pimpinanList, setPimpinanList] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.get("/pimpinan-persit");
      setPimpinanList(res.data.data || []);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach((key) => {
      if (form[key] && key !== "id") data.append(key, form[key]);
    });

    try {
      if (form.id) {
        // Edit
        await api.post(`/pimpinan-persit/${form.id}?_method=PUT`, data);
      } else {
        // Tambah baru
        await api.post("/pimpinan-persit", data);
      }
      fetchData();
      setForm({ id: null, nama: "", tanggal_mulai: "", tanggal_berakhir: "", foto: null });
    } catch (err) {
      console.error("Gagal simpan:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus pimpinan ini?")) return;
    try {
      await api.delete(`/pimpinan-persit/${id}`);
      fetchData();
    } catch (err) {
      console.error("Gagal hapus:", err);
    }
  };

  const handleEdit = (p) => {
    setForm({
      id: p.id,
      nama: p.nama,
      tanggal_mulai: p.tanggal_mulai,
      tanggal_berakhir: p.tanggal_berakhir || "",
      foto: null,
    });
  };

  return (
    <div className="kelola-pimpinan-container">
      <AdminSidebar />
      <div className="konten-admin-pimpinan"></div>
      <div className="background-pimpinan-logo">
        <img src={LogoPersit} alt="Logo Persit" />
      </div>

      <div className="kelola-pimpinan-content">
        <h2>Kelola Foto Pimpinan Persit</h2>
        
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-pimpinan">
          <input
            name="nama"
            type="text"
            placeholder="Nama"
            value={form.nama}
            onChange={handleChange}
            required
          />
          <input
            name="tanggal_mulai"
            type="date"
            value={form.tanggal_mulai}
            onChange={handleChange}
            required
          />
          <input
            name="tanggal_berakhir"
            type="date"
            value={form.tanggal_berakhir}
            onChange={handleChange}
          />
          <input
            name="foto"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
          {form.foto && (
            <img
              src={URL.createObjectURL(form.foto)}
              alt="Preview"
              className="preview-img"
            />
          )}
          <button type="submit" className="btn-submit-pimpinan">
            {form.id ? "Update" : "Simpan"}
          </button>
        </form>

        <hr />

        <div className="pimpinan-list">
          {pimpinanList.map((p, idx) => (
            <div className="pimpinan-item" key={idx}>
             <div className="pimpinan-item">
              {p.foto && (
                <img
                  src={`http://localhost:8000/storage/${p.foto}`}
                  alt="Foto Pimpinan"
                  className="preview-img"
                />
              )}
              <div className="pimpinan-info">
               <h4>{p.nama}</h4>
              <p>{p.tanggal_mulai} - {p.tanggal_berakhir || "Sekarang"}</p>
              <div className="pimpinan-actions">
                <button onClick={() => handleEdit(p)} className="btn-edit">Edit</button>
                <button onClick={() => handleDelete(p.id)} className="btn-delete">Hapus</button>
              </div>
            </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
