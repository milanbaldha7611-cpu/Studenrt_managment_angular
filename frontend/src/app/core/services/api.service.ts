import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Student {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  enrollment_no?: string;
  phone?: string;
  course?: string;
  semester?: string;
  gender?: string;
  college_name?: string;
  university_name?: string;
  created_at?: string;
}

export interface AttendanceRecord {
  id: number;
  student_id: number;
  date: string;
  status: 'Present' | 'Absent';
  first_name?: string;
  last_name?: string;
  email?: string;
  course?: string;
}

export interface PaginatedResponse<T> {
  students?: T[];
  attendance?: T[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getStudents(page = 1, limit = 10, search = '', semester = ''): Observable<PaginatedResponse<Student>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search) params = params.set('search', search);
    if (semester) params = params.set('semester', semester);
    return this.http.get<PaginatedResponse<Student>>(`${this.base}/students`, { params });
  }

  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.base}/students/${id}`);
  }

  getMyStudentRecord(): Observable<Student> {
    return this.http.get<Student>(`${this.base}/students/me/record`);
  }

  addStudent(student: Partial<Student>): Observable<Student> {
    return this.http.post<Student>(`${this.base}/students`, student);
  }

  updateStudent(id: number, student: Partial<Student>): Observable<Student> {
    return this.http.put<Student>(`${this.base}/students/${id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/students/${id}`);
  }

  getAttendance(page = 1, limit = 10, date = ''): Observable<PaginatedResponse<AttendanceRecord>> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (date) params = params.set('date', date);
    return this.http.get<PaginatedResponse<AttendanceRecord>>(`${this.base}/attendance`, { params });
  }

  getPresentOnDate(date: string): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(`${this.base}/attendance/present-on-date`, {
      params: { date },
    });
  }

  getStudentAttendance(studentId: number): Observable<{
    student: { first_name: string; last_name: string } | null;
    attendance: AttendanceRecord[];
    summary: { total: number; present: number; absent: number; percentage: number };
  }> {
    return this.http.get(`${this.base}/attendance/student/${studentId}`) as Observable<any>;
  }

  markAttendance(data: { student_id: number; date: string; status: string }): Observable<any> {
    return this.http.post(`${this.base}/attendance`, data);
  }

  markBulkAttendance(bulk: { student_id: number; date: string; status?: string }[]): Observable<any> {
    return this.http.post(`${this.base}/attendance`, { bulk });
  }

  getDashboardStats(): Observable<{ totalStudents: number; totalAttendanceRecords: number }> {
    return this.http.get<{ totalStudents: number; totalAttendanceRecords: number }>(
      `${this.base}/dashboard/admin`
    );
  }

  // ── User Management ──────────────────────────────────────────────────────────
  getUsers(page = 1, limit = 10, search = ''): Observable<{ users: AppUser[]; pagination: any }> {
    let params = new HttpParams().set('page', page).set('limit', limit);
    if (search) params = params.set('search', search);
    return this.http.get<{ users: AppUser[]; pagination: any }>(`${this.base}/users`, { params });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/users/${id}`);
  }

  updateUserRole(id: number, role: 'admin' | 'student'): Observable<any> {
    return this.http.patch(`${this.base}/users/${id}/role`, { role });
  }

  createUser(data: { name: string; email: string; password: string; role: string }): Observable<AppUser> {
    return this.http.post<AppUser>(`${this.base}/users`, data);
  }
}

export interface AppUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'student';
  created_at?: string;
}

