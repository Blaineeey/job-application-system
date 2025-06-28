# 🧑‍💼 Job Application Management System

A full-stack web application to manage job postings, applicants, and applications. Built with **Laravel 11 (REST API)** and **React 18 + MUI (frontend)** using **Sanctum for API authentication**, containerized via **Docker** for consistent development environments.

---

## 🚀 Tech Stack

- **Backend**: Laravel 11, PHP 8.2, MySQL 8
- **Frontend**: React 18 + Vite, Material UI (MUI)
- **API Authentication**: Laravel Sanctum
- **Containerization**: Docker & Docker Compose
- **Testing**: PHPUnit
- **Version Control**: Git & GitHub

---

## ⚙️ Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)
- Optional (if not using Docker for frontend): Node.js v18+, npm

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/job-application-system.git
cd job-application-system
```

---

### 2. Start with Docker

```bash
docker-compose up --build
```

This will start 3 services:

- **Laravel API**: [http://localhost:8000](http://localhost:8000)
- **React Frontend**: [http://localhost:5173](http://localhost:5173)
- **phpMyAdmin**: [http://localhost:8080](http://localhost:8080)
  - Login: `root` / `root`

---

### 3. Laravel Commands

Enter Laravel container:

```bash
docker exec -it laravel_app bash
```

Run the following once inside:

```bash
# Install dependencies
composer install

# Generate app key
php artisan key:generate

# Run migrations and seeders
php artisan migrate:fresh --seed

# (Optional) Clear caches
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

---

### 4. React Frontend (if running locally outside Docker)

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Auth API Endpoints

| Method | Endpoint      | Description              |
| ------ | ------------- | ------------------------ |
| POST   | /api/register | Register a new user      |
| POST   | /api/login    | Login user and get token |
| POST   | /api/logout   | Logout user              |
| GET    | /api/user     | Get current user         |

Use token in `Authorization: Bearer {token}` header.

---

## 🌐 App Pages (React Frontend)

| Route        | Description    | Access    |
| ------------ | -------------- | --------- |
| `/`          | Landing Page   | Public    |
| `/login`     | Login Page     | Guests    |
| `/register`  | Register Page  | Guests    |
| `/dashboard` | User Dashboard | Auth only |

---

## 🧪 Testing (Laravel Backend)

```bash
php artisan test
```

---

## 🔳 Docker Shortcuts

### Build and start containers

```bash
docker-compose up --build
```

### Stop containers

```bash
docker-compose down
```

### Run Laravel commands inside container

```bash
docker exec -it laravel_app bash
php artisan migrate
```

### View MySQL via phpMyAdmin

```bash
http://localhost:8080
# Login: root / root
```

---

## 🗂️ Folder Structure Overview

```
job-application-system/
├── backend/         # Laravel 11 API
│   ├── app/
│   ├── routes/
│   ├── database/
│   └── ...
├── frontend/        # React 18 + MUI app
│   ├── src/
│   └── public/
├── docker-compose.yml
└── README.md
```

---

## ✅ TODO / Future Improvements

- CRUD modules: Jobs, Applications, Users
- Admin Dashboard with analytics
- Email notifications
- Upload CV/resume (file upload)
- Real-time status updates via WebSockets

---

## 📖 License

MIT © [Your Name or Team]

