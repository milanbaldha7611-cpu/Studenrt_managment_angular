import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Student } from '../../../core/services/api.service';

@Component({
  selector: 'app-mark-attendance',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Mark Attendance</h1>
          <p class="text-muted small mb-0">Record student presence for specific dates</p>
        </div>
        <a routerLink="/admin/attendance" class="btn btn-light bg-white border shadow-sm rounded-pill px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to List
        </a>
      </div>

      <div class="card border-0 bg-white shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <h6 class="fw-bold mb-3 text-uppercase tracking-wider small text-muted">Quick Mark Individual Student</h6>
          <div class="row g-3 align-items-end">
            <div class="col-md-3">
              <label class="form-label small fw-medium">Select Date</label>
              <input type="date" class="form-control bg-light border-0 px-3" [(ngModel)]="selectedDate" (ngModelChange)="loadStudents()" />
            </div>
            <div class="col-md-5">
              <label class="form-label small fw-medium">Search & Select Student</label>
              <select class="form-select bg-light border-0 px-3" [(ngModel)]="selectedStudentId" (ngModelChange)="onStudentChange()">
                <option [ngValue]="null" disabled selected>Choose a student...</option>
                @for (s of students; track s.id) {
                  <option [ngValue]="s.id">{{ s.first_name }} {{ s.last_name }} ({{ s.email }})</option>
                }
              </select>
            </div>
            <div class="col-md-2">
              <label class="form-label small fw-medium">Status</label>
              <select class="form-select bg-light border-0 px-3" [(ngModel)]="selectedStatus" [class.text-success]="selectedStatus === 'Present'" [class.text-danger]="selectedStatus === 'Absent'">
                <option value="Present" class="text-success fw-medium">Present</option>
                <option value="Absent" class="text-danger fw-medium">Absent</option>
              </select>
            </div>
            <div class="col-md-2">
              <button class="btn btn-primary w-100 rounded-pill d-flex align-items-center justify-content-center" (click)="markOne()" [disabled]="!selectedDate || !selectedStudentId || saving">
                 @if(saving) {
                   <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                 } @else {
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle me-1" viewBox="0 0 16 16">
                      <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
                      <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
                   </svg>
                 }
                 Save Record
              </button>
            </div>
          </div>
        </div>
      </div>

      @if (message) {
        <div class="alert border-0 shadow-sm d-flex align-items-center rounded-3 mb-4" [class.alert-success]="messageSuccess" [class.alert-danger]="!messageSuccess">
          @if(messageSuccess) {
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-check-circle-fill me-3" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
            </svg>
          } @else {
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-triangle-fill me-3" viewBox="0 0 16 16">
              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
          }
          <div>{{ message }}</div>
        </div>
      }

      <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4">
        <div class="card-header bg-transparent border-bottom d-flex flex-column flex-sm-row justify-content-between align-items-center p-4">
          <div class="mb-3 mb-sm-0">
             <h5 class="fw-bold mb-1">Bulk Attendance Register</h5>
             <span class="text-muted small">Managing records for: <strong class="text-dark">{{ selectedDate || 'No Date Selected' }}</strong></span>
          </div>
          <button class="btn btn-success rounded-pill px-4 shadow-sm d-flex align-items-center" (click)="markAllPresent()" [disabled]="!selectedDate || students.length === 0 || saving">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-all me-2" viewBox="0 0 16 16">
                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z"/>
             </svg>
            Mark Everyone Present
          </button>
        </div>
        
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 custom-table">
            <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
              <tr>
                <th scope="col" class="ps-4 rounded-start">Student Name</th>
                <th scope="col">Contact</th>
                <th scope="col" style="width: 200px;">Status Registration</th>
                <th scope="col" class="text-end pe-4 rounded-end">Quick Action</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              @for (s of students; track s.id) {
                <tr>
                  <td class="ps-4">
                    <div class="d-flex align-items-center">
                      <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style="width: 36px; height: 36px;">
                        {{ s.first_name.charAt(0) }}
                      </div>
                      <div class="fw-bold text-dark">{{ s.first_name }} {{ s.last_name }}</div>
                    </div>
                  </td>
                  <td class="text-muted small">{{ s.email }}</td>
                  <td>
                    <select class="form-select form-select-sm bg-light border-0 px-3 fw-medium" [class.text-success]="bulkStatus[s.id] === 'Present'" [class.text-danger]="bulkStatus[s.id] === 'Absent'" [(ngModel)]="bulkStatus[s.id]" (ngModelChange)="bulkStatus[s.id]=$event">
                      <option value="Present" class="text-success">Present Record</option>
                      <option value="Absent" class="text-danger">Absent Record</option>
                    </select>
                  </td>
                  <td class="text-end pe-4">
                     <button class="btn btn-sm rounded-pill px-3 py-1" [class.btn-outline-primary]="bulkStatus[s.id] === 'Present'" [class.btn-outline-danger]="bulkStatus[s.id] === 'Absent'" (click)="markFor(s)" [disabled]="saving">
                        Submit
                     </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="4" class="text-center text-muted py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-calendar-x text-light mb-3" viewBox="0 0 16 16">
                      <path d="M6.146 7.146a.5.5 0 0 1 .708 0L8 8.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 9l1.147 1.146a.5.5 0 0 1-.708.708L8 9.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 9 6.146 7.854a.5.5 0 0 1 0-.708z"/>
                      <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                    </svg>
                    <p class="mb-0">Please select a valid date to load student records.</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
})
export class MarkAttendanceComponent implements OnInit {
  students: Student[] = [];
  selectedDate = new Date().toISOString().slice(0, 10);
  selectedStudentId: number | null = null;
  selectedStatus: 'Present' | 'Absent' = 'Present';
  bulkStatus: Record<number, 'Present' | 'Absent'> = {};
  message = '';
  messageSuccess = false;
  saving = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.api.getStudents(1, 500, '').subscribe((res) => {
      this.students = res.students || [];
      this.bulkStatus = {};
      this.students.forEach((s) => (this.bulkStatus[s.id] = 'Present'));
    });
  }

  onStudentChange() { }

  markOne() {
    if (!this.selectedDate || !this.selectedStudentId) return;
    this.saving = true;
    this.message = '';
    this.api.markAttendance({ student_id: this.selectedStudentId, date: this.selectedDate, status: this.selectedStatus }).subscribe({
      next: () => {
        this.message = 'Attendance marked.';
        this.messageSuccess = true;
        this.saving = false;
      },
      error: (err) => {
        this.message = err.error?.message || 'Failed.';
        this.messageSuccess = false;
        this.saving = false;
      },
    });
  }

  markFor(s: Student) {
    if (!this.selectedDate) return;
    this.saving = true;
    this.message = '';
    this.api.markAttendance({ student_id: s.id, date: this.selectedDate, status: this.bulkStatus[s.id] || 'Present' }).subscribe({
      next: () => {
        this.message = `Saved for ${s.first_name} ${s.last_name}.`;
        this.messageSuccess = true;
        this.saving = false;
      },
      error: (err) => {
        this.message = err.error?.message || 'Failed.';
        this.messageSuccess = false;
        this.saving = false;
      },
    });
  }

  markAllPresent() {
    if (!this.selectedDate || this.students.length === 0) return;
    this.saving = true;
    this.message = '';
    const bulk = this.students.map((s) => ({ student_id: s.id, date: this.selectedDate, status: 'Present' as const }));
    this.api.markBulkAttendance(bulk).subscribe({
      next: () => {
        this.message = 'All marked Present for this date.';
        this.messageSuccess = true;
        this.saving = false;
      },
      error: (err) => {
        this.message = err.error?.message || 'Failed.';
        this.messageSuccess = false;
        this.saving = false;
      },
    });
  }
}
