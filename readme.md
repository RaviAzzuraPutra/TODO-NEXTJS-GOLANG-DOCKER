# TODO - Mini Project: Next.js + Go (Gin) + PostgreSQL + Docker

Dokumentasi ini menjelaskan secara ringkas namun komprehensif tentang mini projek TODO yang menggabungkan frontend Next.js, backend Golang (Gin + Gorm), dan PostgreSQL, dikemas untuk mudah dijalankan secara lokal dan di dalam container Docker.

## 1. Pendahuluan

Judul: TODO - Mini Project (Next.js + Golang + PostgreSQL + Docker + AI Integration)

Gambaran Umum:
Projek ini adalah aplikasi manajemen tugas (TODO) skala mini yang menggabungkan frontend modern berbasis Next.js dengan backend cepat menggunakan Golang (Gin). Backend menggunakan Gorm sebagai ORM dan PostgreSQL sebagai basis data. Aplikasi mendukung otentikasi (Google OAuth) dan penyimpanan sesi, serta fitur-fitur dasar CRUD untuk entitas Todo. Selain itu, projek ini terintegrasi dengan modul AI sederhana yang dapat memberikan insight atau rekomendasi singkat terkait tugas (contoh: saran prioritas, ringkasan deskripsi, atau estimasi waktu). Aplikasi ini dibuat sebagai mini projek untuk tujuan pembelajaran dan demonstrasi arsitektur web monorepo sederhana dan eksperimen AI ringan.

Keunikan:
- Menggabungkan Next.js (React) dengan Golang (Gin) — menunjukkan interoperabilitas antara ekosistem Node.js
	dan Go.
- Terintegrasi dengan modul AI ringan untuk memberikan insight pada setiap Todo: rekomendasi prioritas,
	ringkasan otomatis deskripsi, dan (potensial) estimasi waktu penyelesaian.
- Memanfaatkan Gorm untuk mapping entitas ke PostgreSQL, termasuk penggunaan UUID untuk primary key.
- Dirancang untuk mudah di-containerize dengan Docker dan docker-compose untuk pengembangan lokal.

Catatan: Ini adalah mini projek, bukan produksi-ready; fokus pada pembelajaran, keterbacaan kode, eksperimen
AI, dan kesederhanaan pengaturan.

AI yang Digunakan (ringkas):
- Provider: Google (Generative AI / Gemini).
- Model contoh yang digunakan pada projek ini: `gemini-2.5-flash` (didefinisikan di variabel `MODEL` pada file `.env`).
- API Key: disimpan di environment variable `GEMINI_API_KEY` (jangan commit kunci ini ke repo publik).
- Tujuan integrasi AI: menghasilkan `Ai_Insight` untuk setiap Todo — ringkasan teks, rekomendasi prioritas, dan estimasi waktu.

Penjelasan singkat: ketika Todo dibuat atau diperbarui, backend dapat mengirimkan deskripsi/metadata ke
Google Generative AI (Gemini) dan menerima teks hasil yang disimpan pada kolom `ai_insight` pada tabel `todos`.

## 2. Tujuan

Tujuan dari projek ini dirancang agar menarik dan relevan untuk pengembang yang ingin belajar
monorepo modern:

- Menyediakan contoh nyata integrasi antara Next.js dan Golang (Gin) untuk aplikasi web interaktif.
- Memperlihatkan pola arsitektur RESTful sederhana dengan penggunaan Gorm dan PostgreSQL.
- Memudahkan eksperimen dengan Docker untuk menjalankan seluruh stack secara konsisten di mesin
	pengembangan.
- Menjadi basis pembelajaran untuk menambah fitur lanjutan: otentikasi OAuth, background AI insight
	(placeholder di model), optimisasi performa, dan deployment.
- Memberi pengembang pemahaman praktis tentang trade-off teknologi (kecepatan Go vs ekosistem Node,
	pilihan ORM, dan containerization).

Ringkasnya, projek ini bertujuan menjadi laboratorium kecil yang menarik dan siap pakai untuk belajar
berbagai konsep pengembangan aplikasi web monorepo modern.

## 3. Teknologi Utama

- Backend:
	- Bahasa: Golang
	- Framework HTTP: Gin
	- ORM: Gorm (gorm.io/gorm)
	- Database: PostgreSQL
	- File dependensi: lihat `backend/go.mod` untuk paket lengkap dan versi

-- Frontend:
		- Framework: Next.js (React)
		- Auth: next-auth (terpasang di frontend)
		- Paket inti yang digunakan (contoh): `next`, `react`, `react-dom`, `next-auth`, `axios`, `sweetalert2`,
			`@mui/material`, `lottie-react`, `lucide-react`.
		- Semua dependensi dan versi tercantum di `frontend/package.json`.

-- Lainnya:
	- Git sebagai VCS
	- Docker + docker-compose untuk menjalankan stack secara tercontainer

Catatan paket backend (beberapa paket inti yang digunakan): `github.com/gin-gonic/gin`, `gorm.io/gorm`,
`gorm.io/driver/postgres`, `github.com/golang-jwt/jwt/v5`, `github.com/google/uuid`, `github.com/joho/godotenv`.

## 4. Analisis Kebutuhan Fungsional

4.a. Analisis kebutuhan perangkat lunak

- Sistem Operasi pengembangan: Windows, macOS, atau Linux (direkomendasikan Linux/macOS untuk keseragaman
	lingkungan, namun Docker membuat Windows juga kompatibel).
- Bahasa dan runtime: Go (lihat `go.mod`), Node.js (untuk Next.js) — versi disarankan yang sesuai dengan
	deklarasi package (lihat file). Pastikan Node.js >= 18.x untuk Next.js modern.
- Database: PostgreSQL (open-source) — gunakan versi yang kompatibel dengan driver/postgres yang ada di go.mod.
- Alat: Docker dan docker-compose untuk menjalankan layanan; Git untuk versi kontrol.

4.b. Analisis kebutuhan perangkat keras

- CPU: Minimal dual-core untuk pengalaman development yang nyaman; multicore direkomendasikan untuk
	menjalankan beberapa container sekaligus.
- RAM: Minimal 4GB, direkomendasikan 8GB+ saat menjalankan Docker Desktop bersama IDE dan browser.
- Penyimpanan: Minimal 1GB kosong untuk kode dan dependensi; tambahan disk untuk data PostgreSQL tergantung
	jumlah data (minimal 5GB disarankan untuk kenyamanan).

4.c. Analisis Pengguna

- Pengguna utama: individu yang membutuhkan alat sederhana untuk mengelola tugas harian atau proyek kecil
	(personal todo manager).
- Pengguna pendidikan: pelajar atau pengembang yang ingin mempelajari integrasi monorepo dan eksperimen
	AI ringan.

Catatan: Bagian ini menggantikan istilah 'perangkat pikir' — fokus sekarang ke siapa yang akan memakai aplikasi
ini dan skenario penggunaan utama.

## 5. Struktur Direktori Ringkas

Berikut ringkasan struktur direktori utama (disederhanakan):

- /backend — kode Go (server API)
	- main.go
	- controller/ — handler (auth, todo)
	- model/ — definisi entitas (User, Todo, Session)
	- database/ — koneksi DB dan migrasi
	- routes/ — definisi routing
	- middleware/ — middleware (auth, todo access)

- /frontend — aplikasi Next.js
	- src/app — halaman dan layout Next.js
	- src/components — komponen UI (Navbar, Table, Footer)
	- public — aset statis (manifest, sw.js, animasi)

- docker-compose.yml — konfigurasi services
- postgres/INIT.sql — inisialisasi DB (skema awal)

Untuk struktur lengkap, lihat tree repository yang tersedia di workspace.

## 6. Entity / Model
Ringkasan entitas utama yang diambil langsung dari file `backend/model`.

Catatan penting tentang AI yang digunakan:
- Model: proyek ini menggunakan model Gemini (ditunjukkan oleh variabel `MODEL` di `.env`, contoh: `gemini-2.5-flash`).
- API: integrasi via Google Generative AI / Gemini API; kunci disimpan di environment variable `GEMINI_API_KEY`.
- Fungsi AI dalam aplikasi: menghasilkan `Ai_Insight` untuk Todo — contoh fungsi: ringkasan deskripsi Todo, rekomendasi prioritas,
  dan estimasi waktu penyelesaian sederhana.

Bagaimana backend memanggil API (ringkasan):
1. Backend membaca `GEMINI_API_KEY` dan `MODEL` dari environment.
2. Saat Todo dibuat atau diupdate, backend dapat memanggil endpoint Generative AI dengan payload berisi
   teks deskripsi atau metadata Todo.
3. API mengembalikan teks hasil (insight) yang kemudian disimpan di kolom `Ai_Insight` pada tabel `todos`.

Contoh alur panggilan API (pseudo-code Go):

```go
// pseudo-code, bukan library-specific
func GenerateAiInsight(apiKey, model, prompt string) (string, error) {
	reqBody := map[string]interface{}{
		"model": model,
		"prompt": prompt,
		"max_tokens": 300,
	}
	// buat request POST ke endpoint Generative AI (contoh: https://generativeai.googleapis.com/v1beta2/models/{model}:generate)
	// set header Authorization: Bearer <apiKey>
	// parse response dan kembalikan teks hasil
}

// pemakaian saat menyimpan Todo
insight, err := GenerateAiInsight(os.Getenv("GEMINI_API_KEY"), os.Getenv("MODEL"), todo.Description)
if err == nil {
	todo.Ai_Insight = &insight
}
```

Catatan: implementasi nyata harus mengikuti dokumentasi resmi Google Generative AI (endpoint, authentication,
quota, dan rate limiting). Jika tidak menggunakan Google, anda bisa menggantinya dengan LLM lain selama API
mengembalikan teks.

Tabel entitas (format tabel):

User
| Kolom | Tipe | Keterangan |
|---|---:|---|
| id | UUID (string) | Primary key, default gen_random_uuid() |
| google_id | string (nullable) | ID akun Google |
| email | string (nullable) | Email user |
| display_name | string (nullable) | Nama tampilan |
| first_name | string (nullable) | Nama depan |
| last_name | string (nullable) | Nama belakang |
| slug | string (nullable) | URL-friendly identifier |
| created_at | timestamp | Waktu pembuatan |
| updated_at | timestamp | Waktu pembaruan |
| deleted_at | timestamp (soft delete) | Soft delete (Gorm) |

Todo
| Kolom | Tipe | Keterangan |
|---|---:|---|
| id | UUID (string) | Primary key, default gen_random_uuid() |
| user_id | UUID (string, nullable) | Foreign key ke User |
| title | string (nullable) | Judul tugas |
| description | string (nullable) | Deskripsi tugas |
| category | string (nullable) | Kategori |
| priority | string (nullable) | Prioritas (mis. low/medium/high) |
| deadline | string (nullable) | Deadline (format disimpan sesuai implementasi) |
| is_completed | boolean | Status selesai (default false) |
| ai_insight | string (nullable) | Hasil insight AI (ringkasan, rekomendasi) |
| created_at | timestamp | Waktu pembuatan |
| updated_at | timestamp | Waktu pembaruan |
| deleted_at | timestamp (soft delete) | Soft delete (Gorm) |

Session
| Kolom | Tipe | Keterangan |
|---|---:|---|
| id | UUID (string) | Primary key, default gen_random_uuid() |
| user_id | UUID (string, nullable) | Foreign key ke User |
| session_token | string (nullable) | Token sesi untuk autentikasi |
| created_at | timestamp | Waktu pembuatan |
| updated_at | timestamp | Waktu pembaruan |

Relasi singkat:
- Satu User dapat memiliki banyak Todo (one-to-many via User_id)
- Satu User dapat memiliki banyak Session (one-to-many)

## 7. Alur Kerja Aplikasi

Alur tinggi (end-to-end):

1. Pengguna membuka frontend (Next.js). Jika belum ter-autentikasi, pengguna dapat login (menggunakan
	 Google OAuth — terdapat request handling di backend dan dukungan di frontend dengan next-auth).
2. Frontend memanggil API backend (Gin) untuk operasi: daftar todo, buat todo, lihat detail, update, hapus.
3. Backend memvalidasi request, otorisasi user (middleware), lalu melaksanakan operasi CRUD melalui Gorm
	 ke PostgreSQL.
4. Respons diterima frontend yang lalu merender UI sesuai state. Perubahan seperti pembuatan atau penghapusan
	 todo langsung tercermin setelah refresh data via axios.
5. Sesi dan token disimpan (Session model) untuk manajemen otentikasi.

## 8. Menjalankan Proyek Lokal

Petunjuk singkat menjalankan stack secara lokal menggunakan Docker (direkomendasikan):

1) Persyaratan:
	 - Docker & docker-compose terinstal
	 - Node.js (untuk dev frontend jika ingin menjalankan lokal tanpa container)
	 - Go toolchain (opsional jika menjalankan backend langsung tanpa container)

2) Menjalankan dengan Docker (direkomendasikan):
	 - Pastikan file `docker-compose.yml` di root telah dikonfigurasi.
	 - Di direktori root project, jalankan:

```bash
docker compose up --build
```

	 - Layanan akan membuat container untuk backend, frontend, dan postgres.
	 - Akses frontend di http://localhost:3000 (default Next.js) dan backend pada port yang dikonfigurasi

3) Menjalankan secara terpisah (tanpa Docker):
	 - Backend:
		 - Masuk ke folder `backend`.
		 - Pastikan variable environment (DB connection string, Google OAuth secrets) ter-set.
		 - Jalankan:

```bash
go run main.go
```

	 - Frontend:
		 - Masuk ke folder `frontend`.
		 - Install dependensi:

```bash
npm install
```

		 - Jalankan pengembangan:

```bash
npm run dev
```

4) Migrasi dan inisialisasi DB:
	 - Jika perlu, jalankan skrip SQL di `postgres/INIT.sql` atau gunakan mekanisme migrasi pada folder `database/migrations`.

Catatan: Pastikan environment variable seperti koneksi database, credentials Google OAuth, dan secret session
diatur sebelum menjalankan backend tanpa container.

## 9. Beyond the Code — Performance Benchmark & Trade-off Analysis

Berikut perbandingan teknis singkat (ringkas) yang relevan untuk arsitektur dan keputusan teknis dalam proyek ini.

Tabel Perbandingan: Backend stack (Go Gin vs Node.js/Express)

| Aspek | Golang (Gin) | Node.js (Express) | Trade-off / Catatan |
|---|---:|---:|---|
| Throughput (rata2) | Tinggi — goroutine ringan, compiled binary | Cukup baik — event loop, single-threaded async | Go unggul di concurrency murni; Node mudah untuk I/O-bound workloads |
| Latency | Rendah (bahkan pada beban) | Tergantung pada event loop dan V8 | Go cenderung lebih stabil pada latency rendah |
| SEO & SSR | Tidak relevan — backend API | - | Next.js menangani SSR di frontend; backend tetap sebagai API |
| Development Velocity | Cepat dengan tipe static, tapi butuh compile | Cepat, hot-reload tersedia | Node/JS sering lebih cepat iterasi UI; Go butuh build untuk perubahan backend |
| Tooling & Ekosistem | Mapan untuk backend dan sistem | Sangat besar untuk web/frontend | Pilihan bergantung kebutuhan tim |

Tabel Perbandingan: Database Access (Gorm vs raw SQL)

| Aspek | Gorm (ORM) | Raw SQL / Query Builder | Trade-off / Catatan |
|---|---:|---:|---|
| Produktivitas | Tinggi — modeling, migrasi mudah | Lebih manual | Gorm mempercepat pengembangan CRUD |
| Kontrol Performa | Abstraksi dapat menyembunyikan query mahal | Penuh kontrol | Untuk query kompleks, raw SQL mungkin diperlukan |
| Kesederhanaan | Sangat cocok proyek kecil-menengah | Lebih cocok produksi high-perf | Bisa kombinasi: Gorm + raw SQL pada hotspot |

Keputusan Teknis dan Transparansi:
- Menggunakan Go + Gin untuk backend dipilih karena performa, binary yang mudah deploy, dan kesederhanaan
	concurrency model.
- Gorm dipilih untuk mempercepat development CRUD dan memanfaatkan fitur seperti soft-delete.
- Next.js dipilih di frontend untuk kemudahan membuat UI React modern, routing file-based, dan dukungan
	SSR/SSG jika nanti dibutuhkan.
- Docker dipilih untuk konsistensi environment developer dan kemudahan orchestration lokal.

Benchmark sederhana yang direkomendasikan (untuk eksperimen):
- Gunakan tool seperti wrk atau hey untuk mengukur RPS (requests per second) pada endpoint CRUD todo.
- Ukur latensi p99, p95, throughput sambil memonitor CPU & memory container.

Contoh hasil pengukuran (hipotetis) untuk ilustrasi:

| Skenario | RPS | p95 Latency | CPU (avg) | Catatan |
|---|---:|---:|---:|---|
| GET /api/todos (single instance) | 1500 | 12ms | 20% | Backend Go ringan untuk read-heavy |
| POST /api/todos (single instance) | 500 | 25ms | 30% | Write lebih mahal karena DB I/O |

Catatan: Hasil nyata bergantung pada hardware, konfigurasi DB, dan ukuran dataset.

Rekomendasi Perbaikan & Langkah Lanjutan:
- Instrumentasi: tambahkan OpenTelemetry untuk tracing dan metrik.
- Caching: perkenalkan Redis untuk cache read-heavy endpoints.
- Pooling DB: optimalkan koneksi ke Postgres (max open connections).
- Profiling: gunakan pprof pada Go untuk menemukan bottleneck CPU/memory.


10. Kesimpulan
Proyek TODO ini mengimplementasikan arsitektur monorepo modern yang menggabungkan Next.js sebagai frontend dengan Golang (menggunakan framework Gin dan ORM Gorm) sebagai backend, serta PostgreSQL sebagai basis data, seluruhnya dikontainerisasi dengan Docker. Integrasi AI Google Gemini menambahkan lapisan kecerdasan buatan untuk menghasilkan insight otomatis pada setiap tugas, seperti rekomendasi prioritas dan ringkasan deskripsi, yang disimpan dalam kolom khusus di basis data. Keputusan teknis seperti penggunaan UUID untuk primary key, soft delete, dan mekanisme autentikasi OAuth menunjukkan pendekatan yang terstruktur dan siap untuk pengembangan lebih lanjut, meskipun dalam konteks mini project yang berfokus pada kejelasan kode dan kemudahan setup.

Secara akademis, proyek ini berfungsi sebagai laboratorium eksperimental yang mengilustrasikan integrasi multidisiplin antara rekayasa perangkat lunak, sistem cerdas, dan arsitektur cloud-native. Konfigurasi yang tercontainerisasi tidak hanya memastikan reproduktibilitas lingkungan, tetapi juga merepresentasikan praktik terbaik dalam pengembangan modern yang menekankan isolasi dependensi dan portabilitas. Melalui analisis trade-off teknologi seperti performa concurrency Go versus ekosistem Node.js, serta produktivitas Gorm dibandingkan kontrol penuh raw SQL proyek ini menyediakan kerangka empiris untuk mengevaluasi pilihan desain sistem, sekaligus menjadi basis yang valid untuk ekspansi lebih lanjut dalam bidang DevOps, optimasi kinerja, atau integrasi AI yang lebih kompleks.
---




