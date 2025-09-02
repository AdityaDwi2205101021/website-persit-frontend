import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/apiPublic";
import "../../components/BeritaKegiatan.css";

export default function BeritaKegiatan() {
  const [berita, setBerita] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/berita-kegiatan")
      .then((res) => setBerita(res.data))
      .catch((err) => console.error("Gagal ambil berita:", err));
  }, []);

  return (
    <div className="berita-kegiatan-page">
      <div className="B-text">Berita Kegiatan</div>
      <div className="row">
        {berita.map((item) => (
          <div className="col-md-3 mb-5" key={item.id}>
            <div className="berita-card">
              <img
                src={`http://localhost:8000/storage/${item.gambar}`}
                className="card-img-top"
                alt={item.judul}
              />
              <div className="berita-body">
                <h5 className="berita-title">{item.judul}</h5>
                <small className="berita-text">
                  {item.tanggal
                    ? new Date(item.tanggal).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Tanggal tidak tersedia"}
                </small>
                <p className="berita-text">
                  {item.konten
                    ? item.konten.slice(0, 10) + "..."
                    : "Tidak ada isi"}
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate(`/berita/${item.id}`)}
                >
                  Baca Selengkapnya
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
