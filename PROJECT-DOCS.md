# 🧠 Project DNA: Advanced Student Management System (StudentTech)

This document is a comprehensive technical overview of the "StudentTech" project. It is designed to give an AI (like ChatGPT) or a new developer a full understanding of the project's logic, architecture, and design patterns.

---

## 🏗️ Architecture Overview

The project uses a **modern decoupled architecture**:

- **Backend:** Node.js + Express.js + MySQL. It follows a RESTful API pattern with custom middleware for security (JWT + Role-based access control).
- **Frontend:** Angular 17 SPA using **Standalone Components**. It features a "Premium Glassmorphism" UI with dark mode support.
- **State Management:** Angular **Signals** (via `AuthService`) handle the reactive user state and navbar visibility.

---

## 🎨 Design System

| Feature | Implementation |
|---|---|
| **Styling** | Vanilla CSS + Bootstrap 5.3 + Glassmorphism. |
| **Theme** | **Dark Mode** toggles `data-bs-theme="dark"` on the `<html>` element. Overrides for Bootstrap utilities (`bg-white`, `text-dark`, etc.) are in `styles.css`. |
| **Animations** | CSS `@keyframes` (`fadeIn`, `slideInRight`, etc.) and classes like `.animate-fade-in`. |

---

## 🔐 Security & Auth Flow

1. **Password Safety:** `bcrypt.js` with 10 salt rounds hashes passwords before storing in the `users` table.
2. **JWT Flow:** Upon login, the backend generates a 24-hour JWT token containing the user's ID, Email, and Role.
3. **HTTP Interceptor:** `auth.interceptor.ts` intercepts all Angular `HttpClient` requests and adds the `Authorization: Bearer <token>` header if a token exists in `localStorage`.
4. **Guards:**
   - `authGuard`: Blocks unauthenticated requests.
   - `adminGuard`: Checks `user.role === 'admin'`.
   - `guestGuard`: Prevents logged-in users from hitting `/login` or `/register`.

---

## 💾 Database Schema

The database `student_management` consists of 4 primary tables:

1. **`users`**: Contains login credentials (`id`, `name`, `email`, `password`, `role`).
2. **`students`**: Contains rich student profile data. Note: One `users` email maps to one `students` email (1:1 relationship for student role).
3. **`attendance`**: Maps `student_id` to a `date` and `status` ('Present'/'Absent'). Has a UNIQUE constraint on `(student_id, date)`.
4. **`results`**: Maps `student_id` to an exam performance (`exam_name`, `subject`, `marks_obtained`, `max_marks`).

---

## 🔌 API Summary (Core Logic)

### 👨‍🎓 Students API
- When a student is **created** by an admin, a corresponding user record must already exist or be created for them to log in.
- When a student is **deleted** in the `/api/students/:id` route, the code fetches the student's email and also performs `DELETE FROM users WHERE email = studentEmail AND role = 'student'` to ensure full cleanup.

### 📅 Attendance API
- **Bulk Marking:** Supports array-based marking (`{ bulk: [...] }`) to mark attendance for an entire class at once.
- **Summary Logic:** Calculates the attendance percentage dynamically for student dashboard views.

### 👥 User Management API
- **Admin Only:** Allows listing all users, searching, changing roles (Admin ↔ Student), and deleting accounts.
- **Protection Logic:** Prevents admins from deleting their own account or changing their own role.

---

## 📁 Key File Map

### Backend (Node.js/Express)
- `server.js`: Central Express app setup and route registration.
- `config/db.js`: Promised-based MySQL query wrapper.
- `middleware/auth.js`: Logic for verifying identity and admin status.
- `routes/users.js`: Logic for managing system accounts.
- `routes/students.js`: The heart of student logic (CRUD + cleanup).

### Frontend (Angular 17)
- `app.component.ts`: Navbar, login-sensitive navigation visibility, and theme toggle.
- `api.service.ts`: All-in-one service for HTTP communication. Uses `HttpParams` for search and pagination.
- `auth.service.ts`: Uses Angular **Signals** (`userSignal`, `isLoggedIn` computed) for reactive UI state.
- `styles.css`: The entire visual design system, including dark mode overrides for Bootstrap 5.3.

---

## 📈 Current Business Logic Features

1. **Conditional Navbar:** Home, About, and Contact are ONLY visible to guests. Once logged in, the navbar flips to "Dashboard" tools.
2. **Automatic PDF Reports:** The student results page includes a button to generate a formatted PDF report card.
3. **Digital ID Cards:** Generates a visually stunning, print-ready ID card badge for students.
4. **Dark Mode Integrity:** High-contrast overrides ensure all card backgrounds and text are readable when toggled to dark.

---

## 💡 Troubleshooting Hand-off

- **Port in use:** Port 3000 is used by the backend. Use `npx kill-port 3000` to clear it if it crashes.
- **DB Setup:** Use `npm run init-db` then `npm run seed` to reset to a known good state.

---
*Created on 2026-03-23 | Documentation for AI context sharing.*
