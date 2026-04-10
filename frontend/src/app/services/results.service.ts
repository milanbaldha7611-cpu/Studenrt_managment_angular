import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Result {
  id?: number;
  student_id: number;
  exam_name: string;
  subject: string;
  semester: string;
  marks_obtained: number;
  max_marks: number;
  first_name?: string; // For admin joining
  last_name?: string;
  course?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = `${environment.apiUrl}/results`;

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllResults(): Observable<Result[]> {
    return this.http.get<Result[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getResultsByStudent(studentId: number): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/${studentId}`, { headers: this.getHeaders() });
  }

  addResult(result: Result): Observable<any> {
    return this.http.post(this.apiUrl, result, { headers: this.getHeaders() });
  }

  updateResult(id: number, result: Partial<Result>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, result, { headers: this.getHeaders() });
  }

  deleteResult(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
