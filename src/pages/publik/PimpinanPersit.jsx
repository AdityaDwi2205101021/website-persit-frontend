import { useEffect, useState } from "react";
import api from "../../services/apiPublic";
import "./PimpinanPersit.css";

export default function PimpinanPersit() {

  const [pimpinan, setPimpinan] = useState([]);

  useEffect(() => {
    api.get("/pimpinan-persit-publik")
      .then((res) => {
        const dataArray = res.data.data || [];

        // Urutkan dari lama → baru
        const sorted = dataArray.sort(
          (a, b) => new Date(a.tanggal_mulai) - new Date(b.tanggal_mulai)
        );

        const formatted = sorted.map((item) => ({
          ...item,
          foto: item.foto?.startsWith("http")
            ? item.foto
            : `http://localhost:8000/storage/${item.foto}`,
        }));

        setPimpinan(formatted);
      })
      .catch((err) => console.error("Gagal ambil data pimpinan:", err));
  }, []);


  return (
    <div className="pimpinan-container">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <h2>
          KETUA PERSIT KARTIKA CHANDRA KIRANA <br/>CABANG XVII KODIM 0803 KOORCAB REM 081<br/> PD V BRAWIJAYA 
        </h2>

        <div className="pimpinan-list">
          {pimpinan.map((p) => (
            <div key={p.id} className="pimpinan-card animate__animated animate__fadeInUp">
              <div className="pimpinan-card-body">
                <img
                  src={p.foto}
                  alt={p.nama}
                  className="pimpinan-foto"
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  onError={(e) => {
                    e.target.src = "/default-image.jpg";
                  }}
                />
                <h5 className="pembina-publik-nama">{p.nama}</h5>
                <p className="pembina-publik-periode">
                  Mulai: {new Date(p.tanggal_mulai).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                    <br />
                    Berakhir:{" "}
                    {p.tanggal_berakhir
                      ? new Date(p.tanggal_berakhir).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "Sekarang"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
