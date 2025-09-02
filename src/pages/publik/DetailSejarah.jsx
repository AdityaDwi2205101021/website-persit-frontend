import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/apiPublic";

export default function DetailSejarah() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    api
      .get(`/sejarah/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error("Gagal ambil detail sejarah:", err));
  }, [id]);

  if (!data) return <div className="container mt-5">Memuat...</div>;

  const fotoSrc =
    data.foto && data.foto !== "null"
      ? `http://localhost:8000/storage/sejarah/${data.foto}`
      : "/default-image.jpg"; // fallback jika tidak ada foto

  return (
    <div className="container mt-0">
      <h2 className="mb-4 text-center">{data.judul}</h2>
      <img
        src={fotoSrc}
        alt={data.judul}
        className="img-fluid mb-4"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/default-image.jpg"; // ganti ke gambar default jika error
        }}
      />
      <p>{data.isi}</p>
    </div>
  );
}
