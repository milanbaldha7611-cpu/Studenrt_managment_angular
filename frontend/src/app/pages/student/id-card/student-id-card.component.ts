import { Component, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService, Student } from '../../../core/services/api.service';

@Component({
   selector: 'app-student-id-card',
   standalone: true,
   imports: [CommonModule, RouterLink, UpperCasePipe],
   template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Digital ID Card</h1>
          <p class="text-muted small mb-0">Your official university identification</p>
        </div>
        <a routerLink="/student/dashboard" class="btn btn-light bg-white border shadow-sm rounded-pill px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to Dashboard
        </a>
      </div>

      <div class="d-flex align-items-center justify-content-center mt-5">
        @if (profile) {
           <div class="id-card-wrapper position-relative" style="width: 340px; perspective: 1000px;">
              <div class="id-card shadow-lg rounded-4 overflow-hidden position-relative bg-white border border-light" style="transform-style: preserve-3d; transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);">
                 
                 <!-- Top Left Logo Branding -->
                 <div class="position-absolute top-0 start-0 w-100 p-4 d-flex align-items-start justify-content-between gap-2" style="z-index: 2;">
                     <div class="d-flex align-items-center gap-2">
                         <div class="bg-primary text-white rounded d-flex align-items-center justify-content-center shadow-sm" style="width: 30px; height: 30px;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-mortarboard-fill" viewBox="0 0 16 16">
                               <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917l-7.5-3.5Z"/>
                               <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466 4.176 9.032Z"/>
                            </svg>
                         </div>
                         <div>
                            <h6 class="fw-bolder mb-0 text-primary lh-1 d-flex align-items-center" style="font-size: 1rem; letter-spacing: -0.5px;">StudentTech</h6>
                         </div>
                     </div>
                     @if (profile.college_name) {
                         <div class="text-end" style="max-width: 140px;">
                             <div class="badge bg-light text-dark border border-secondary border-opacity-25 text-wrap fw-bold lh-sm text-end p-1 shadow-sm" style="font-size: 0.55rem; line-height: 1.1;">
                                {{ profile.college_name }}
                             </div>
                         </div>
                     }
                 </div>



                 <div class="card-body p-4 text-center position-relative" style="z-index: 2; margin-top: 80px;">
                    <!-- Avatar -->
                    <div class="avatar-container mx-auto mb-3 position-relative" style="width: 100px; height: 100px;">
                       <div class="bg-white text-primary border border-primary border-opacity-25 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 100%; height: 100%; font-size: 2.5rem; font-weight: bold; border-width: 2px !important;">
                          {{ profile.first_name.charAt(0) | uppercase }}{{ profile.last_name.charAt(0) | uppercase }}
                       </div>
                       <div class="position-absolute bottom-0 end-0 bg-success border border-white rounded-circle shadow-sm" style="width: 22px; height: 22px; border-width: 3px !important; margin-right: 5px; margin-bottom: 5px;" title="Active Status"></div>
                    </div>

                    <h4 class="fw-bold text-dark mb-1">{{ profile.first_name }} {{ profile.last_name }}</h4>
                    <p class="text-primary fw-medium mb-3 small tracking-wider">{{ profile.email }}</p>

                    <div class="bg-light p-3 rounded-4 text-start shadow-sm border border-light">
                       <!-- Data Rows -->
                       <div class="d-flex justify-content-between mb-2">
                          <span class="text-muted small" style="font-size: 0.75rem;">Student ID</span>
                          <span class="fw-bold text-dark small">STU-{{ profile.id.toString().padStart(6, '0') }}</span>
                       </div>
                       <div class="d-flex justify-content-between mb-2">
                          <span class="text-muted small" style="font-size: 0.75rem;">Gender</span>
                          <span class="fw-bold text-dark small">{{ profile.gender || 'Unknown' }}</span>
                       </div>
                       <div class="d-flex justify-content-between mb-2">
                          <span class="text-muted small" style="font-size: 0.75rem;">Course</span>
                          <span class="fw-bold text-dark small text-truncate text-end ps-2" style="max-width: 150px;" [title]="profile.course">{{ profile.course || 'N/A' }}</span>
                       </div>
                       <div class="d-flex justify-content-between mb-2">
                          <span class="text-muted small" style="font-size: 0.75rem;">Semester</span>
                          <span class="fw-bold text-dark small">{{ profile.semester || 'N/A' }}</span>
                       </div>
                       <div class="d-flex justify-content-between mb-2">
                          <span class="text-muted small" style="font-size: 0.75rem;">University</span>
                          <span class="fw-bold text-dark small text-truncate text-end ps-2" style="max-width: 160px;" [title]="profile.university_name">{{ profile.university_name || 'N/A' }}</span>
                       </div>
                       <div class="d-flex justify-content-between mb-2">
                          <span class="text-muted small" style="font-size: 0.75rem;">College</span>
                          <span class="fw-bold text-dark small text-truncate text-end ps-2" style="max-width: 160px;" [title]="profile.college_name">{{ profile.college_name || 'N/A' }}</span>
                       </div>
                       <div class="d-flex justify-content-between">
                          <span class="text-muted small" style="font-size: 0.75rem;">Validity</span>
                          <span class="fw-bold text-dark small">August 2028</span>
                       </div>
                    </div>

                    <div class="mt-4 pt-2 border-top border-light dashed-border">
                       <!-- Fake Barcode -->
                       <svg class="w-100" height="40" viewBox="0 0 200 40" preserveAspectRatio="none">
                          <rect x="10" y="5" width="4" height="30" fill="#333" />
                          <rect x="18" y="5" width="2" height="30" fill="#333" />
                          <rect x="24" y="5" width="6" height="30" fill="#333" />
                          <rect x="34" y="5" width="2" height="30" fill="#333" />
                          <rect x="40" y="5" width="8" height="30" fill="#333" />
                          <rect x="52" y="5" width="4" height="30" fill="#333" />
                          <rect x="60" y="5" width="6" height="30" fill="#333" />
                          <rect x="70" y="5" width="2" height="30" fill="#333" />
                          <rect x="76" y="5" width="10" height="30" fill="#333" />
                          <rect x="90" y="5" width="4" height="30" fill="#333" />
                          <rect x="98" y="5" width="2" height="30" fill="#333" />
                          <rect x="104" y="5" width="6" height="30" fill="#333" />
                          <rect x="114" y="5" width="8" height="30" fill="#333" />
                          <rect x="126" y="5" width="4" height="30" fill="#333" />
                          <rect x="134" y="5" width="2" height="30" fill="#333" />
                          <rect x="140" y="5" width="10" height="30" fill="#333" />
                          <rect x="154" y="5" width="4" height="30" fill="#333" />
                          <rect x="162" y="5" width="6" height="30" fill="#333" />
                          <rect x="172" y="5" width="2" height="30" fill="#333" />
                          <rect x="178" y="5" width="6" height="30" fill="#333" />
                          <rect x="188" y="5" width="4" height="30" fill="#333" />
                       </svg>
                       <div class="small text-muted mt-1" style="font-size: 0.65rem; letter-spacing: 2px;">9876543210123</div>
                    </div>
                 </div>
              </div>
              
              <!-- Buttons -->
              <div class="text-center mt-5">
                 <button class="btn btn-primary rounded-pill px-4 shadow-sm" onclick="window.print()">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-printer-fill me-2" viewBox="0 0 16 16">
                      <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z"/>
                      <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
                    </svg>
                    Print ID Card
                 </button>
              </div>
           </div>
        } @else if (error) {
           <div class="alert alert-danger">{{ error }}</div>
        } @else {
           <div class="spinner-border text-primary" role="status"></div>
        }
      </div>
    </div>
  `,
   styles: [`
    .dashed-border { border-top-style: dashed !important; border-top-width: 2px !important; }
    .id-card:hover { transform: translateY(-5px) scale(1.02) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.15) !important; }
    @media print {
      ::ng-deep body * {
        visibility: hidden;
      }
      ::ng-deep * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      ::ng-deep .id-card-wrapper, ::ng-deep .id-card-wrapper * {
        visibility: visible !important;
      }
      ::ng-deep .id-card-wrapper {
        position: absolute !important;
        left: 50% !important;
        top: 20px !important;
        transform: translateX(-50%) !important;
        margin: 0 !important;
      }
      .id-card { 
         box-shadow: none !important; 
         border: 2px solid #ddd !important; 
         transform: none !important; 
      }
    }
  `]
})
export class StudentIdCardComponent implements OnInit {
   profile: Student | null = null;
   error = '';

   constructor(private api: ApiService) { }

   ngOnInit() {
      this.api.getMyStudentRecord().subscribe({
         next: (res) => this.profile = res,
         error: (err) => this.error = err.error?.message || 'Could not load student profile.'
      });
   }
}
