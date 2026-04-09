import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="animate-fade-in pb-5 max-w-5xl mx-auto" style="max-width: 1100px;">
      <!-- Hero Section of About -->
      <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4 mb-5 position-relative">
        <div class="row g-0">
          <div class="col-lg-6 p-5 p-lg-5 d-flex flex-column justify-content-center position-relative overflow-hidden z-1 bg-light">
             <div class="position-absolute top-0 start-0 w-100 h-100 bg-primary opacity-tooltip" style="opacity: 0.02;"></div>
             <div class="mb-3">
               <span class="badge bg-primary bg-opacity-10 text-primary border border-primary-subtle rounded-pill px-3 py-2 fw-medium mb-3 shadow-none">Our Vision</span>
             </div>
             <h1 class="display-5 fw-bold text-dark mb-4 lh-base position-relative z-1">
               Empowering The Future of <span class="text-primary position-relative d-inline-block">Education
                 <svg class="position-absolute bottom-0 start-0 w-100 text-primary" style="height: 12px; margin-bottom: -4px; z-index: -1;" viewBox="0 0 100 20" preserveAspectRatio="none">
                    <path d="M0 20 Q50 0 100 20" fill="currentColor" fill-opacity="0.2"/>
                 </svg>
               </span>
             </h1>
             <p class="lead text-muted mb-4 position-relative z-1" style="font-size: 1.1rem; line-height: 1.7;">
               Our Student Management System provides a seamless, digital-first experience tailored to modern academic institutions. It bridges the gap between administrators, educators, and students by removing paperwork.
             </p>
             <div class="d-flex flex-wrap gap-3 position-relative z-1 mt-2">
               <a routerLink="/register" class="btn btn-primary rounded-pill px-5 py-2 shadow-sm fw-medium transition-all d-flex align-items-center">
                 Join Now
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right ms-2" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                 </svg>
               </a>
               <a routerLink="/" class="btn btn-light bg-white border border-secondary border-opacity-25 rounded-pill px-4 py-2 shadow-sm text-dark fw-medium transition-all hover-lift">Back to Home</a>
             </div>
          </div>
          <div class="col-lg-6 d-none d-lg-block position-relative">
             <div class="position-absolute top-0 start-0 w-100 h-100 bg-gradient" style="background: linear-gradient(90deg, rgba(248, 249, 250, 1) 0%, rgba(248, 249, 250, 0) 100%); z-index: 1;"></div>
             <img src="assets/images/about_hero.png" alt="University Campus Concept" class="img-fluid w-100 h-100 object-fit-cover shadow-sm bg-light" style="object-position: center right;">
          </div>
        </div>
      </div>

      <!-- Core Features Grid -->
      <div class="text-center mb-5 mt-5 pt-3">
        <h2 class="h3 fw-bold mb-3 text-dark">Core Capabilities</h2>
        <p class="text-muted mx-auto" style="max-width: 600px;">A fully-featured platform designed and built specifically to simplify daily administrative operations and give students clarity.</p>
      </div>

      <div class="row g-4 mb-5">
        <!-- Feature 1 -->
        <div class="col-md-4">
          <div class="card h-100 border-0 bg-white shadow-sm rounded-4 text-center p-4 p-xl-5 transition-all hover-lift glass-card-hover">
             <div class="bg-primary bg-opacity-10 text-primary rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4 transition-all" style="width: 72px; height: 72px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-vcard" viewBox="0 0 16 16">
                  <path d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>
                  <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z"/>
                </svg>
             </div>
             <h4 class="fw-bold fs-5 text-dark mb-3">Profile Management</h4>
             <p class="text-muted small mb-0 lh-lg text-start mx-auto" style="max-width: 280px;">Maintain a secure and centralized directory for managing all student contact information and enrollments securely without paperwork.</p>
          </div>
        </div>
        
        <!-- Feature 2 -->
        <div class="col-md-4">
          <div class="card h-100 border-0 bg-white shadow-sm rounded-4 text-center p-4 p-xl-5 transition-all hover-lift glass-card-hover">
             <div class="bg-success bg-opacity-10 text-success rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4 transition-all" style="width: 72px; height: 72px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z"/>
                </svg>
             </div>
             <h4 class="fw-bold fs-5 text-dark mb-3">Attendance Insights</h4>
             <p class="text-muted small mb-0 lh-lg text-start mx-auto" style="max-width: 280px;">Teachers can log daily attendance effortlessly, while students view unique graphical circular charts showcasing their exact presence percent.</p>
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="col-md-4">
           <div class="card h-100 border-0 bg-white shadow-sm rounded-4 text-center p-4 p-xl-5 transition-all hover-lift glass-card-hover">
             <div class="bg-danger bg-opacity-10 text-danger rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4 transition-all" style="width: 72px; height: 72px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-shield-lock" viewBox="0 0 16 16">
                  <path d="M5.338 1.59a59.768 59.768 0 0 0-2.836.856c-.09.036-.127.146-.127.253v.234c0 3.84 1.516 7.376 3.967 10.081 2.451-2.705 3.967-6.241 3.967-10.081V2.7c0-.107-.037-.217-.127-.253a59.768 59.768 0 0 0-2.836-.856C6.793 1.488 6.082 1.5 5.338 1.59zM8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477-.787 7.795 2.465 11.478 1.524 1.724 3.125 2.486 3.953 2.684.212.05.433.05.645 0 .828-.198 2.429-.96 3.953-2.684 3.252-3.683 3.061-7.001 2.465-11.478A1.54 1.54 0 0 0 13.815 1.43c-.658-.215-1.777-.57-2.887-.87C9.843.265 8.69 0 8 0z"/>
                  <path d="M5.072 11.236A2.5 2.5 0 0 1 8 5.5a2.5 2.5 0 0 1 2.928 5.736A2.49 2.49 0 0 1 8 12.5a2.49 2.49 0 0 1-2.928-1.264ZM7 7.5a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM6.2 11h3.6a1.5 1.5 0 0 0-3.6 0Z"/>
                </svg>
             </div>
             <h4 class="fw-bold fs-5 text-dark mb-3">Role-based Access</h4>
             <p class="text-muted small mb-0 lh-lg text-start mx-auto" style="max-width: 280px;">Implement strict security access layers. Distinguish permissions dynamically securely serving both Administration staff and Enrolled students.</p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AboutComponent { }
