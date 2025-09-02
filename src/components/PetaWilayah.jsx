import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../services/api"; // pastikan ini sama seperti di admin

// Icon custom biar gak error di marker
const markerIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function PetaPublik() {
  const [koordinat, setKoordinat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/peta-wilayah")
      .then((res) => {
        setKoordinat(res.data); // pastikan formatnya sama kayak di admin
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal ambil data peta:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading peta...</p>;
  }

  return (
    <MapContainer
      center={[-7.629, 111.523]} // posisi default Madiun
      zoom={13}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {koordinat.map((item, index) => (
        <Marker
          key={index}
          position={[item.latitude, item.longitude]}
          icon={markerIcon}
        >
          <Popup>{item.nama_lokasi}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
