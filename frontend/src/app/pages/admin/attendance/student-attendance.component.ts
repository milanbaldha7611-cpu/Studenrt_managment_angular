import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService, AttendanceRecord } from '../../../core/services/api.service';

@Component({
  selector: 'app-student-attendance',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Student Attendance History</h1>
          <p class="text-muted small mb-0">Detailed history of past attendance logs.</p>
        </div>
        <a routerLink="/admin/attendance" class="btn btn-light bg-white border shadow-sm rounded-pill px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back
        </a>
      </div>

      @if (student) {
        <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4 mb-4 position-relative">
          <div class="position-absolute bottom-0 end-0 p-3 opacity-10" style="transform: translate(10%, 20%); z-index: 0;">
            <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" fill="var(--primary)" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
            </svg>
          </div>
          <div class="card-header bg-transparent border-bottom p-4 position-relative z-1 d-flex align-items-center">
             <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm" style="width: 48px; height: 48px; font-size: 1.25rem;">
                {{ student.first_name.charAt(0) }}
             </div>
             <div>
                <h5 class="fw-bold mb-0 text-dark">{{ student.first_name }} {{ student.last_name }}</h5>
                <span class="text-muted small">Comprehensive Report</span>
             </div>
          </div>
          <div class="card-body p-4 pt-3 position-relative z-1">
             <div class="row text-center mt-2 w-100 max-w-lg mx-auto">
                 <div class="col-3 border-end">
                  <div class="text-muted small fw-bold text-uppercase mb-1">Total Logs</div>
                  <div class="fs-4 fw-bold text-dark">{{ summary.total }}</div>
                 </div>
                 <div class="col-3 border-end">
                  <div class="text-success small fw-bold text-uppercase mb-1">Present</div>
                  <div class="fs-4 fw-bold">{{ summary.present }}</div>
                 </div>
                 <div class="col-3 border-end">
                  <div class="text-danger small fw-bold text-uppercase mb-1">Absent</div>
                  <div class="fs-4 fw-bold">{{ summary.absent }}</div>
                 </div>
                 <div class="col-3">
                  <div class="text-primary small fw-bold text-uppercase mb-1">Rate</div>
                  <div class="fs-4 fw-bold">{{ summary.percentage }}<span class="fs-6 text-muted">%</span></div>
                 </div>
             </div>
          </div>
        </div>
      }

      <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4">
        <div class="card-header bg-transparent border-bottom p-4 pb-3">
           <h5 class="fw-bold mb-0">Record Timeline</h5>
        </div>
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 custom-table">
            <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
              <tr>
                <th scope="col" class="ps-4">Logged Date</th>
                <th scope="col" class="pe-4 text-end">Attendance Status</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              @for (a of attendance; track a.id) {
                <tr>
                  <td class="ps-4 text-dark fw-medium py-3">
                     <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check text-muted me-2" viewBox="0 0 16 16">
                          <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                        {{ a.date }}
                     </div>
                  </td>
                  <td class="pe-4 text-end py-3">
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
                </tr>
              } @empty {
                <tr>
                   <td colspan="2" class="text-center text-muted py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-journal-x text-light mb-3" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M6.146 6.146a.5.5 0 0 1 .708 0L8 7.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 8l1.147 1.146a.5.5 0 0 1-.708.708L8 8.707 6.854 9.854a.5.5 0 0 1-.708-.708L7.293 8 6.146 6.854a.5.5 0 0 1 0-.708z"/>
                      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg>
                    <p class="mb-0">No past attendance records exist for this student.</p>
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
export class StudentAttendanceComponent implements OnInit {
  student: { first_name: string; last_name: string } | null = null;
  attendance: AttendanceRecord[] = [];
  summary = { total: 0, present: 0, absent: 0, percentage: 0 };

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.getStudentAttendance(+id).subscribe((res) => {
        this.student = res.student;
        this.attendance = res.attendance;
        this.summary = res.summary;
      });
    }
  }
}
