import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, UpperCasePipe],
  template: `
    <nav class="navbar navbar-expand-lg sticky-top animate-fade-in" style="animation-duration: 0.8s;">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2 animate-slide-right" style="opacity: 0;" routerLink="/">
          <div class="bg-primary text-white rounded d-flex align-items-center justify-content-center" style="width: 32px; height: 32px;">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
               <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
               <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
             </svg>
          </div>
          StudentTech
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse animate-fade-in delay-200" style="opacity: 0;" id="navbarNav">
          <ul class="navbar-nav me-auto ps-lg-3">
            @if (!auth.isLoggedIn()) {
              <li class="nav-item"><a class="nav-link" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/about" routerLinkActive="active">About</a></li>
              <li class="nav-item"><a class="nav-link" routerLink="/contact" routerLinkActive="active">Contact Us</a></li>
            }
            @if (auth.user(); as u) {
              @if (u.role === 'admin') {
                <li class="nav-item"><a class="nav-link" routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" routerLink="/admin/students" routerLinkActive="active">Students</a></li>
                <li class="nav-item"><a class="nav-link" routerLink="/admin/attendance" routerLinkActive="active">Attendance</a></li>
                <li class="nav-item"><a class="nav-link" routerLink="/admin/results" routerLinkActive="active">Results</a></li>
                <li class="nav-item"><a class="nav-link" routerLink="/admin/users" routerLinkActive="active">Users</a></li>
              } @else {
                <li class="nav-item"><a class="nav-link" routerLink="/student/dashboard" routerLinkActive="active">My Dashboard</a></li>
              }
            }
          </ul>
          <ul class="navbar-nav align-items-lg-center gap-2">
            <li class="nav-item me-1 d-flex align-items-center">
               <button class="btn btn-sm btn-outline-secondary rounded-circle d-flex align-items-center justify-content-center border-0" style="width: 32px; height: 32px;" (click)="toggleTheme()" [title]="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'">
                 <span style="font-size: 1rem; line-height: 1;">{{ isDarkMode ? '☀️' : '🌙' }}</span>
               </button>
            </li>
            @if (!auth.isLoggedIn()) {
              <li class="nav-item"><a class="nav-link" routerLink="/login">Login</a></li>
              <li class="nav-item"><a class="btn btn-primary btn-sm px-3 rounded-pill hover-pulse" routerLink="/register">Register</a></li>
            } @else {
              <li class="nav-item">
                <span class="nav-link d-flex align-items-center gap-2">
                  <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 30px; height: 30px; font-size: 0.8rem;">
                    {{ auth.user()?.name?.charAt(0) | uppercase }}
                  </div>
                  {{ auth.user()?.name }} 
                  <span class="badge text-bg-light border text-muted ms-1" style="font-size: 0.65rem;">{{ auth.user()?.role | uppercase }}</span>
                </span>
              </li>
              <li class="nav-item"><a class="btn btn-outline-danger btn-sm px-3 rounded-pill ms-lg-2 mt-2 mt-lg-0" href="#" (click)="logout($event)">Logout</a></li>
            }
          </ul>
        </div>
      </div>
    </nav>
    <main class="container py-4 animate-fade-in delay-300" style="opacity: 0;">
      <router-outlet></router-outlet>
    </main>
    <footer class="bg-transparent text-center py-4 mt-auto animate-fade-in delay-400" style="opacity: 0;">
      <div class="container text-muted small">
        <p class="mb-0">Powered by <strong>StudentTech</strong> &copy; {{ year }}.</p>
      </div>
    </footer>
  `,
})
export class AppComponent implements OnInit {
  year = new Date().getFullYear();
  isDarkMode = false;
  
  constructor(public auth: AuthService) { }

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode = true;
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-theme');
      document.documentElement.setAttribute('data-bs-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      document.documentElement.setAttribute('data-bs-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
  }

  logout(e: Event) {
    e.preventDefault();
    this.auth.logout();
  }
}
