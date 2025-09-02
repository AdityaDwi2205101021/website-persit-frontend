import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KelolaAnggota from "./pages/admin/KelolaAnggota";
import KelolaStruktur from "./pages/admin/KelolaStruktur";
import ProtectedRoute from "./services/ProtectedRoute";
import DashboardAdmin from "./pages/admin/DashboardAdmin";
import LoginAdmin from "./pages/admin/LoginAdmin";
import KelolaBerita from "./pages/admin/KelolaBerita";
import KelolaGaleri from "./pages/admin/KelolaGaleri";
import KelolaPeta from "./pages/admin/KelolaPeta";
import KelolaSejarah from "./pages/admin/KelolaSejarah";
import KelolaStrukturCabang from "./pages/admin/KelolaStrukturCabang";
import KelolaPimpinanPersit from "./pages/admin/KelolaPimpinanPersit";
import Beranda from "./pages/publik/Beranda";
import PublicLayout from "./layouts/PublicLayout";
import GaleriKegiatan from "./pages/publik/GaleriKegiatan";
import BeritaKegiatan from "./pages/publik/BeritaKegiatan";
import KelolaProfil from "./pages/admin/KelolaProfile";
import KelolaPembinaPersit from "./pages/admin/KelolaPembinaPersit";
import Profile from "./pages/publik/Profile";
import SejarahPersit from "./pages/publik/SejarahPersit";
import DetailSejarah from "./pages/publik/DetailSejarah";
import DetailBerita from "./pages/publik/DetailBerita";
import StrukturOrganisasiTree from "./pages/publik/StrukturOrganisasiTree";
import StrukturRantingTree from "./pages/publik/StrukturRantingTree";
import PimpinanPersit from "./pages/publik/PimpinanPersit";
import Anggota from "./pages/publik/Anggota";
import Keanggotaan from "./pages/publik/Keanggotaan";
import PembinaPersit from "./pages/publik/PembinaPersit";
import VisiMisiPersit from "./pages/publik/VisiMisi";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
        <Route index element={<Beranda />} />
        <Route path="/keanggotaan" element={<Keanggotaan/>}/>
        <Route path="/anggota-summary" element={<Anggota/>} />
        <Route path="/pimpinan-persit" element={<PimpinanPersit />} />
        <Route path="/pembina-persit" element={<PembinaPersit />} />
        <Route path="/struktur-organisasi" element={<StrukturOrganisasiTree />} />
        <Route path="/struktur-ranting" element={<StrukturRantingTree/>} />
        <Route path="/profil" element={<Profile />} />
        <Route path="/galeri" element={<GaleriKegiatan />} />
        <Route path="/berita-kegiatan" element={<BeritaKegiatan />} />
        <Route path="/sejarah" element={<SejarahPersit/>} />
        <Route path="/visimisi" element={<VisiMisiPersit/>} />
        <Route path="/sejarah/:id" element={<DetailSejarah />} />
         <Route path="/berita/:id" element={<DetailBerita />} />
        </Route>
        <Route path="/login" element={<LoginAdmin />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardAdmin /> 
            </ProtectedRoute>}/>
        <Route path="admin/profile" element={<KelolaProfil/>}/>
        <Route path="/admin/berita" element={<KelolaBerita />} />
        <Route path="/admin/galeri" element={<KelolaGaleri />} />
        <Route path="/admin/peta-wilayah" element={<KelolaPeta />} />
        <Route path="/admin/profil-sejarah" element={<KelolaSejarah />} />
        <Route path="/admin/struktur-organisasi" element={<KelolaStruktur />} />
        <Route path="/admin/struktur-cabang" element={<KelolaStrukturCabang />} />
        <Route path="/admin/anggota" element={<KelolaAnggota />} />
        <Route path="/admin/pimpinan-persit" element={<KelolaPimpinanPersit/>}/>
        <Route path="/admin/pembina-persit" element={<KelolaPembinaPersit/>}/>
      </Routes>
    </Router>
  );
}

export default App;
