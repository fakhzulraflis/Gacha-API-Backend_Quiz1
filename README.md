# Gacha API - Backend Quiz 1 (Pertemuan 6)

Nama: FAKHZUL RAFLI S
NIM: 535250102
Take Home Quiz Backend.

## Development Setup

1. Fork and clone this repository to your local computer.
2. Open the project using VS Code.
3. Install the recommended VS Code extensions: `ESLint` and `Prettier`.
4. Copy and rename `.env.example` to `.env`. Open `.env` and change the database connection string.
5. Run `npm install` to install the project dependencies.
6. Run `npm run dev` to start the dev server.
7. Test the endpoints in the API client app.

Sebelum melakukan gacha, pertama - tama kita akan membuat akun melalui endpoint users **(POST /users)**. Dimana **body (JSON):** harus diisi/diinput dengan:

```json
{
  "email": "fakhzulS@gmail.com", // Ini diisi sesuai dengan email user.
  "password": "12345678", // Buat password kamu lalu confirm dibawahnya.
  "full_name": "FAKHZUL RAFLI S", // Ini diisi sesuai dengan nama user.
  "confirm_password": "12345678"
}
```

Setelah itu, untuk menjaga keamanan akun pengguna gacha endpoints. User diminta untuk meng generate kode token yang dihasilkan oleh endpoint **(POST /auth/login)** agar dapat melakukan gacha. User di haruskan untuk mengisi **body (JSON):** dengan:

```json
{
  "email": "fakhzulS@gmail.com", // Email yang digunakan pada saat pendaftaran akun
  "password": "12345678" // Password yang digunakan pada saat pendaftaran.
}
```

Setelah menerima kode token, token tersebut perlu di copy dan diisi pada bagian **Headers** dengan **Key: Authorization && Value: jwt KODE_TOKEN**

## Gacha API Endpoints

1. (POST /gacha) POST localhost:5000/api/gacha
   Setelah menerima token, token tersebut akan digunakan oleh pengguna untuk melakukan gacha. Ini membuat user lain tidak dapat menggunakan akun dari user lain untuk melakukan gacha, membuatnya lebih tertutup dan terbatas hanya kepada user yang membuat akun tersebut.

   Ada dua kemungkinan response yang akan diterima pada saat melakukan request yaitu:
   **Response sukses (menang):**

   ```json
   {
     "success": true,
     "message": "Yeayy, Kamu berhasil memenangkan hadiahnya nih!",
     "prize": "Smartphone X"
   }
   ```

   dan **Response sukses (tidak menang):**

   ```json
   {
     "success": true,
     "message": "Oh no...., kamu gagal nih. Coba lagi yuk!",
     "prize": null
   }
   ```

   Atau apabila quota harian habis (>5) maka response yang diterima adalah:
   **Response error (kuota harian habis):**

   ```json
   {
     "success": false,
     "message": "Kamu sudah mencapai batas maksimal gacha hari ini nih, coba lagi besok yuk (5 kali)"
   }
   ```

2. (GET /gacha/history) GET localhost:5000/api/gacha/history
   Endpoint ini berguna untuk mengecek history yang telah dilakukan user. Untuk mengecek/mengakses history, user di haruskan untuk menggunakan token yang ditelah diterima sebelumnya untuk menjaga privacy pengguna.

   response yang akan diterima pun sebagai berikut:

   ```json
   {
     "success": true,
     "username": "fakhzulS@gmail.com",
     "totalGacha": 6,
     "history": [
       {
         "prize": "Tidak menang",
         "date": "2026-04-13",
         "createdAt": "2026-04-13T13:57:36.721Z"
       },
       {
         "prize": "Smartwatch Y",
         "date": "2026-04-13",
         "createdAt": "2026-04-13T13:57:29.749Z"
       },
       {
         "prize": "Tidak menang",
         "date": "2026-04-13",
         "createdAt": "2026-04-13T13:57:24.166Z"
       },
       {
         "prize": "Tidak menang",
         "date": "2026-04-13",
         "createdAt": "2026-04-13T13:56:59.829Z"
       },
       {
         "prize": "Voucher Rp100.000",
         "date": "2026-04-13",
         "createdAt": "2026-04-13T13:56:52.062Z"
       },
       {
         "prize": "Pulsa Rp50.000",
         "date": "2026-04-12",
         "createdAt": "2026-04-11T17:30:38.269Z"
       }
     ]
   }
   ```

3. (GET /gacha/prizes) GET localhost:5000/api/gacha/prizes
   Ini endpoint yang berguna untuk melihat hadiah apa yang ada pada list, total kuota hadiah, jumlah pemenang yang memenangkan suatu hadiah, dan juga sisa hadiah yang tersisa. Contoh response yang akan diterima adalah:
   **Response:**

   ```json
   {
     "success": true,
     "prizes": [
       {
         "no": 1,
         "prize": "Emas 10 gram",
         "totalQuota": 1,
         "winnersCount": 0,
         "remaining": 1
       },
       {
         "no": 2,
         "prize": "Smartphone X",
         "totalQuota": 5,
         "winnersCount": 2,
         "remaining": 3
       }
     ]
   }
   ```

4. (GET /gacha/winners)GET localhost:5000/api/gacha/winners
   Endpoint ini akan menampilkan daftar user yang berhasil memenangkan setiap hadiah dengan nama pemenang yang akan disamarkan secara acak posisi penyamarannya. Contoh response nya adalah:

   ```json
   {
     "success": true,
     "data": [
       {
         "prize": "Emas 10 gram",
         "winners": []
       },
       {
         "prize": "Smartphone X",
         "winners": []
       },
       {
         "prize": "Smartwatch Y",
         "winners": ["fa*****S"]
       },
       {
         "prize": "Voucher Rp100.000",
         "winners": ["f*k*zulS"]
       },
       {
         "prize": "Pulsa Rp50.000",
         "winners": ["fa*h*u*S"]
       }
     ]
   }
   ```

   | Method | Endpoint | Description |
|--------|--------|------------|
| POST | /tweets | Create tweet |
| GET | /tweets/search/recent | Get recent tweets |
| POST | /tweets | Create tweet |
| POST | /tweets | Create tweet |
| POST | /tweets | Create tweet |
