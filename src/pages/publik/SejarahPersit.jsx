import { useEffect, useState } from "react";
import apiPublic from "../../services/apiPublic";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../components/Sejarah.css";

export default function SejarahPersit() {
  const [sejarah, setSejarah] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    apiPublic
      .get("/sejarah-publik")
      .then((res) => {
        if (isMounted) setSejarah(res.data);
      })
      .catch((err) => console.error("Gagal ambil sejarah:", err));
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="sejarah-page">
      {/* Background teks miring di luar konten utama */}
      <div className="sejarah-bg-text">
        {Array(50).fill(
          <div className="sejarah-bg-line">
            {Array(30).fill("SEJARAH PERSIT KODIM MADIUN ").join("")}
          </div>
        )}
      </div>

      {/* Konten utama */}
      <div className="sejarah-content-wrapper">
        <div className="sejarah-publik-content">
          <div className="text-mb-4">
            <h2 className="mt-2 fw-bold">Sejarah Persit</h2>
            <p className="S-text">Organisasi istri prajurit TNI AD Persit Kartika Chandra Kirana pada awalnya bernama Persatuan Kaum Ibu Tentara (PKIT) lahir di tengah-tengah perjuangan bangsa Indonesia yang dijiwai semangat dan cita-cita luhur untuk merebut kemerdekaan. Meskipun pada saat itu belum memiliki wadah organisasi, tetapi para istri prajurit telah berhasil memberikan dorongan semangat kepada para prajurit.

Lahirnya organisasi istri prajurit didorong oleh kesadaran yang timbul di kalangan istri prajurit sebagai pendamping suami yang sedang berjuang menegakkan dan mempertahankan proklamasi kemerdekaan bangsanya.

Di daerah Jawa Barat, BKR/TKR yang kemudian menjadi TNI AD menghadapi banyak ancaman.< br/> <br/>Markas Komandemen TKR yang berkedudukan di Purwakarta menjadi pusat kegiatan pengerahan prajurit. Komandan Komandemen pada saat itu adalah Mayor Jenderal Didi Kartasasmita dan Kepala Stafnya adalah Kolonel Hidayat.

Kenyataan yang dihadapi pada saat itu sangatlah menyentuh hati nurani. Banyaknya prajurit yang gugur dan terluka di RS Purwakarta karena tempat di rumah sakit tersebut tidak mencukupi. Kenyataan inilah yang menimbulkan inisiatif di hati Ibu Ratu Aminah Hidayat (isteri dari Kolonel Hidayat, Kepala Staf Komandemen I) untuk mengumpulkan para istri perwira Markas Komandemen I di kediamannya di daerah Purwakarta.<br/><br/>

Dalam pertemuan yang dilaksanakan pada tanggal 3 April 1946 Ibu Ratu Aminah Hidayat mengutarakan pemikiran dan hasratnya untuk menggerakkan para Isteri Prajurit melakukan sesuatu guna membantu prajurit di dalam melaksanakan tugasnya.

Sejak itulah para istri prajurit yang berdomisili di Purwakarta mulai memikirkan untuk membentuk suatu wadah bagi kelompok istri prajurit yang kemudian dinamakan Persatuan Kaum Ibu Tentara (PKIT) yang adalah cikal bakal Persit Kartika Chandra Kirana.

Untuk menghadapi tantangan perjuangan yang semakin berat, maka pada tanggal 15 Agustus 1946 PKIT mengadakan konferensi di Garut, Jawa Barat guna mempersatukan organisasi-organisasi istri tentara yang ada di daerah-daerah.

Dalam konferensi tersebut dibahas masalah anggaran dasar dan anggaran rumah tangga serta perubahan nama organisasi yang semula PKIT diubah menjadi Persatuan Istri Tentara (Persit).<br/><br/>

Dalam periode 1947 kegiatan para istri prajurit antara lain menjahit, membuat tanda-tanda pangkat pejuang, juru rawat dalam Palang Merah Indonesia, memberikan perawatan dan pertolongan pejuang yang luka atau gugur di medan bakti, tugas menyelidiki kekuatan dan lokasi musuh, suatu tugas yang tidak ringan dan penuh dengan resiko tertangkap oleh pihak lawan.

Selanjutnya guna membangun soliditas organisasi, penyelenggaraan konferensi dilaksanakan secara berkesinambungan, dan memakai nama Kongres, Rapat kerja hingga musyawarah Pusat. Pada tahun 1962 ditetapkan Hymne dan Mars Persit Kartika Chandra Kirana yang diciptakan oleh Letkol Inf M. Adil Tampubolon.<br/><br/>

Pada tahun 1964, Kongres Darurat dipimpin oleh Ny. A. Yani selaku Ketua Umum DPP Persit yang menghasilkan dua keputusan penting:<br/> (1) Persatuan Istri Tentara diubah menjadi Persatuan Istri Prajurit Kartika Chandra Kirana (Persit Kartika Chandra Kirana); <br/> (2) Pemimpin dijabat oleh istri pemimpin TNI Angkatan Darat secara fungsional. Pada tahun 1967, ditetapkan lambang Persit Kartika Chandra Kirana yang merupakan hasil karya Kapten Caj Tranggono.<br/><br/>

Dalam perjalanan sejarahnya Persit Kartika Chandra Kirana pernah menerbitkan majalah Mekar pada tahun 1954. Tahun 1983 Persit Kartika Chandra Kirana kembali menggiatkan media penerangan kepada anggotanya melalui penerbitan majalah Kartika Kencana yang berlangsung hingga saat ini.

Pada tanggal 7 Juli 1967, Ketua Umum Persit Kartika Chandra Kirana yang dijabat oleh Ibu Siti Hartinah Soeharto, didirikan Yayasan Kartika Jaya. Kala itu masing-masing yayasan dijabat secara fungsional oleh Ketua dan Wakil Ketua Persit Kartika Chandra Kirana di masing - masing tingkat kepengurusan Gabungan, Daerah dan Cabang Berdiri Sendiri. Tahun 1996, Ibu R. Hartono, Ketua Umum Persit Kartika Chandra Kirana dan dibantu oleh sebuah tim yang diketuai Ibu Agum Gumelar, kedudukan Yayasan Kartika Jaya yang dikelola oleh PG, PD dan PCBS dilebur ke dalam satu wadah tunggal dengan nama Yayasan Kartika Jaya yang langsung berada di bawah naungan Persit Kartika Chandra Kirana Pengurus Pusat. Sejak 16 Februari 2005, maka jabatan Ketua dan Wakil Ketua Yayasan tidak lagi dijabat secara fungsional oleh Ketua dan Wakil Ketua Umum Persit Kartika Chandra Kirana dan selanjutnya Yayasan Kartika Jaya menjadi badan hukum yang berdiri sendiri.<br/><br/>

Pada tanggal 2 April 2002, Ibu Andy E. Sutarto selaku Ketua Umum Persit Kartika Chandra Kirana, mendirikan Yayasan Yatim, Yatim Piatu “Kartika Asih”. Yang khususnya memberikan beasiswa bagi putra-putri prajurit yang gugur di dalam melaksanakan tugas, sebagai wujud kepedulian dan rasa tanggung jawab Persit Kartika Chandra Kirana terhadap masa depan generasi penerus bangsa.<br/><br/>
Pada tahun 2004 atas prakarsa Ibu drg. Nora Ryamizard selaku Ketua Umum Persit Kartika Chandra Kirana gedung Balai Kartini dan Kartika Eka Paksi dibongkar dan dibangun kembali. Selanjutnya gedung siap digunakan pada tahun 2005 - 2020. Kemudian awal tahun 2023, gedung Balai Kartini dalam tahap renovasi dan saat ini Balai Kartini sudah kembali beroperasi.<br/><br/>

Pada tanggal 10 Januari 2007, Kasad Jenderal TNI Djoko Santoso selaku Pembina Utama Persit Kartika Chandra Kirana meresmikan “Wisma Kartika” sebagai kantor Persit Kartika Chandra Kirana Pengurus Pusat, Balai Keterampilan Kartika dan Griya Kebugaran Kartika.<br/><br/>

Pada tahun 2014, atas prakarsa Ibu Wanti Budiman selaku Ketua Umum Persit Kartika Chandra Kirana menetapkan seragam olah raga untuk anggota Persit Kartika Chandra Kirana seluruh Indonesia dan mendirikan Beka Resto Balai Kartini.<br/><br/>

Pada tanggal 17 Februari 2015, Ibu Nenny Gatot Nurmantyo selaku Ketua Umum Persit Kartika Chandra Kirana memimpin Mupus XI Persit Kartika Chandra Kirana dan menetapkan perubahan waktu pelaksanaan Mupus dari 5 tahun menjadi 3 tahun.<br/><br/>

Pada tanggal 7 Februari 2018, Ibu Sita Mulyono selaku Ketua Umum Persit Kartika Chandra Kirana memimpin Mupus XII Persit Kartika Chandra Kirana Tahun 2018 dan menetapkan perubahan waktu pelaksanaan Mupus semula 3 tahun, kembali menjadi 5 tahun.<br/><br/>

Pada tanggal 18 Juli 2023, Ibu Rahma Dudung Abdurachman selaku Ketua Umum Persit Kartika Chandra Kirana memimpin Mupus XIII Persit Kartika Chandra Kirana Tahun 2023.<br/>
</p>
          </div>

          {sejarah.length > 0 ? (
            sejarah.map((item) => (
              <div className="sejarah-publik-box mb-4" key={item.id}>
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
                    className="sejarah-publik-img"
                  />
                )}

                <div className="mt-2">
                  <Link
                    to={`/sejarah/${item.id}`}
                    className="btn btn-outline-success btn-sm"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center">
              <p>Demikian sejarah singkat Persit Kartika Chandra Kirana sejak kelahirannya pada tanggal 3 April 1946 hingga saat ini</p>
            </div>
          )}
          <div className="sejarah-publiks-sidebar">
          <button className="sejarah-btn"
                  onClick={() => navigate(`/profil`)}
                >
                  KEMBALI
                </button>
        </div>
        </div>
      </div>
    </div>
  );
}
