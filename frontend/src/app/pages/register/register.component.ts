import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="row justify-content-center align-items-center mt-4 mb-5 animate-fade-in">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card p-4 p-md-5 border-0 bg-white bg-opacity-75">
          <div class="text-center mb-4">
            <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style="width: 64px; height: 64px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
              </svg>
            </div>
            <h2 class="h3 fw-bold mb-1">Create Account</h2>
            <p class="text-muted small">Join your campus platform today</p>
          </div>
          @if (errorMessage) {
            <div class="alert alert-danger">{{ errorMessage }}</div>
          }
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="mb-4">
              <label class="form-label fw-medium text-dark small">Full Name</label>
              <input type="text" class="form-control form-control-lg fs-6" formControlName="name" placeholder="John Doe" />
              @if (form.get('name')?.invalid && form.get('name')?.touched) {
                <div class="text-danger small mt-1">Name is required.</div>
              }
            </div>
            <div class="mb-4">
              <label class="form-label fw-medium text-dark small">Email Address</label>
              <input type="email" class="form-control form-control-lg fs-6" formControlName="email" placeholder="student@example.com" />
              @if (form.get('email')?.invalid && form.get('email')?.touched) {
                <div class="text-danger small mt-1">Valid email is required.</div>
              }
            </div>
            <div class="mb-4">
              <label class="form-label fw-medium text-dark small">Password</label>
              <input type="password" class="form-control form-control-lg fs-6" formControlName="password" placeholder="••••••••" />
              @if (form.get('password')?.invalid && form.get('password')?.touched) {
                <div class="text-danger small mt-1">Password must be at least 6 characters.</div>
              }
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100 fs-6 fw-bold mb-3 d-flex align-items-center justify-content-center gap-2" [disabled]="form.invalid || loading">
              @if(loading) {
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Registering...
              } @else {
                Create Account
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                </svg>
              }
            </button>
          </form>
          <div class="text-center mt-4 pt-3 border-top">
            <p class="mb-0 text-muted small">
              Already have an account? <a routerLink="/login" class="fw-bold text-primary text-decoration-none">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    this.auth
      .register(
        this.form.value.name!,
        this.form.value.email!,
        this.form.value.password!
      )
      .subscribe({
        next: () => this.router.navigate(['/student/dashboard']),
        error: (err) => {
          this.errorMessage = err.error?.message || 'Registration failed.';
          this.loading = false;
        },
      });
  }
}
