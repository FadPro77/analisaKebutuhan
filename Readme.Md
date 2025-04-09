## Endpoint Auth

- Endpoint **Register**: `{URL}/auth/register`
  Pendaftaran ke web
- Endpoint **Login**: `{URL}/auth/login`
  Login ke web
- Endpoint **Profile**: `{URL}/profile`
  Untuk melihat profil pengguna

## Endpoint Menu

- Endpoint **Get Menu**: `{URL}/menu`
  Melihat seluruh menu (tidak perlu login)
- Endpoint **Menu by Id**: `{URL}/menu/{id}`
  Melihat menu berdasarkan id (tidak perlu login)
- Endpoint **Post Menu**: `{URL}/menu`
  Membuat menu (harus login admin)
- Endpoint **Update Menu**: `{URL}/menu/{id}`
  Mengupdate menu (login admin)
- Endpoint **Delete Menu**: `{URL}/menu/{id}`
  Hapus menu (login admin)

## Endpoint Pesanan

- Endpoint **Get Pesanan**: `{URL}/pesanan`
  Melihat seluruh pesanan sesuai pengguna (harus login)
- Endpoint **Pesanan by Id**: `{URL}/pesanan/{id}`
  Melihat pesanan by id (harus login)
- Endpoint **Pesanan Admin**: `{URL}/pesanan/admin`
  Melihat pesanan seluruh pengguna (khusus admin)
- Endpoint **Post Pesanan**: `{URL}/pesanan`
  Membuat Pesanan (login admin)
- Endpoint **Patch Status Pesanan**: `{URL}/pesanan/{id}`
  Mengupdate pesanan (login admin)
- Endpoint **Delete Pesanan**: `{URL}/pesanan/{id}`
  Menghapus pesanan (login admin)

  ## Endpoint Pengeluaran

- Endpoint **Get Pengeluaran**: `{URL}/pengeluaran`
  Melihat seluruh pengeluaran (login admin)
- Endpoint **Pengeluaran by Id**: `{URL}/pengeluaran/{id}`
  Melihat pengeluaran by id (login admin)
- Endpoint **Post Pengeluaran**: `{URL}/pengeluaran`
  Membuat Pengeluaran (login admin)
- Endpoint **Update Status Pengeluaran**: `{URL}/pengeluaran/{id}`
  Mengupdate pengeluaran (login admin)
- Endpoint **Delete Pengeluaran**: `{URL}/pengeluaran/{id}`
  Menghapus pengeluaran (login admin)

  ## Endpoint Saldo

- Endpoint **Get Saldo**: `{URL}/saldo`
  Melihat seluruh saldo (login admin)
- Endpoint **Saldo by Id**: `{URL}/saldo/{id}`
  Melihat saldo by id (login admin)
- Endpoint **Post Saldo**: `{URL}/saldo`
  Membuat Saldo (login admin)
- Endpoint **Update Status Saldo**: `{URL}/saldo/{id}`
  Mengupdate saldo (login admin)
- Endpoint **Delete Saldo**: `{URL}/saldo/{id}`
  Menghapus saldo (login admin)

## Endpoint Payment

- Endpoint **Get Payment**: `{URL}/payment`
  Melihat seluruh pembayaran (harus login)
- Endpoint **Payment by Id**: `{URL}/payment/{id}`
  Melihat pembayaran sesuai id (harus login)
- Endpoint **Post payment manual**: `{URL}/menu`
  Membuat pembayaran tunai (harus login)
- Endpoint **Post Payment Midtrans**: `{URL}/payment/MidTrans` ⚠️  
  Membuat pembayaran menggunakan Midtrans alias terintegrasi payment gateway (harus login).
  > ⚠️ **Catatan:** Endpoint masih belum selesai.

## User login

- **Email**: `user1@gmail.com`
- **Password**: `user1`

## User login

- **Email**: `admin1@gmail.com`
- **Password**: `admin1`

## Link

- **Dokumentasi**
- **[Deployed API](https://analisakebutuhan-production.up.railway.app)**
- **[POSTMAN API Client](https://documenter.getpostman.com/view/38244782/2sB2cX8gH2)**
- **[GitHub Repository](https://github.com/FadPro77/analisaKebutuhan)**
