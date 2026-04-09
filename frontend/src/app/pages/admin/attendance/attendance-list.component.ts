import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, AttendanceRecord } from '../../../core/services/api.service';

@Component({
  selector: 'app-attendance-list',
  standalone: true,
  imports: [RouterLink, FormsModule],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Attendance Records</h1>
          <p class="text-muted small mb-0">View and filter student attendance history</p>
        </div>
        <div class="d-flex gap-2">
           <a routerLink="/admin/attendance/present" class="btn btn-light bg-white border border-primary text-primary rounded-pill px-4 shadow-sm d-flex align-items-center fw-medium">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check me-2" viewBox="0 0 16 16">
              <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
              <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
            </svg>
            Present on Date
          </a>
          <a routerLink="/admin/attendance/mark" class="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square me-2" viewBox="0 0 16 16">
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
            </svg>
            Mark Attendance
          </a>
        </div>
      </div>

      <div class="card border-0 bg-white shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <label class="form-label small fw-medium text-muted text-uppercase tracking-wider">Filter by specific date</label>
              <div class="position-relative">
                <input type="date" class="form-control bg-light border-0 ps-3 pe-4 py-2 rounded-3" [(ngModel)]="dateFilter" (change)="load(1)" />
              </div>
            </div>
            <div class="col-md-2">
              <button class="btn btn-light border py-2 w-100 rounded-3 text-muted fw-medium d-flex align-items-center justify-content-center" (click)="dateFilter=''; load(1)">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg me-1" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
                Clear Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 custom-table">
            <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
              <tr>
                <th scope="col" class="ps-4 rounded-start">Date</th>
                <th scope="col">Student</th>
                <th scope="col">Contact Info</th>
                <th scope="col">Course</th>
                <th scope="col">Status</th>
                <th scope="col" class="text-end pe-4 rounded-end">Action</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              @for (a of attendance; track a.id) {
                <tr>
                  <td class="ps-4">
                    <div class="d-flex align-items-center text-dark fw-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event text-muted me-2" viewBox="0 0 16 16">
                        <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                        <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                      </svg>
                      {{ a.date }}
                    </div>
                  </td>
                  <td>
                    <div class="fw-bold text-dark">{{ a.first_name }} {{ a.last_name }}</div>
                  </td>
                  <td>
                    <div class="text-muted small d-flex align-items-center">
                       <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-envelope-fill me-1" viewBox="0 0 16 16">
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                        </svg>
                        {{ a.email }}
                    </div>
                  </td>
                  <td>
                     <span class="badge bg-secondary bg-opacity-10 text-secondary border fw-medium px-2 py-1 rounded-pill">{{ a.course || 'Unassigned' }}</span>
                  </td>
                  <td>
                     <span class="badge rounded-pill fw-medium px-3 py-2" [class.bg-success-subtle]="a.status==='Present'" [class.text-success]="a.status==='Present'" [class.bg-danger-subtle]="a.status==='Absent'" [class.text-danger]="a.status==='Absent'">
                         @if(a.status === 'Present') {
                           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-check-circle-fill me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                          </svg>
                         } @else {
                           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-x-circle-fill me-1" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                          </svg>
                         }
                         {{ a.status }}
                       </span>
                  </td>
                  <td class="text-end pe-4">
                    <a [routerLink]="['/admin/attendance/student', a.student_id]" class="btn btn-light btn-sm rounded-pill px-3 border shadow-sm fw-medium d-inline-flex align-items-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock-history me-1" viewBox="0 0 16 16">
                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79A6.99 6.99 0 0 0 13 2.508l.615-.789c.356.277.69.584.998.917l-.784.615zm1.469 2.015A7.004 7.004 0 0 0 14.59 4.35l.87-.492a8.028 8.028 0 0 1 1.082 1.78l-.933.361zM6.5 14.485V13h-1v1.485c-.328.082-.662.138-1 .165v-1.026h-1v1.026a8.038 8.038 0 0 1-2.022-.656v-.884h-1v.884a8.03 8.03 0 0 1-1.611-1.282v-.713h-1v.713A8.04 8.04 0 0 1 0 8a8.04 8.04 0 0 1 .585-2.99l.867.5A7.045 7.045 0 0 0 1 8a7 7 0 0 0 1.956 4.908L3 12.9v1.06A6 6 0 0 0 8 14c.168 0 .334-.012.5-.034z"/>
                        <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
                      </svg>
                      History
                    </a>
                  </td>
                </tr>
              } @empty {
                <tr>
                   <td colspan="6" class="text-center text-muted py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-list-task text-light mb-3" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"/>
                      <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"/>
                      <path fill-rule="evenodd" d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"/>
                    </svg>
                    <p class="mb-0">No attendance records documented yet.</p>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
        
        @if (pagination.totalPages > 1) {
          <div class="card-footer bg-white border-top p-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
            <span class="small text-muted fw-bold text-uppercase tracking-wider">Total Records: <span class="text-dark">{{ pagination.total }}</span></span>
            <nav>
              <ul class="pagination pagination-sm mb-0">
                <li class="page-item" [class.disabled]="pagination.page <= 1">
                  <a class="page-link rounded-start-pill px-3" href="#" (click)="load(pagination.page - 1); $event.preventDefault()">Previous</a>
                </li>
                @for (p of pages; track p) {
                  <li class="page-item" [class.active]="p === pagination.page">
                    <a class="page-link px-3" href="#" (click)="load(p); $event.preventDefault()">{{ p }}</a>
                  </li>
                }
                <li class="page-item" [class.disabled]="pagination.page >= pagination.totalPages">
                  <a class="page-link rounded-end-pill px-3" href="#" (click)="load(pagination.page + 1); $event.preventDefault()">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        }
      </div>
    </div>
  `,
})
export class AttendanceListComponent implements OnInit {
  attendance: AttendanceRecord[] = [];
  dateFilter = '';
  pagination = { page: 1, limit: 10, total: 0, totalPages: 0 };
  get pages(): number[] {
    const p = this.pagination;
    const arr: number[] = [];
    for (let i = Math.max(1, p.page - 2); i <= Math.min(p.totalPages, p.page + 2); i++) arr.push(i);
    return arr;
  }

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.load(1);
  }

  load(page: number) {
    this.api.getAttendance(page, this.pagination.limit, this.dateFilter).subscribe((res) => {
      this.attendance = res.attendance || [];
      this.pagination = res.pagination;
    });
  }
}
