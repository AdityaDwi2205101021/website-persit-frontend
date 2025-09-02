import React, { useEffect, useState } from "react";
import api from "../../services/api";
import AdminSidebar from "./AdminSidebar";
import LogoPersit from "../../assets/LogoPersit.png";
import "../../components/KelolaAnggota.css";

export default function KelolaAnggota() {
  const [form, setForm] = useState({
    nama: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    pendidikan_terakhir: "sma",
    jurusan: "",
    nama_suami: "",
    pangkat_nrp: "",
    jumlah_anak: 0,
    pekerjaan: "",
    tanggal_menikah: "",
    alamat: "",
    keterangan: "",
    foto: null,
  });

  const [daftarAnggota, setDaftarAnggota] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await api.get("/anggota");
      setDaftarAnggota(res.data);
    } catch (err) {
      console.error("Gagal fetch data anggota", err.response?.data || err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setForm((prev) => ({ ...prev, foto: file }));
  };

  const resetForm = () => {
    setForm({
      nama: "",
      tempat_lahir: "",
      tanggal_lahir: "",
      pendidikan_terakhir: "sma",
      jurusan: "",
      nama_suami: "",
      pangkat_nrp: "",
      jumlah_anak: "",
      pekerjaan: "",
      tanggal_menikah: "",
      alamat: "",
      keterangan: "",
      foto: null,
    });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null) formData.append(key, value);
    });

    try {
      if (editId) {
        await api.post(`/anggota/${editId}?_method=PUT`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/anggota", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchData();
      resetForm();
      alert("Data anggota berhasil disimpan");
    } catch (err) {
      console.error("Gagal simpan anggota", err.response?.data || err);
      alert(`Gagal simpan anggota: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (anggota) => {
    setForm({ ...anggota, foto: null });
    setEditId(anggota.id);
  };

  const handleHapus = async (id) => {
    if (window.confirm("Yakin ingin menghapus anggota ini?")) {
      try {
        await api.delete(`/anggota/${id}`);
        fetchData();
      } catch (err) {
        console.error("Gagal hapus anggota", err.response?.data || err);
      }
    }
  };

  return (
    <div className="halaman-admin">
      <div className="admin-container">
        <AdminSidebar />
        <div className="admin-content">
          <div className="background-admin-logo">
            <img src={LogoPersit} alt="Logo Besar" />
          </div>

          <div className="admin-box">
            <h2>Kelola Anggota</h2>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              {[
                { label: "Nama", name: "nama", type: "text", required: true },
                { label: "Tempat Lahir", name: "tempat_lahir", type: "text" },
                { label: "Tanggal Lahir", name: "tanggal_lahir", type: "date" },
                { label: "Pekerjaan", name: "pekerjaan", type: "text" },
                { label: "Nama Suami", name: "nama_suami", type: "text" },
                { label: "Pangkat / NRP", name: "pangkat_nrp", type: "text" },
                { label: "Jumlah Anak", name: "jumlah_anak", type: "number" },
                { label: "Tanggal Menikah", name: "tanggal_menikah", type: "date" },
                { label: "Alamat", name: "alamat", type: "textarea" },
                { label: "Keterangan", name: "keterangan", type: "textarea" },
                { label: "Jurusan", name: "jurusan", type: "text" },
              ].map((field) => (
                <div className="admin-form-group" key={field.name}>
                  <label>{field.label}</label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      rows={field.name === "alamat" ? 3 : 2}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      min={field.type === "number" ? 0 : undefined}
                      required={field.required}
                    />
                  )}
                </div>
              ))}

              <div className="admin-form-group">
                <label>Pendidikan Terakhir Istri</label>
                <select
                  name="pendidikan_terakhir"
                  value={form.pendidikan_terakhir}
                  onChange={handleChange}
                >
                  {["smp", "sma", "smk", "d1", "d2", "d3", "d4", "s1", "s2", "s3"].map(
                    (item) => (
                      <option value={item} key={item}>
                        {item.toUpperCase()}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div className="admin-form-group">
                <label>Foto</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>

              <button type="submit" className="admin-btn-submit">
                {editId ? "Simpan Perubahan" : "Tambah Anggota"}
              </button>
            </form>

            <hr />

            <h4>Daftar Anggota</h4>
            {daftarAnggota.length === 0 ? (
              <p>Belum ada data anggota.</p>
            ) : (
              <div className="halaman-admin-card">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Foto</th>
                      <th>Nama</th>
                      <th>TTL</th>
                      <th>Pendidikan</th>
                      <th>Jurusan</th>
                      <th>Nama Suami</th>
                      <th>Pangkat/NRP</th>
                      <th>Jumlah Anak</th>
                      <th>Pekerjaan</th>
                      <th>Tgl Menikah</th>
                      <th>Alamat</th>
                      <th>Keterangan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarAnggota.map((item) => (
                      <tr key={item.id}>
                        <td>
                          {item.foto ? (
                            <img
                              src={`http://localhost:8000/storage/${item.foto}`}
                              alt="Foto"
                              style={{ width: "60px", borderRadius: "6px" }}
                            />
                          ) : (
                            "Tidak ada"
                          )}
                        </td>
                        <td>{item.nama}</td>
                        <td>
                          {item.tempat_lahir} / {item.tanggal_lahir}
                        </td>
                        <td>{item.pendidikan_terakhir?.toUpperCase()}</td>
                        <td>{item.jurusan}</td>
                        <td>{item.nama_suami}</td>
                        <td>{item.pangkat_nrp}</td>
                        <td>{item.jumlah_anak}</td>
                        <td>{item.pekerjaan}</td>
                        <td>{item.tanggal_menikah}</td>
                        <td>{item.alamat}</td>
                        <td>{item.keterangan}</td>
                        <td>
                          <div className="admin-btn-group">
                            <button
                              className="admin-btn-edit"
                              onClick={() => handleEdit(item)}
                            >
                              Edit
                            </button>
                            <button
                              className="admin-btn-hapus"
                              onClick={() => handleHapus(item.id)}
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
