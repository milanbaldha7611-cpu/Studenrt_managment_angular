import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  { path: '', canActivate: [guestGuard], loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent) },
  { path: 'about', canActivate: [guestGuard], loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent) },
  { path: 'contact', canActivate: [guestGuard], loadComponent: () => import('./pages/contact/contact.component').then((m) => m.ContactComponent) },
  { path: 'register', canActivate: [guestGuard], loadComponent: () => import('./pages/register/register.component').then((m) => m.RegisterComponent) },
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent) },
  { path: 'admin-login', canActivate: [guestGuard], loadComponent: () => import('./pages/admin-login/admin-login.component').then((m) => m.AdminLoginComponent) },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/admin/dashboard/dashboard.component').then((m) => m.DashboardComponent) },
      { path: 'students', loadComponent: () => import('./pages/admin/students/students-list.component').then((m) => m.StudentsListComponent) },
      { path: 'students/add', loadComponent: () => import('./pages/admin/students/student-form.component').then((m) => m.StudentFormComponent) },
      { path: 'students/edit/:id', loadComponent: () => import('./pages/admin/students/student-form.component').then((m) => m.StudentFormComponent) },
      { path: 'attendance', loadComponent: () => import('./pages/admin/attendance/attendance-list.component').then((m) => m.AttendanceListComponent) },
      { path: 'attendance/mark', loadComponent: () => import('./pages/admin/attendance/mark-attendance.component').then((m) => m.MarkAttendanceComponent) },
      { path: 'attendance/present', loadComponent: () => import('./pages/admin/attendance/present-on-date.component').then((m) => m.PresentOnDateComponent) },
      { path: 'attendance/student/:id', loadComponent: () => import('./pages/admin/attendance/student-attendance.component').then((m) => m.StudentAttendanceComponent) },
      { path: 'results', loadComponent: () => import('./pages/admin/results/results-admin.component').then((m) => m.ResultsAdminComponent) },
      { path: 'users', loadComponent: () => import('./pages/admin/users/users-list.component').then((m) => m.UsersListComponent) },
    ],
  },
  {
    path: 'student',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./pages/student/dashboard/student-dashboard.component').then((m) => m.StudentDashboardComponent) },
      { path: 'id-card', loadComponent: () => import('./pages/student/id-card/student-id-card.component').then((m) => m.StudentIdCardComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
