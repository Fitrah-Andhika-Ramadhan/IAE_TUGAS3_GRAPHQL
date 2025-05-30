// Data contoh untuk proyek GraphQL Resep Masakan
const chefs = [
  {
    id: '1',
    nama: 'Chef Juna',
    spesialisasi: 'Masakan Tradisional Indonesia',
    pengalaman: '10 tahun',
    rating: 4.8
  },
  {
    id: '2',
    nama: 'Chef Renatta',
    spesialisasi: 'Masakan Western',
    pengalaman: '8 tahun',
    rating: 4.7
  }
];

const bahans = [
  {
    id: 'b1',
    nama: 'Bawang Merah',
    kategori: 'Bumbu Dasar',
    satuan: 'siung',
    stok: 50
  },
  {
    id: 'b2',
    nama: 'Daging Sapi',
    kategori: 'Protein',
    satuan: 'gram',
    stok: 5000
  }
];

const reseps = [
  {
    id: 'r1',
    nama: 'Rendang Daging',
    tingkatKesulitan: 'Sulit',
    waktuMasak: 180,
    chefId: '1',
    bahan: [
      { bahanId: 'b1', jumlah: 10 },
      { bahanId: 'b2', jumlah: 1000 }
    ],
    langkah: [
      'Haluskan bumbu',
      'Tumis bumbu hingga harum',
      'Masukkan daging dan santan'
    ]
  }
];

module.exports = { chefs, bahans, reseps };
