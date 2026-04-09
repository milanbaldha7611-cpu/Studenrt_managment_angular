import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Result {
  id?: number;
  student_id: number;
  exam_name: string;
  subject: string;
  marks_obtained: number;
  max_marks: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  private apiUrl = 'http://localhost:3000/api/results';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getResultsByStudent(studentId: number): Observable<Result[]> {
    return this.http.get<Result[]>(`${this.apiUrl}/${studentId}`, { headers: this.getHeaders() });
  }

  addResult(result: Result): Observable<any> {
    return this.http.post(this.apiUrl, result, { headers: this.getHeaders() });
  }

  deleteResult(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }
}
