import { useEffect, useState } from "react";
import api from "../../services/apiPublic";
import { Pie, Bar } from "react-chartjs-2";
import "chart.js/auto";

import "./StatistikAnggota.css";

export default function StatistikAnggota() {
  const [data, setData] = useState(null);


  useEffect(() => {
    api.get("/anggota-summary")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Gagal ambil data statistik:", err));
  }, []);

  if (!data) return <p>Loading...</p>;

  // Pie chart: pendidikan terakhir (SMA, SMK, Diploma, Sarjana)
  const pieData = {
    labels: ["SMA", "SMK", "Diploma", "Sarjana"],
    datasets: [
      {
        label: "Pendidikan Terakhir",
        data: [
          data.pendidikan.sma,
          data.pendidikan.smk,
          data.pendidikan.diploma,
          data.pendidikan.sarjana,
        ],
        backgroundColor: ["#FF6384", "#FFCE56", "#9966FF", "#4BC0C0"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  // Bar chart: total anggota, bekerja, jumlah anak (angka asli)
  const barData = {
    labels: ["Total Anggota", "Bekerja", "Jumlah Anak"],
    datasets: [
      {
        label: "Jumlah",
        data: [data.total_anggota, data.total_bekerja, data.total_anak],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.parsed.y; // tampilkan jumlah asli
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 500,
        ticks: {
          stepSize: 10, // jarak sumbu Y per 10
        },
      },
    },
  };

  return (
    <div className="statistik-page">
      <h2>Statistik Anggota Persit</h2>

      <div className="statistik-cards">
        <div className="card">
          <h3>Total Anggota</h3>
          <p>{data.total_anggota}</p>
        </div>
        <div className="card">
          <h3>Total Bekerja</h3>
          <p>{data.total_bekerja}</p>
        </div>
        <div className="card">
          <h3>Total Anak</h3>
          <p>{data.total_anak}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h3>Distribusi Pendidikan</h3>
          <Pie data={pieData} />
        </div>
        <div className="chart">
          <h4>Perbandingan Total</h4>
          <Bar data={barData} options={barOptions}/>
        </div>
      </div>
    </div>
  );
}
