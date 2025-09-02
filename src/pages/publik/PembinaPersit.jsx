import { useEffect, useState } from "react";
import api from "../../services/apiPublic";
import "./PembinaPersit.css"; // ganti file css khusus publik

export default function PembinaPersit() {
  const [pembina, setPembina] = useState([]);

  useEffect(() => {
    api
      .get("/pembina-persit-publik")
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

        setPembina(formatted);
      })
      .catch((err) => console.error("Gagal ambil data pembina:", err));
  }, []);

  return (
    <div className="pembina-publik-container">
      <div className="container position-relative" style={{ zIndex: 1 }}>
        <h2 className="pembina-publik-title">
          PEMBINA PERSIT KARTIKA CHANDRA KIRANA <br />
          CABANG XVII KODIM 0803 KOORCAB REM 081 <br />
          PD V BRAWIJAYA
        </h2>

        <div className="pembina-publik-list">
          {pembina.map((p, index) => (
            <div
              key={p.id || `pembina-${index}`}
              className="pembina-card animate__animated animate__fadeInUp"
            >
              <div className="pembina-publik-card-body">
                <img
                  src={p.foto}
                  alt={p.nama}
                  className="pembina-publik-foto"
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
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
