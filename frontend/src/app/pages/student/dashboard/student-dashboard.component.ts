import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService, Student, AttendanceRecord } from '../../../core/services/api.service';
import { ResultsService, Result } from '../../../services/results.service';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
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
          <div><strong>Notice:</strong> {{ error }}</div>
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
              <div class="mb-3"><strong>Semester:</strong> {{ profile.semester || 'Not Assigned' }}</div>
              <div class="mb-3"><strong>University:</strong> {{ profile.university_name || 'Not Assigned' }}</div>
              <div class="mb-3"><strong>College:</strong> {{ profile.college_name || 'Not Assigned' }}</div>
              <a routerLink="/student/id-card" class="btn btn-primary rounded-pill w-100 mt-3 shadow-sm">View Digital ID Card</a>
            </div>
          </div>

          <!-- Summary Card -->
          <div class="col-lg-6">
            <div class="card h-100 border-0 bg-white shadow-sm overflow-hidden rounded-4 p-4">
              <h5 class="fw-bold fs-5 mb-4">Attendance Rate</h5>
              <div class="display-4 fw-bold text-center text-primary mb-3">{{ summary.percentage }}%</div>
              <div class="d-flex justify-content-between text-center mt-4 border-top pt-3">
                <div><small class="text-muted">Total</small><div class="fw-bold">{{ summary.total }}</div></div>
                <div><small class="text-success">Present</small><div class="fw-bold">{{ summary.present }}</div></div>
                <div><small class="text-danger">Absent</small><div class="fw-bold">{{ summary.absent }}</div></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Academic Results Card -->
        <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4 mb-4">
          <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between p-4 pb-3 flex-wrap gap-3">
              <div class="d-flex align-items-center gap-3">
                 <h5 class="fw-bold mb-0">Academic Results</h5>
                 <select class="form-select form-select-sm rounded-pill px-3 border border-primary-subtle shadow-sm" style="width: auto; min-width: 150px;" (change)="filterResults($event)">
                  <option value="">All Semesters</option>
                  @for (sem of semesters; track sem) {
                    <option [value]="sem">{{ sem }}</option>
                  }
                </select>
              </div>
              <button class="btn btn-success btn-sm rounded-pill px-3 shadow-sm d-flex align-items-center" (click)="downloadReportCard()">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download me-2" viewBox="0 0 16 16">
                  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H1.5a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                  <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                </svg>
                Download PDF Report
              </button>
          </div>
          <div id="report-card-table">
            <div class="table-responsive p-3">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light text-muted small fw-bold">
                  <tr>
                    <th>Exam Name</th>
                    <th>Semester</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Total</th>
                    <th>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  @for (r of filteredResults; track r.id) {
                    <tr>
                      <td class="fw-bold">{{ r.exam_name }}</td>
                      <td><span class="badge bg-light text-dark border">{{ r.semester }}</span></td>
                      <td>{{ r.subject }}</td>
                      <td class="text-primary fw-bold">{{ r.marks_obtained }}</td>
                      <td>{{ r.max_marks }}</td>
                      <td>
                        <span class="badge rounded-pill" [class.bg-success-subtle]="(r.marks_obtained / r.max_marks) >= 0.4" [class.text-success]="(r.marks_obtained / r.max_marks) >= 0.4" [class.bg-danger-subtle]="(r.marks_obtained / r.max_marks) < 0.4" [class.text-danger]="(r.marks_obtained / r.max_marks) < 0.4">
                          {{ ((r.marks_obtained / r.max_marks) * 100).toFixed(1) }}%
                        </span>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="6" class="text-center text-muted py-5">
                        <div class="py-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-info-circle opacity-50 mb-2" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                          </svg>
                          <p class="mb-0">No results found for the selected semester.</p>
                        </div>
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Attendance History Card -->
        <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4 mb-4">
          <div class="card-header bg-transparent border-bottom d-flex align-items-center justify-content-between p-4 pb-3">
             <h5 class="fw-bold mb-0">Attendance History</h5>
             <span class="badge bg-light text-dark border px-3 py-2 rounded-pill">Recent Records</span>
          </div>
          <div class="table-responsive">
            <table class="table table-hover align-middle mb-0 custom-table">
              <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
                <tr>
                  <th scope="col" class="ps-4">Date</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                @for (a of attendance; track a.id) {
                  <tr>
                    <td class="ps-4 text-dark fw-medium py-3">{{ a.date }}</td>
                    <td class="py-3">
                       <span class="badge rounded-pill fw-medium px-3 py-2" [class.bg-success-subtle]="a.status==='Present'" [class.text-success]="a.status==='Present'" [class.bg-danger-subtle]="a.status==='Absent'" [class.text-danger]="a.status==='Absent'">
                         {{ a.status }}
                       </span>
                    </td>
                  </tr>
                } @empty {
                  <tr>
                    <td colspan="2" class="text-center text-muted py-4">No attendance records found.</td>
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
  filteredResults: Result[] = [];
  summary = { total: 0, present: 0, absent: 0, percentage: 0 };
  error = '';

  semesters: string[] = [
    '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
    '5th Semester', '6th Semester', '7th Semester', '8th Semester'
  ];

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
          console.log('Total Results loaded:', res.length);
          this.results = res;
          this.filteredResults = res;
        });
      },
      error: (err) => {
        this.error = err.error?.message || 'Could not load your profile.';
      },
    });
  }

  filterResults(event: any) {
    const sem = event.target.value;
    console.log('Filtering by semester:', sem);
    if (!sem) {
      this.filteredResults = this.results;
    } else {
      this.filteredResults = this.results.filter(r => {
        const match = r.semester === sem;
        console.log(`Checking result: ${r.subject} (${r.semester}) against ${sem} - Match: ${match}`);
        return match;
      });
    }
  }

  downloadReportCard() {
    const element = document.getElementById('report-card-table');
    if (!element) return;
    
    html2canvas(element, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.setFontSize(22);
      pdf.text('Academic Report Card', 15, 20);
      
      pdf.setFontSize(12);
      pdf.text(`Student: ${this.profile?.first_name} ${this.profile?.last_name}`, 15, 30);
      pdf.text(`Course: ${this.profile?.course}`, 15, 38);
      
      pdf.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight);
      pdf.save(`Report_${this.profile?.first_name}.pdf`);
    });
  }
}

