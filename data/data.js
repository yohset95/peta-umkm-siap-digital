/*
 * DATA DASHBOARD — Peta UMKM Siap Digital
 * ---------------------------------------------------------------
 * Semua angka dan isi dashboard ada di file ini. Untuk mengganti data
 * (kelurahan lain, data terbaru), cukup ubah file ini; app.js tidak perlu disentuh.
 * Sumber: Laporan Akhir Desa Cantik Kelurahan Jemur Wonosari 2025.
 * Profil UMKM sudah dianonimkan (UU No. 27/2022 tentang PDP). Jangan masukkan nama, alamat, atau NIK.
 */
window.UMKM_DATA = {
  kelurahan: "Jemur Wonosari",
  wilayah: "RW 05",
  tahun: 2025,

  // Jumlah UMKM yang menjadi basis dashboard
  total: 180,

  // Jumlah UMKM per level kesiapan (harus berjumlah = total)
  levelCount: {1:130, 3:46, 4:4},

  // Nama, warna, dan deskripsi tiap level (warna memakai variabel CSS di style.css)
  levels: {
  1:{name:'Belum terjangkau digital', short:'Level 1–2', c:'var(--l1)', s:'var(--l1s)', d:'Belum didaftarkan ke e-Peken; sebagian besar belum ber-NIB'},
  3:{name:'Didaftarkan e-Peken', short:'Level 3', c:'var(--l3)', s:'var(--l3s)', d:'Difasilitasi daftar e-Peken, produk belum tayang'},
  4:{name:'Aktif di e-Peken', short:'Level 4', c:'var(--l4)', s:'var(--l4s)', d:'Produk sudah tayang, siap bertransaksi'}
},

  // Kartu angka di menu Ringkasan
  kpi: {
    eRegistered: 50,       // didaftarkan ke e-Peken
    productLive: 4,        // produk tayang di e-Peken
    socialMediaPct: 3,     // perkiraan % pakai media sosial
    recommendations: 15    // UMKM dengan rekomendasi bantuan tercatat
  },

  // Batang "Tahapan menuju aktif digital": [label, nilai]
  funnel: [["Terdata", 180], ["Didaftarkan e-Peken", 50], ["Produk tayang", 4]],

  // Batang "Kesiapan digital awal" (persen perkiraan): [label, nilai, teks tampilan]
  digital: [
    ["Punya tempat jualan tetap", 10, "±10%"],
    ["Pernah ikut pameran", 3, "±3%"],
    ["Pakai media sosial", 3, "±3%"],
    ["Terdaftar marketplace", 0.6, "≈0%"]
  ],

  // Jenis usaha terbanyak: [label, jumlah]
  jenisUsaha: [["Toko kelontong", 27], ["Warung kopi", 12], ["Warung nasi", 9], ["Laundry", 6]],

  // Tahun mulai usaha: [kelompok, jumlah]; "highlight" diberi warna berbeda
  tahunMulai: [["< 2000", 25], ["2000–09", 32], ["2010–14", 22], ["2015–19", 31], ["2020–22", 27], ["2023", 19], ["2024", 18], ["2025*", 6]],
  tahunHighlight: "2023",

  // Jenis rekomendasi bantuan dan instansi penanggung jawab
  rekomendasi: {
  nib:{t:'Pendampingan pengurusan NIB', to:'DPMPTSP'},
  qris:{t:'Pendampingan pembuatan QRIS', to:'Bank Jatim'},
  halal:{t:'Pendampingan sertifikat halal', to:'Dinkopdag'},
  epeken:{t:'Pendampingan pendaftaran e-Peken', to:'Dinkopdag'},
  paten:{t:'Pendampingan hak paten', to:'Dinkopdag'},
  bakery:{t:'Pelatihan bakery', to:'Kelurahan'},
  bazar:{t:'Fasilitasi ikut bazar Pemkot Surabaya', to:'Kelurahan'},
  rombong:{t:'Bantuan rombong', to:'Baznas Kota Surabaya'}
},

  // Profil UMKM anonim (hasil forum musyawarah kelurahan). r = daftar kunci rekomendasi di atas.
  profil: [
  {p:'Kue basah', y:2023, k:'Rp1–2 juta', w:2, halal:true, qris:true, r:['bakery','nib','paten','epeken']},
  {p:'Kue basah', y:2017, k:'Rp1–2 juta', w:2, halal:false, qris:false, r:['bakery','nib','halal','epeken']},
  {p:'Pakaian', y:2024, k:'< Rp1 juta', w:1, halal:false, qris:false, r:['nib','halal','epeken']},
  {p:'Sinom', y:2015, k:'Rp1–2 juta', w:2, halal:false, qris:false, r:['nib','halal','epeken']},
  {p:'Dimsum dan tahu bakso', y:2022, k:'Rp1–2 juta', w:2, halal:true, qris:true, r:['bazar','nib','epeken','paten']},
  {p:'Es teh', y:2024, k:'< Rp1 juta', w:1, halal:false, qris:false, r:['nib','halal','epeken']},
  {p:'Soto ayam', y:1995, k:'< Rp1 juta', w:3, halal:false, qris:true, r:['nib','halal','epeken']},
  {p:'Kopi', y:2013, k:'Rp1–2 juta', w:1, halal:false, qris:true, r:['nib','halal','epeken']},
  {p:'Makanan', y:2004, k:'> Rp2 juta', w:2, halal:true, qris:true, r:['epeken','nib','paten']},
  {p:'Makanan', y:2025, k:'< Rp1 juta', w:1, halal:false, qris:false, r:['nib','halal','epeken']},
  {p:'Saridele', y:2020, k:'< Rp1 juta', w:1, halal:false, qris:false, r:['nib','halal','epeken']},
  {p:'Dessert', y:2023, k:'Rp1–2 juta', w:2, halal:false, qris:false, r:['nib','halal','epeken']},
  {p:'Makanan', y:2023, k:'Rp1–2 juta', w:1, halal:false, qris:false, r:['nib','halal','epeken']},
  {p:'Makanan dan minuman', y:2024, k:'Rp1–2 juta', w:2, halal:false, r:['nib','halal','epeken']},
  {p:'Gorengan', y:2011, k:'Rp1–2 juta', w:1, halal:false, r:['nib','halal','epeken']},
  {p:'Es teler', y:null, k:'tidak dipublikasikan', w:null, halal:null, gamis:true, r:['rombong']},
  {p:'Gorengan', y:null, k:'tidak dipublikasikan', w:null, halal:null, gamis:true, r:['rombong']}
],

  // Kartu ringkasan di menu Antrean Bantuan
  antreanGrup: [
  {to:'DPMPTSP', t:'Pengurusan NIB', n:15},
  {to:'Dinkopdag', t:'Daftar e-Peken, sertifikat halal, hak paten, pantau transaksi', n:15},
  {to:'Kelurahan', t:'Edukasi menayangkan produk, pelatihan, bazar', n:3},
  {to:'Baznas Kota Surabaya', t:'Bantuan rombong', n:2}
],

  // Baris antrean yang mewakili kelompok UMKM (bukan per UMKM)
  antreanKelompok: [
    { code: "46 UMKM", p: "Didaftarkan e-Peken, produk belum tayang", level: 3, items: [{ t: "Edukasi menayangkan produk di peken.surabaya.go.id", to: "Kelurahan" }] },
    { code: "4 UMKM", p: "Produk sudah tayang di e-Peken", level: 4, items: [{ t: "Dorong transaksi dan pantau data penjualan", to: "Dinkopdag" }] }
  ],

  // Bobot skor di menu Coba Hitung Skor (usulan awal, total masing-masing = 100)
  // Monitoring
  monitoring: [
  ["Juni 2025",0],
  ["Juli 2025",2],
  ["Agustus 2025",4]
],
  // bobotLegalitas: { nib: 40, rek: 25, halal: 20, npwp: 15 },
    bobotLegalitas: {
    nib: 30,
    rek: 20,
    qris: 30,
    halal: 10,
    npwp: 10
  },
  bobotDigital: { epeken: 35, tayang: 30, medsos: 20, pelatihan: 10, pameran: 5 }
};
