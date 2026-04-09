import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, Student, AttendanceRecord } from '../../../core/services/api.service';
import { ResultsService, Result } from '../../../services/results.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="animate-fade-in pb-5" id="dashboard-content">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">My Dashboard</h1>
          <p class="text-muted small mb-0">Your profile, attendance, and academic results</p>
        </div>
        <div class="bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-3 small fw-bold">
          Student Portal
        </div>
      </div>

      @if (error) {
        <div class="alert alert-warning border-0 shadow-sm d-flex align-items-center rounded-3 mb-4">
          <div><strong>Notice needed:</strong> {{ error }}</div>
        </div>
      }

      @if (profile) {
        <div class="row g-4 mb-5">
          <!-- Profile Card -->
          <div class="col-lg-6">
            <div class="card h-100 border-0 bg-white shadow-sm overflow-hidden rounded-4 p-4">
              <h5 class="fw-bold fs-5 mb-4">My Profile</h5>
              <div class="mb-3"><strong>Name:</strong> {{ profile.first_name }} {{ profile.last_name }}</div>
              <div class="mb-3"><strong>Course:</strong> {{ profile.course }}</div>
              <div class="mb-3"><strong>University:</strong> {{ profile.university_name || 'Not Assigned' }}</div>
              <div class="mb-3"><strong>College:</strong> {{ profile.college_name || 'Not Assigned' }}</div>
              <a routerLink="/student/id-card" class="btn btn-primary rounded-pill w-100 mt-3">View Digital ID Card</a>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="col-lg-6">
            <div class="card h-100 border-0 bg-white shadow-sm overflow-hidden rounded-4 p-4">
              <h5 class="fw-bold fs-5 mb-4">Attendance Rate</h5>
              <div class="display-4 fw-bold text-center text-primary mb-3">{{ summary.percentage }}%</div>
              <div class="d-flex justify-content-between text-center mt-4 border-top pt-3">
                <div><small class="text-muted">Total Class</small><div class="fw-bold">{{ summary.total }}</div></div>
                <div><small class="text-success">Present</small><div class="fw-bold">{{ summary.present }}</div></div>
                <div><small class="text-danger">Absent</small><div class="fw-bold">{{ summary.absent }}</div></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Academic Results Card -->
        <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4 mb-4" id="report-card">
          <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between p-4 pb-3">
             <div>
               <h5 class="fw-bold mb-0">Academic Results</h5>
               <small class="text-muted">Current semester report</small>
             </div>
             <button class="btn btn-success btn-sm rounded-pill px-3 shadow-sm d-flex align-items-center" (click)="downloadReportCard()">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download me-2" viewBox="0 0 16 16">
                 <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H1.5a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                 <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
               </svg>
               Download Report Card (PDF)
             </button>
          </div>
          <div class="table-responsive p-3">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light text-muted small fw-bold">
                <tr>
                  <th>Exam Name</th>
                  <th>Subject</th>
                  <th>Marks Obtained</th>
                  <th>Total Marks</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                @for (r of results; track r.id) {
                  <tr>
                    <td class="fw-bold">{{ r.exam_name }}</td>
                    <td>{{ r.subject }}</td>
                    <td class="text-primary fw-bold">{{ r.marks_obtained }}</td>
                    <td>{{ r.max_marks }}</td>
                    <td>
                      <span class="badge" [class.bg-success]="(r.marks_obtained / r.max_marks) * 100 >= 50" [class.bg-danger]="(r.marks_obtained / r.max_marks) * 100 < 50">
                        {{ ((r.marks_obtained / r.max_marks) * 100).toFixed(1) }}%
                      </span>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="5" class="text-center text-muted py-4">No results published yet.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

        <!-- History Table -->
        <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4 mb-4">
          <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between p-4 pb-3">
             <h5 class="fw-bold mb-0">Attendance History</h5>
             <span class="badge bg-light text-dark border px-3 py-2 rounded-pill">Recent Records</span>
          </div>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 custom-table">
              <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
                <tr>
                  <th scope="col" class="ps-4 rounded-start">Date</th>
                  <th scope="col" class="rounded-end">Status</th>
                </tr>
              </thead>
              <tbody class="border-top-0">
                @for (a of attendance; track a.id) {
                  <tr>
                    <td class="ps-4 text-dark fw-medium py-3">
                      <div class="d-flex align-items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-event text-muted me-2" viewBox="0 0 16 16">
                          <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"/>
                          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                        </svg>
                        {{ a.date }}
                      </div>
                    </td>
                    <td class="py-3">
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
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-inbox text-light mb-3" viewBox="0 0 16 16">
                        <path d="M4.98 4a.5.5 0 0 0-.39.188L1.54 8H6a.5.5 0 0 1 .5.5 1.5 1.5 0 1 0 3 0A.5.5 0 0 1 10 8h4.46l-3.05-3.812A.5.5 0 0 0 11.02 4H4.98zm-1.17-.437A1.5 1.5 0 0 1 4.98 3h6.04a1.5 1.5 0 0 1 1.17.563l3.7 4.625A.5.5 0 0 1 16 8.5V13a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V8.5a.5.5 0 0 1 .158-.388l3.7-4.625zM1 8.5v4.5A1 1 0 0 0 2 14h12a1 1 0 0 0 1-1V8.5H11a.5.5 0 0 1-.5.5 2.5 2.5 0 0 1-5 0 .5.5 0 0 1-.5-.5H1z"/>
                      </svg>
                      <p class="mb-0">No attendance records found.</p>
                    </td>
                  </tr>
                }
              </tbody>
            </table>
          </div>
        </div>

      }
    </div>
  `,
})
export class StudentDashboardComponent implements OnInit {
  profile: Student | null = null;
  attendance: AttendanceRecord[] = [];
  results: Result[] = [];
  summary = { total: 0, present: 0, absent: 0, percentage: 0 };
  error = '';

  constructor(private api: ApiService, private resultsService: ResultsService) { }

  ngOnInit() {
    this.api.getMyStudentRecord().subscribe({
      next: (student) => {
        this.profile = student;
        this.api.getStudentAttendance(student.id).subscribe((res) => {
          this.attendance = res.attendance;
          this.summary = res.summary;
        });
        
        this.resultsService.getResultsByStudent(student.id).subscribe((res) => {
          this.results = res;
        });
      },
      error: (err) => {
        this.error = err.error?.message || 'Could not load your profile.';
      },
    });
  }

  downloadReportCard() {
    const element = document.getElementById('report-card');
    if (!element) return;
    
    // Create professional looking report card printout
    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.setFontSize(22);
      pdf.setTextColor(40, 40, 40);
      pdf.text('StudentTech - Semester Report Card', 15, 20);
      
      pdf.setFontSize(12);
      pdf.text(`Student: ${this.profile?.first_name} ${this.profile?.last_name}`, 15, 30);
      pdf.text(`Course: ${this.profile?.course}`, 15, 38);
      
      pdf.addImage(imgData, 'PNG', 0, 50, imgWidth, imgHeight);
      pdf.save(`${this.profile?.first_name}_ReportCard.pdf`);
    });
  }
}
