import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, AttendanceRecord } from '../../../core/services/api.service';

@Component({
  selector: 'app-present-on-date',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Present Students Viewer</h1>
          <p class="text-muted small mb-0">Discover who attended classes on any specific day.</p>
        </div>
        <a routerLink="/admin/attendance" class="btn btn-light bg-white border shadow-sm rounded-pill px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to Records
        </a>
      </div>

      <div class="card border-0 bg-white shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <label class="form-label fw-bold text-muted small text-uppercase tracking-wider">Select Attendance Date</label>
          <div class="input-group" style="max-width: 320px;">
            <input type="date" class="form-control bg-light border-0 px-3 py-2 text-dark" [(ngModel)]="selectedDate" (ngModelChange)="load()" />
            <button class="btn btn-primary px-4 fw-medium" (click)="load()">Filter</button>
          </div>
        </div>
      </div>

      <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4">
        <div class="card-header bg-transparent border-bottom p-4">
          <h5 class="fw-bold mb-0 d-flex align-items-center">
             <span class="bg-success bg-opacity-10 text-success p-2 rounded-circle me-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
             </span>
             Recorded Present for {{ selectedDate || 'No Date Selected' }}
          </h5>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 custom-table">
            <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
              <tr>
                <th scope="col" class="ps-4"># ID</th>
                <th scope="col">Student Details</th>
                <th scope="col">Contact</th>
                <th scope="col" class="pe-4">Associated Course</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              @for (a of list; track a.id; let i = $index) {
                <tr>
                  <td class="ps-4 text-muted fw-medium">{{ a.student_id }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                       <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style="width: 36px; height: 36px;">
                          {{ a.first_name ? a.first_name.charAt(0) : '?' }}
                       </div>
                       <div class="fw-bold text-dark">{{ a.first_name }} {{ a.last_name }}</div>
                    </div>
                  </td>
                  <td class="text-muted small">{{ a.email }}</td>
                  <td class="pe-4">
                    <span class="badge bg-secondary bg-opacity-10 text-secondary border fw-medium px-2 py-1 rounded-pill">{{ a.course || 'Unassigned' }}</span>
                  </td>
                </tr>
              } @empty {
                <tr>
                   <td colspan="4" class="text-center text-muted py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-x-octagon text-light mb-3" viewBox="0 0 16 16">
                      <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                    <p class="mb-0">No records found matching this date, or nobody was recorded present yet.</p>
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
export class PresentOnDateComponent implements OnInit {
  selectedDate = new Date().toISOString().slice(0, 10);
  list: AttendanceRecord[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.load();
  }

  load() {
    if (!this.selectedDate) return;
    this.api.getPresentOnDate(this.selectedDate).subscribe((res) => (this.list = res));
  }
}
