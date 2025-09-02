import React, { useEffect, useState } from "react";
import apiPublic from "../../services/apiPublic";
import "../../components/StrukturOrganisasi.css";

export default function StrukturOrganisasiPublik() {
  const [foto, setFoto] = useState(null);
  const [tanggal, setTanggal] = useState(null);

  useEffect(() => {
    apiPublic.get("/struktur-organisasi-publik")
      .then(res => {
        const data = res.data;
        setFoto(data.foto); // ambil foto dari object terakhir
        setTanggal(data.tanggal_terakhir_diubah); // ambil tanggal terakhir diubah
      })
      .catch(err => {
        console.error("Gagal ambil foto struktur:", err);
        setFoto(null);
        setTanggal(null);
      });
  }, []);

  return (
    <div className="struktur-organisasi-publik">
      {foto ? (
        <>
          <img
            src={`http://localhost:8000/storage/${foto}`}
            alt="Struktur Organisasi"
            className="foto-struktur-publik"
          />
          <div className="tanggal-terakhir-publik">
            {tanggal ? `Terakhir diubah: ${tanggal}` : "Belum ada tanggal"}
          </div>
        </>
      ) : (
        <p>Memuat data...</p>
      )}
    </div>
  );
}
