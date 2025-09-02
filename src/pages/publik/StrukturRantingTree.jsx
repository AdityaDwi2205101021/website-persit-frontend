import React, { useEffect, useState } from "react";
import apiPublic from "../../services/apiPublic";
import "../../components/StrukturRanting.css";

export default function StrukturRantingPublik() {
  const [foto, setFoto] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiPublic.get("/ranting-publik")
      .then((res) => {
        const data = res.data;
        if (data) {
          setFoto(data.foto || null);
          setTanggal(data.tanggal_terakhir_diubah || null);
        }
      })
      .catch((err) => {
        console.error("Gagal ambil foto ranting:", err);
        setFoto(null);
        setTanggal(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="struktur-ranting-publik">
      {loading ? (
        <p>Memuat data...</p>
      ) : foto ? (
        <>
          <img
            src={`http://localhost:8000/storage/${foto}`}
            alt="Struktur Ranting"
            className="foto-struktur-ranting-publik"
          />
          <div className="tanggal-ranting-publik">
            {tanggal ? `Terakhir diubah: ${tanggal}` : "Belum ada tanggal"}
          </div>
        </>
      ) : (
        <p>Belum ada data struktur ranting.</p>
      )}
    </div>
  );
}
