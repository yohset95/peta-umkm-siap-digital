# Aturan proyek untuk AI coding assistant

Proyek: **Peta UMKM Siap Digital**, dashboard statis kesiapan digital UMKM kelurahan (prototipe Inovboyo 2026).

## Teknologi
- HTML, CSS, dan JavaScript biasa (ES5-compatible, tanpa framework, tanpa build step, tanpa npm).
- Harus tetap bisa dibuka dengan klik dua kali `index.html` (protokol `file://`). Karena itu data dimuat lewat `<script src="data/data.js">` yang mengisi `window.UMKM_DATA`, **bukan** `fetch()` ke file JSON.
- Library eksternal hanya boleh dari CDN dengan versi dikunci (contoh: Leaflet dari unpkg dengan nomor versi pasti).
- Font: Plus Jakarta Sans dari Google Fonts.

## Struktur dan tanggung jawab file
- `data/data.js` → semua angka dan isi. Ubah data di sini, jangan menulis angka langsung di `app.js`.
- `js/app.js` → logika tampilan. Bagian ditandai `// ---------- RINGKASAN ----------`, `PETA`, `ANTREAN`, `SIMULASI`, `tabs`.
- `css/style.css` → semua gaya. Warna lewat variabel CSS di `:root`; mode gelap di blok `prefers-color-scheme: dark`.
- `index.html` → kerangka 4 menu (`#v-ringkasan`, `#v-peta`, `#v-antrean`, `#v-simulasi`) dan teks statis.

## Aturan wajib
1. **Privasi:** jangan pernah menambahkan nama pemilik usaha, alamat, NIK, nomor rekening, atau koordinat rumah ke file mana pun. Profil memakai kode `UMKM 01`, dst.
2. **Kejujuran data:** angka dari laporan tidak boleh diubah tanpa sumber. Data contoh atau ilustrasi harus diberi label "ilustrasi" di tampilan.
3. `levelCount` di `data.js` harus berjumlah sama dengan `total`.
4. Tampilan harus tetap rapi di lebar HP (±390 px) tanpa scroll horizontal.
5. Semua warna dipakai lewat variabel CSS supaya mode terang dan gelap tetap terbaca.
6. Teks antarmuka dalam Bahasa Indonesia yang sederhana.

## Konsep inti (jangan diubah tanpa diminta)
- Level kesiapan: 1 Belum Formal, 2 Formal Dasar, 3 Didaftarkan/Terdaftar e-Peken, 4 Aktif di e-Peken. Level 1 dan 2 saat ini digabung karena status NIB per UMKM belum tersedia.
- Skor legalitas (NIB, rekening, sertifikat halal, NPWP) dan skor digital (e-Peken, produk tayang, media sosial, pelatihan, pameran), masing-masing total 100.
- Rekomendasi bantuan selalu menyebut instansi penanggung jawab (DPMPTSP, Dinkopdag, Kelurahan, Bank mitra, Baznas, Kampus/agen statistik).

## Setelah mengubah kode
- Buka `index.html` di browser dan cek keempat menu.
- Pastikan tidak ada error di console.
- Cek tampilan di lebar HP.
