import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSignal = signal<User | null>(null);
  user = this.userSignal.asReadonly();
  isLoggedIn = computed(() => !!this.userSignal());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const token = localStorage.getItem('token');
    if (token) {
      this.fetchMe().subscribe({ error: () => this.userSignal.set(null) });
    }
  }

  register(name: string, email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(`${environment.apiUrl}/auth/register`, { name, email, password })
      .pipe(tap((res) => this.setSession(res.token, res.user)));
  }

  login(email: string, password: string): Observable<{ token: string; user: User }> {
    return this.http
      .post<{ token: string; user: User }>(`${environment.apiUrl}/auth/login`, { email, password })
      .pipe(tap((res) => this.setSession(res.token, res.user)));
  }

  logout(): void {
    localStorage.removeItem('token');
    this.userSignal.set(null);
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
      window.location.reload();
    });
  }

  private setSession(token: string, user: User): void {
    localStorage.setItem('token', token);
    this.userSignal.set(user);
  }

  private fetchMe(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/auth/me`).pipe(
      tap((u) => this.userSignal.set(u))
    );
  }

  isAdmin(): boolean {
    return this.userSignal()?.role === 'admin';
  }
}
