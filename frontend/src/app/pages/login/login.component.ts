import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="row justify-content-center align-items-center mt-4 mb-5 animate-fade-in">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card p-4 p-md-5 border-0 bg-white bg-opacity-75">
          <div class="text-center mb-4">
            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width: 64px; height: 64px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
              </svg>
            </div>
            <h2 class="h3 fw-bold mb-1">Welcome Back</h2>
            <p class="text-muted small">Sign in to your student portal</p>
          </div>
          <div class="alert alert-danger" *ngIf="errorMessage">{{ errorMessage }}</div>
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="form-label fw-medium text-dark small">Email Address</label>
              <input type="email" class="form-control form-control-lg fs-6" formControlName="email" placeholder="student@example.com" />
              <div class="text-danger small mt-1" *ngIf="form.get('email')?.invalid && form.get('email')?.touched">Valid email is required.</div>
            </div>
            <div class="mb-4">
              <label class="form-label fw-medium text-dark small">Password</label>
              <input type="password" class="form-control form-control-lg fs-6" formControlName="password" placeholder="••••••••" />
              <div class="text-danger small mt-1" *ngIf="form.get('password')?.invalid && form.get('password')?.touched">Password is required.</div>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100 fs-6 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2" [disabled]="form.invalid || loading">
              @if(loading) {
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Signing in...
              } @else {
                Login securely
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              }
            </button>
          </form>
          <div class="text-center mt-4 pt-3 border-top">
            <p class="mb-1 text-muted small">
              Don't have an account? <a routerLink="/register" class="fw-bold text-primary text-decoration-none">Register</a>
            </p>
            <p class="mb-0 text-muted small">
              Are you an administrator? <a routerLink="/admin-login" class="fw-bold text-secondary text-decoration-none">Admin Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class LoginComponent {
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
