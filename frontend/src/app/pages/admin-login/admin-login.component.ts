import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="row justify-content-center align-items-center mt-4 mb-5 animate-fade-in">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card p-4 p-md-5 border-0" style="background: rgba(30, 41, 59, 0.95); backdrop-filter: blur(12px);">
          <div class="text-center mb-4">
            <div class="bg-white bg-opacity-10 text-white rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3 shadow" style="width: 64px; height: 64px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
              </svg>
            </div>
            <h2 class="h3 fw-bold mb-1 text-white">Admin System</h2>
            <p class="text-white-50 small">Secure portal for staff & management</p>
          </div>
          <div class="alert alert-danger border-0 bg-danger bg-opacity-25 text-white" *ngIf="errorMessage">{{ errorMessage }}</div>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="form-label fw-medium text-white-50 small">Admin Email</label>
              <input type="email" class="form-control form-control-lg fs-6 bg-dark text-white border-secondary border-opacity-50" formControlName="email" placeholder="admin@school.com" style="color-scheme: dark;" />
              <div class="text-danger small mt-1" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">Valid email is required.</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-medium text-white-50 small">Secure Password</label>
              <input type="password" class="form-control form-control-lg fs-6 bg-dark text-white border-secondary border-opacity-50" formControlName="password" placeholder="••••••••" style="color-scheme: dark;" />
              <div class="text-danger small mt-1" *ngIf="form.get('password')?.invalid && form.get('password')?.touched">Password is required.</div>
            </div>
            <button type="submit" class="btn btn-light btn-lg w-100 fs-6 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2" [disabled]="form.invalid || loading">
              @if(loading) {
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Authenticating...
              } @else {
                Authorize Access
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-check" viewBox="0 0 16 16">
                  <path d="M5.338 1.59a59.768 59.768 0 0 0-2.836.856c-.09.036-.18.075-.271.114V5.5c0 1.543.6 3.011 1.706 4.148A7.448 7.448 0 0 0 8 13.064c1.844-.65 3.513-1.84 4.062-3.416A7.448 7.448 0 0 0 13 5.5V2.56a0.266 0.266 0 0 0-.271-.114c-.951.272-1.916.536-2.836.856C8.803 3.65 8.163 4 8 4c-.164 0-.803-.35-1.892-.698zM10.854 6.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 8.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              }
            </button>
          </form>
          <div class="text-center mt-4 pt-3 border-top border-secondary border-opacity-25">
            <p class="mb-0 text-white-50 small">
              Return to <a routerLink="/login" class="fw-bold text-white text-decoration-none border-bottom border-light">Student Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class AdminLoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    if (this.form.invalid) return;
    const email = this.form.get('email')?.value ?? '';
    const password = this.form.get('password')?.value ?? '';
    if (!email || !password) return;
    this.loading = true;
    this.errorMessage = '';
    this.auth.login(email, password).subscribe({
      next: (res) => {
        this.loading = false;
        const user = res?.user;
        if (user?.role === 'admin') {
          this.router.navigate(['/admin/dashboard']);
        } else {
          this.router.navigate(['/student/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        if (!err || err.status === 0) {
          this.errorMessage = 'Cannot reach server. Is the backend running at http://localhost:3000?';
        } else {
          this.errorMessage = (err.error && err.error.message) ? err.error.message : 'Login failed.';
        }
      },
    });
  }
}
