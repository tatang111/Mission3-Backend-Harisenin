# 🎬 Mission3 Backend - Harisenin

Aplikasi backend sederhana untuk mengelola data film (movies) dengan sistem autentikasi menggunakan JWT dan verifikasi email. Dibuat menggunakan Node.js, Express.js, dan MySQL.

---

## 🚀 Features

- ✅ CRUD Movies (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- 🔐 Auth Register (dengan verifikasi email)
- 🔐 Auth Login (dengan JWT)
- 🖼️ Upload Gambar Poster Movie
- 🛡️ Middleware proteksi JWT untuk akses terbatas
- 💾 MySQL Database Integration

---

## 🧰 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **JWT (JSON Web Token)**
- **Nodemailer** (untuk verifikasi email)
- **Multer** (untuk upload gambar)

---

## 📁 Folder Structure (Utama)

├── controllers/

├── middlewares/

├── models/

├── routes/

├── uploads/ # Folder untuk gambar upload

├── .env

├── app.js

└── server.js

---

## 🔧 Environment Variables

Buat file `.env` dan isi seperti berikut:

```env
PORT=3000

ACCESS_TOKEN_SECRET=2b06453ccf588043e55a48229aa1ac3a51cbbccc4a3968768af4e5dff867dfac19bf91143d706917e6a08175e008c87c72a42b3f894e9e6e94678bac6cf68659

REFRESH_TOKEN_SECRET=9dba923c76a1020af87839256a2a3761a5b807a3f7639bdf5dd36f0778090389547c025512e4a43393881fee02c3d7537a3f8a05c7ba42f55869425df5424496

EMAIL_USER=lintangpsa@gmail.com
EMAIL_PASS=vrawtmgbagcrrdsj
⚠️ Jangan pernah commit .env ke public repo!

## 🛠️ Installation & Running
# Clone repositori
git clone https://github.com/tatang111/Mission3-Backend-Harisenin.git
cd Mission3-Backend-Harisenin


# Install dependencies
npm install


# Jalankan server
node server.js
Server akan berjalan di http://localhost:3000


#### 📦 API Endpoints
## 🔐 Auth
Method	Endpoint	Description
POST	/auth/register	Register user + verifikasi email
POST	/auth/login	Login user dan dapatkan JWT


##🎬 Movies
Akses endpoint di bawah ini butuh JWT di header:
Authorization: Bearer <your_token>


## Method	Endpoint	Description
GET	/movies	                Ambil semua movie
GET	/movies/:id	        Ambil movie berdasarkan ID
POST	/movies	                Tambah movie baru
PUT	/movies/:id	        Replace data movie by ID
PATCH	/movies/:id	        Update sebagian data movie
DELETE	/movies/:id	        Hapus movie berdasarkan ID


##🖼️ Upload Image
Method	Endpoint	Description
POST	/upload-image	Upload file gambar ke folder /upload
Gunakan form-data dengan key image.


## 🔐 JWT Auth & Middleware
Semua endpoint CRUD movie serta upload image memerlukan JWT Auth.
Setelah login, simpan accessToken dan gunakan pada header:


#### Authorization: Bearer <accessToken>
## 📧 Verifikasi Email
Saat register, user akan dikirim email berisi link verifikasi.
Gunakan EMAIL_USER dan EMAIL_PASS untuk mengatur akun pengirim.


## ⚙️ Database
Pastikan Anda sudah mengatur koneksi ke MySQL di file config/database.js atau sejenisnya.
Jalankan migrasi jika ada.


## 📄 License
MIT © 2025 tatang111
