# 🍲 API Resep Masakan GraphQL

API untuk mengelola resep masakan dengan fitur lengkap menggunakan GraphQL

## 📋 Persyaratan
- Node.js v14+
- NPM

## 🛠 Instalasi
1. Clone repositori ini
2. Buka folder project
3. Install dependencies:
```bash
npm install
```

## 🚀 Menjalankan Server
```bash
node server.js
```
Server akan berjalan di: http://localhost:5000/graphql

## 🔍 Fitur
### Query
```graphql
# Dapatkan semua resep
{
  reseps {
    nama
    tingkatKesulitan
    chef { nama }
  }
}
```

### Mutation
```graphql
# Tambah resep baru
mutation {
  tambahResep(
    nama: "Soto Ayam"
    tingkatKesulitan: "Mudah"
    chefId: "1"
  ) {
    id
    nama
  }
}
```

## 📂 Struktur Data
- `chefs`: Daftar chef
- `bahans`: Daftar bahan
- `reseps`: Daftar resep dengan relasi

## 📸 Screenshot Wajib
1. Hasil query daftar resep
2. Hasil mutation
3. Dokumentasi schema

## ❓ Pertanyaan Umum
Q: Server tidak bisa diakses?
A: Cek port 5000 atau restart server

Q: Mutation gagal?
A: Pastikan ID chef/bahan valid

## 📝 Laporan
Format laporan:
1. Cover
2. Screenshot hasil
3. Penjelasan schema

Dibuat dengan ❤️ menggunakan:
- Node.js
- Express
- GraphQL
