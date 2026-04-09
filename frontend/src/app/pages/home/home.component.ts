import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container-fluid px-0">
      <!-- Hero Section -->
      <div class="row align-items-center py-5 gx-5 animate-fade-in">
        <div class="col-lg-6 mb-5 mb-lg-0 text-center text-lg-start">
          <span class="badge bg-primary bg-opacity-10 text-primary mb-3 py-2 px-3">v2.0 Update ✨</span>
          <h1 class="display-3 fw-bold text-dark mb-4 lh-sm">
            Manage your campus with <span class="text-primary">Intelligence</span>
          </h1>
          <p class="lead text-muted mb-5 pe-lg-5">
            The next-generation Student Management System. Effortlessly track attendance, manage records, and provide seamless access for both administration and students.
          </p>
          <div class="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start">
            <a routerLink="/register" class="btn btn-primary btn-lg shadow-sm px-4 py-3">Get Started Today</a>
            <a routerLink="/login" class="btn btn-outline-primary btn-lg px-4 py-3 d-flex align-items-center justify-content-center gap-2">
               Student Portal
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"/>
               </svg>
            </a>
          </div>
          <div class="mt-4 pt-3 border-top d-flex align-items-center gap-4 justify-content-center justify-content-lg-start text-muted">
             <div><strong class="text-dark d-block h5 mb-0">99%</strong> Uptime</div>
             <div><strong class="text-dark d-block h5 mb-0">24/7</strong> Access</div>
          </div>
        </div>
        <div class="col-lg-6 position-relative">
          <div class="position-absolute top-50 start-50 translate-middle w-75 h-75 bg-primary bg-opacity-20 rounded-circle blur-3xl z-n1" style="filter: blur(100px);"></div>
          <img src="assets/images/hero-illustration.png" alt="Student Dashboard" class="img-fluid rounded-4 shadow-lg animate-fade-in delay-100" style="transform: perspective(1000px) rotateY(-5deg) rotateX(5deg);">
        </div>
      </div>

      <!-- Features Section -->
      <div class="row pt-5 mt-5 border-top gx-4 gy-4 animate-fade-in delay-200">
        <div class="col-12 text-center mb-4">
          <h2 class="h3 fw-bold">Everything you need</h2>
        </div>
        <div class="col-md-4">
          <div class="card h-100 p-4 text-center border-0 bg-white">
            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width: 60px; height: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0h-7zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492V2.5z"/>
              </svg>
            </div>
            <h5 class="fw-bold">Student Profiles</h5>
            <p class="text-muted small mb-0">Maintain detailed records and track academic progress securely in the cloud.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 p-4 text-center border-0 bg-white">
            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width: 60px; height: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
              </svg>
            </div>
            <h5 class="fw-bold">Smart Attendance</h5>
            <p class="text-muted small mb-0">Record and monitor attendance daily. Generate instant reports identifying absent trends.</p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card h-100 p-4 text-center border-0 bg-white">
            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width: 60px; height: 60px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16">
                <path d="M5.338 1.59a59.768 59.768 0 0 0-2.836.856c-.09.036-.18.075-.271.114V5.5c0 1.543.6 3.011 1.706 4.148A7.448 7.448 0 0 0 8 13.064c1.844-.65 3.513-1.84 4.062-3.416A7.448 7.448 0 0 0 13 5.5V2.56a0.266 0.266 0 0 0-.271-.114c-.951.272-1.916.536-2.836.856C8.803 3.65 8.163 4 8 4c-.164 0-.803-.35-1.892-.698zm6.54-1.284C11.168.618 10.323.272 9.57.062A1.9 1.9 0 0 0 8 0c-.516 0-1.01.127-1.57.262C5.677.482 4.832.828 4.122 1.12c-.933.385-2.028.913-2.671 1.25A1.5 1.5 0 0 0 0 3.734V5.5c0 2.062.84 3.999 2.193 5.342C3.877 12.518 5.764 14.116 8 15a1 1 0 0 0 .73-.027c2.235-.918 4.122-2.527 5.418-4.145C15.16 9.499 16 7.562 16 5.5V3.734a1.5 1.5 0 0 0-.85-1.365c-.643-.337-1.738-.865-2.67-1.25l-.001-.001z"/>
                <path d="M8 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0-3a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm3 6H5a1 1 0 0 0-1 1v1h8v-1a1 1 0 0 0-1-1z"/>
              </svg>
            </div>
            <h5 class="fw-bold">Secure Portals</h5>
            <p class="text-muted small mb-0">Role-based robust security ensures Data privacy for admin and students alike.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent { }
