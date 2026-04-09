# 🎓 StudentTech — Advanced Student Management System

<div align="center">
  <img src="https://img.shields.io/badge/Angular-17-DD0031.svg?logo=angular" alt="Angular 17">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933.svg?logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MySQL-8.0-4479A1.svg?logo=mysql" alt="MySQL">
  <img src="https://img.shields.io/badge/Bootstrap-5.3-7952B3.svg?logo=bootstrap" alt="Bootstrap 5.3">
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
</div>

---

### 🚀 Overview
A premium, modern, full-stack web application designed for universities and colleges to seamlessly manage student records, track attendance, publish exam results, issue digital ID cards, and manage system users. Built with **Angular 17**, **Node.js/Express**, and **MySQL**, featuring a stunning glassmorphism UI, dark mode, and role-based access control.

---

## 📑 Table of Contents

1. [Features Overview](#-features-overview)
2. [Technology Stack](#-technology-stack)
3. [Security & Authentication](#-security--authentication)
4. [Application Routes](#-application-routes)
5. [Complete File Directory & Explanations](#-complete-file-directory--explanations)
6. [Database Schema](#-database-schema)
7. [Step-by-Step Installation Guide](#-step-by-step-installation-guide)
8. [Available Scripts](#-available-scripts)
9. [Default Test Credentials](#-default-test-credentials)
10. [API Endpoints](#-api-endpoints)
11. [Exam Name Types](#-exam-name-types)
12. [Troubleshooting Guide](#-troubleshooting-guide)

---

## ✨ Features Overview

### 🌟 State-of-the-Art UI/UX
- **Glassmorphism Design:** Beautiful frosted-glass effects, subtle gradients, and modern floating layouts.
- **Dark Mode Toggle:** A 🌙/☀️ toggle in the navbar switches between light and dark themes using Bootstrap 5.3's native `data-bs-theme` system. Preference is saved to `localStorage`.
- **Responsive Architecture:** Fully optimized for desktops, tablets, and mobile devices using Bootstrap 5.3.
- **Premium Micro-animations:** Cascading entrance animations (fade-in, slide-in), hover pulse effects, and smooth CSS transitions.
- **Standalone Angular Components:** Modular architecture using Angular 17's standalone component model with lazy loading.

### 👑 Admin Panel Features
- **Comprehensive Dashboard:** Live metrics (total students, attendance records) + 6 quick-action cards.
- **Student Management:** Full CRUD for student profiles with validation and university/college linking.
- **Attendance Interface:** Daily marking, history logs, and student-specific views.
- **Results Publishing:** Publish grades with specialized Indian college exam type dropdowns.
- **User Management:** Create, roles (Admin/Student), search, and delete system users.

### 🎒 Student Portal Features
- **Personalized Dashboard:** View profile, courses, and affiliations.
- **Attendance Score:** Live tracking of attendance percentage.
- **Digital ID Card:** Beautifully designed, printable student ID badge.
- **Academic Report:** View marks and download PDF reports in one click.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | Angular 17 (Standalone, RxJS, Signals) |
| **Styling** | CSS3 (Glassmorphism), Bootstrap 5.3, Bootstrap Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL 8+ |
| **Security** | JWT, bcrypt.js (Salt: 10) |

---

## 🔐 Complete File Directory & Explanations

### 📁 Backend (`/backend`)
Core logic, database handling, and API endpoints.

- **`server.js`**: The main entry point. Sets up Express, middleware (CORS, JSON parsing), and registers all API routes.
- **`config/db.js`**: Managed MySQL connection pool using `mysql2/promise`. Provides a centralized `query()` helper for all routes.
- **`config/initDatabase.js`**: Automation script to create the `student_management` database and the 4 core tables (`users`, `students`, `attendance`, `results`).
- **`config/seedData.js`**: Populates the database with initial admin and student accounts for testing.
- **`middleware/auth.js`**: Contains `auth` (JWT verification) and `adminAuth` (Role check) middlewares to protect sensitive routes.
- **`controllers/resultsController.js`**: Encapsulates business logic for retrieving and processing student results.
- **`routes/auth.js`**: Handles user authentication: Registration, Login, and the `/me` current user check.
- **`routes/students.js`**: Full CRUD endpoints for managing student profiles and individual records.
- **`routes/attendance.js`**: Logic for marking daily attendance, bulk updates, and fetching history.
- **`routes/results.js`**: Endpoints for publishing, and deleting exam marks.
- **`routes/users.js`**: Admin-only endpoints for managing system accounts and role swapping.
- **`routes/dashboard.js`**: Aggregates statistics (counts) for the admin dashboard.

### 📁 Frontend (`/frontend/src/app`)
Modern Angular 17 application with a clean architecture.

- **`app.component.ts`**: The root component. Manages the main layout, dynamic navigation links, and the dark mode theme toggle logic.
- **`app.routes.ts`**: Central routing configuration. Defines all page paths and applies `authGuard`, `adminGuard`, and `guestGuard`.
- **`app.config.ts`**: Configures global providers like `provideHttpClient` and `provideRouter`.
- **`core/guards/`**:
  - `auth.guard.ts`: Ensures only logged-in users access internal pages.
  - `admin.guard.ts`: Strictly restricts admin pages to users with the 'admin' role.
  - `guest.guard.ts`: Prevents logged-in users from returning to login/register pages.
- **`core/interceptors/auth.interceptor.ts`**: Automatically attaches the JWT token from `localStorage` to every outgoing API request.
- **`core/services/`**:
  - `api.service.ts`: The central data hub. Performs all HTTP calls to the backend (Students, Attendance, Stats, User Mgmt).
  - `auth.service.ts`: Manages user authentication state using Angular **Signals**, handling login, registration, and logout.
- **`pages/`**:
  - `home/`, `about/`, `contact/`: Public-facing marketing and information pages with rich animations.
  - `login/`, `register/`, `admin-login/`: Authentication portals for both roles.
  - `admin/dashboard/`: The main control center for administrators with live stats.
  - `admin/students/`: List view and the complex Add/Edit student form logic.
  - `admin/attendance/`: Global logs, bulk marking, and specific student tracking.
  - `admin/results/`: Interface for publishing subject marks to students.
  - `admin/users/`: Full CRUD for system users with role change buttons.
  - `student/dashboard/`: Personal profile and academic performance overview for students.
  - `student/id-card/`: Visual generator for digital student ID badges.
- **`styles.css`**: Global design system. Defines Glassmorphism variables, dark theme overrides (`[data-bs-theme="dark"]`), and all animation keyframes.
- **`environments/`**: Contains environment-specific configurations (e.g., API base URL for development vs. production).

---

## 🗄️ Database Schema

| Table | Purpose |
|---|---|
| **`users`** | Login credentials and roles (Admin/Student). |
| **`students`** | Rich profile information (Email, Course, College, University). |
| **`attendance`** | Daily logs (Present/Absent) linked to `students` table. |
| **`results`** | Academic performance entries (Subject, Marks, Exam Type). |

---

## 🚀 Step-by-Step Installation Guide

### Backend Setup
1. `cd backend`
2. `npm install`
3. `copy .env.example .env` (Edit with your MySQL details)
4. `npm run init-db`
5. `npm run seed`
6. `npm start`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm start`

---

## 🔑 Default Test Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@school.com` | `admin123` |
| **Student** | `john.doe@student.com` | `student123` |

---

## 💡 Troubleshooting

- **Database Issues:** Ensure MySQL is running on port 3306.
- **Port 3000 busy:** Run `npx kill-port 3000` set up in `server.js`.
- **Deleted Student re-registration:** Fixed. Deleting a student now also clears their user record.
- **Dark Mode visuals:** Ensure your browser is refreshed to load latest `styles.css` variables.

---

## 🏗️ Technical Architecture & Logic (DNA)

This section provides a high-density technical summary of the project's internal mechanics.

### 🔐 Security & Auth Flow
- **Password Safety:** `bcrypt.js` (Salt: 10) hashes passwords before database storage.
- **JWT Flow:** Logic signs a 24h token with `{ id, email, role }` data.
- **Interceptors:** `auth.interceptor.ts` automatically injects the `Authorization` header into every request.
- **Guards:** Active `authGuard`, `adminGuard`, and `guestGuard` handle all client-side navigation security.

### 👨‍🎓 Business Logic Highlights
- **Role-Based Views:** Angular **Signals** (`AuthService`) and `computed` properties are used to conditionally show/hide navigation links based on roles.
- **Database Consistency:** When a student is deleted, the backend fetches their email and automatically performs a `DELETE FROM users` to keep the authentication table in sync.
- **Stats Aggregation:** The admin dashboard performs multiple `COUNT` queries during the fetch to provide live feedback on system usage.
- **PDF Report Cards:** Built-in logic allows students to download a print-formatted report card based on their exam results.

### 🎨 Design System & Theme Logic
- **Theme Trigger:** Toggling the navbar switch injects `data-bs-theme="dark"` into the `<html>` root.
- **CSS Overrides:** Custom `styles.css` overrides Bootstrap's utility classes (`bg-white`, `table-light`, etc.) to ensure a premium dark slate aesthetic with Glassmorphism integrity.

---

<div align="center">
  <b>Powered by StudentTech &copy; 2026. Built with ❤️ using Angular 17.</b>
</div>
