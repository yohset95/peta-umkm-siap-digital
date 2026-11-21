# Peta UMKM Siap Digital

Dashboard kesiapan digital UMKM kelurahan untuk pendampingan yang tepat sasaran.
Prototipe untuk Inovboyo 2026 oleh tim **Pojok Statistik** (Telkom University Surabaya × BPS Kota Surabaya).

Data awal: *Laporan Akhir Desa Cantik Kelurahan Jemur Wonosari 2025* (RW 05, 180 UMKM).

---

## Isi dashboard

| Menu | Isi |
|---|---|
| **Ringkasan** | Kartu angka, sebaran level kesiapan, tahapan menuju aktif digital, kesiapan digital awal, jenis usaha, tahun mulai usaha |
| **Peta UMKM** | Titik UMKM berwarna per level; titik bergaris tepi bisa diketuk untuk melihat profil dan rekomendasi bantuan |
| **Antrean Bantuan** | Rekomendasi bantuan dikelompokkan per instansi (DPMPTSP, Dinkopdag, Kelurahan, Baznas) |
| **Coba Hitung Skor** | Simulasi: ubah kondisi UMKM, lalu skor, level, dan rekomendasinya dihitung ulang |

## Struktur folder

```
peta-umkm-siap-digital/
├── index.html      → kerangka halaman dan teks statis (judul, catatan sumber)
├── css/style.css   → tampilan: warna, huruf, tata letak
├── js/app.js       → logika: menggambar grafik, peta, antrean, simulasi skor
├── data/data.js    → SEMUA DATA dashboard (angka, profil, bobot skor)
├── README.md       → file ini
└── AGENTS.md       → aturan proyek untuk AI coding tools
```

Tidak ada framework, tidak perlu `npm install`, tidak ada proses build. Hanya HTML, CSS, dan JavaScript biasa.

## Menjalankan

- **Di laptop:** klik dua kali `index.html`. Semua fitur berjalan tanpa server.
- **Online:** seret seluruh folder ini ke Netlify Drop (app.netlify.com/drop), atau ke tab **Deploys** situs Netlify yang sudah ada untuk memperbarui.

## Mengganti data

Hampir semua perubahan data cukup di **`data/data.js`**:

- `total` dan `levelCount` → jumlah UMKM dan jumlah per level (`levelCount` harus berjumlah sama dengan `total`)
- `kpi`, `funnel`, `digital`, `jenisUsaha`, `tahunMulai` → angka di menu Ringkasan
- `profil` → UMKM yang bisa diketuk di peta (**wajib anonim**)
- `rekomendasi`, `antreanGrup`, `antreanKelompok` → isi menu Antrean Bantuan
- `bobotLegalitas`, `bobotDigital` → bobot skor di menu Coba Hitung Skor

Beberapa teks catatan masih ditulis langsung di `index.html` (misalnya "Basis 180 UMKM…", "17 UMKM yang profil…", nama kelurahan di pilihan Kelurahan). Kalau datanya berganti, ubah juga teks itu.

## Batasan prototipe

- Posisi titik di peta **ilustratif** (dibuat acak tetapi tetap sama setiap dibuka), bukan koordinat asli.
- Level 1 dan 2 digabung karena status NIB per UMKM tidak dipublikasikan di laporan.
- Data disimpan di file, belum ada login, database, atau input dari agen statistik.

## Contoh perintah untuk AI coding tools

Buka folder ini di Cursor, Claude Code, Windsurf, VS Code + Copilot, atau unggah ke Bolt/Lovable, lalu minta misalnya:

1. *"Ganti peta ilustratif dengan peta asli memakai Leaflet dan OpenStreetMap. Tambahkan kolom `lat` dan `lng` di setiap profil pada data/data.js, dan pusatkan peta di Kelurahan Jemur Wonosari, Surabaya."*
2. *"Buat menu baru 'Input Pendataan' berisi formulir untuk agen statistik (nama usaha disamarkan, sektor, NIB, rekening, sertifikat halal, e-Peken, media sosial). Simpan hasilnya di localStorage dan tampilkan di peta."*
3. *"Tambahkan tombol 'Unduh CSV' di menu Antrean Bantuan yang mengekspor daftar per instansi."*
4. *"Pisahkan level 1 dan level 2 berdasarkan kolom `nib` di setiap profil, lalu perbarui grafik dan legenda."*
5. *"Buat dropdown Kelurahan berfungsi: pindahkan data ke `data/jemur-wonosari.js` dan buat contoh `data/kelurahan-lain.js`, lalu muat sesuai pilihan."*

Setelah setiap perubahan, buka `index.html` di browser dan cek keempat menu di layar laptop dan HP.

## Sumber dan privasi

- Laporan Akhir Desa Cantik Kelurahan Jemur Wonosari 2025 (BPS Kota Surabaya).
- Nuryulianingdyah, W., Nukyanto, D. P., & Kayagama, I. (2026). *JIPPMas*, 6(1), 65–77.
- Profil UMKM dianonimkan sesuai UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi. Jangan memasukkan nama, alamat, NIK, atau nomor rekening ke repositori atau situs publik.
