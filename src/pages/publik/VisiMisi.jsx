import { useEffect, useState } from "react";
import apiPublic from "../../services/apiPublic";
import { Link } from "react-router-dom";
import "../../components/VisiMisi.css";

export default function VisiMisiPersit() {
  const [visiMisi, setVisiMisi] = useState([]);

  useEffect(() => {
    let isMounted = true;
    apiPublic
      .get("/visi-misi-publik")
      .then((res) => {
        if (isMounted) setVisiMisi(res.data);
      })
      .catch((err) => console.error("Gagal ambil visi misi:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="visimisi-page">
      {/* Konten utama */}
      <div className="visimisi-content-wrapper">
        <div className="visimisi-publik-content">
          <div className="text-mb-4">
            <h2 className="mt-2 fw-bold">Visi & Misi Persit</h2>
            <p className="VM-text">
              Persit Kartika Chandra Kirana memiliki visi dan misi yang menjadi
              pedoman bagi seluruh anggota dalam menjalankan perannya sebagai
              organisasi istri prajurit TNI AD.
            </p>
          </div>

          {visiMisi.length > 0 ? (
            visiMisi.map((item) => (
              <div className="visimisi-publik-box mb-4" key={item.id}>
                <h3>{item.judul}</h3>
                <small className="text-muted">
                  {item.updated_at
                    ? new Date(item.updated_at).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"}
                </small>
                <p style={{ whiteSpace: "pre-line" }}>
                  {item.isi
                    ? item.isi.slice(0, 300) +
                      (item.isi.length > 300 ? "..." : "")
                    : "Tidak ada isi"}
                </p>

                {item.gambar && (
                  <img
                    src={`http://localhost:8000/storage/${item.gambar}`}
                    alt={item.judul}
                    className="visimisi-publik-img"
                  />
                )}

                <div className="mt-2">
                  <Link
                    to={`/visi-misi/${item.id}`}
                    className="btn btn-outline-success btn-sm"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="visimisi-default">
              <h4>Visi</h4>
              <p>
                Menjadi organisasi istri prajurit TNI AD yang tangguh,
                berkarakter, serta mampu mendukung tugas suami dan memberikan
                kontribusi positif bagi keluarga, masyarakat, bangsa, dan negara.
              </p>

              <h4>Misi</h4>
              <p>
               
                Meningkatkan keimanan dan ketakwaan kepada Tuhan Yang Maha Esa.
                <br/>
                Membina persaudaraan dan solidaritas antar anggota.
                <br/>
                Menumbuhkan kepedulian sosial dan meningkatkan peran dalam
                kehidupan bermasyarakat.
                <br/>
                Mendukung tugas pokok prajurit TNI AD melalui kegiatan yang
                positif.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
