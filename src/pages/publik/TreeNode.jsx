// src/pages/publik/TreeNode.js
import React from "react";
import "../../components/StrukturOrganisasi.css";

export default function TreeNode({ item }) {
  return (
    <div className="tree-item">
      {item.foto ? (
        <img
          src={item.foto}
          alt={item.nama || item.jabatan}
          className="tree-foto"
        />
      ) : (
        <div className="tree-placeholder">Foto</div>
      )}

      <div className="tree-jabatan">{item.jabatan || "Jabatan"}</div>

      <div className="tree-nama">
        {item.nama && item.nama.trim() !== "" ? item.nama : "Belum ada data"}
      </div>
    </div>
  );
}
