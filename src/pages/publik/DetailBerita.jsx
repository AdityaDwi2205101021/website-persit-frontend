import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/apiPublic";
import "../../components/DetailBerita.css";

export default function DetailBerita() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);

  useEffect(() => {
    api
      .get(`/berita/${id}`)
      .then((res) => setBerita(res.data))
      .catch((err) => console.error("Gagal ambil detail berita:", err));
  }, [id]);

  if (!berita) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  return (
    <div className="detail-berita-container">
      <div className="detail-berita-card">
        <h2 className="detail-judul">{berita.judul}</h2>
        <img
          src={`http://localhost:8000/storage/${berita.gambar}`}
          alt={berita.judul}
          className="detail-gambar"
        />
        <p className="detail-tanggal">
          {berita.updated_at
            ? new Date(berita.updated_at).toLocaleDateString("id-ID", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            : "Tanggal tidak tersedia"}
        </p>
        <p className="detail-konten">{berita.konten}</p>
      </div>
    </div>
  );
}
