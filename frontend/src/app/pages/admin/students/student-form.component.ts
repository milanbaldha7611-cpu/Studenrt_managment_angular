import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="animate-fade-in pb-5 max-w-3xl mx-auto" style="max-width: 800px;">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">{{ isEdit ? 'Edit Student Profile' : 'Student Onboarding' }}</h1>
          <p class="text-muted small mb-0">{{ isEdit ? 'Update existing student details.' : 'Register a new student into the system.' }}</p>
        </div>
        <a routerLink="/admin/students" class="btn btn-light bg-white border shadow-sm rounded-pill px-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left me-1" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
          </svg>
          Back to List
        </a>
      </div>

      <div class="card border-0 bg-white shadow-sm rounded-4 overflow-hidden position-relative">
        <!-- Decorative Header Background -->
        <div class="bg-primary bg-opacity-10 py-4 px-4 border-bottom position-relative overflow-hidden">
           <div class="position-absolute top-0 end-0 p-3 opacity-25" style="transform: translate(20%, -30%);">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="var(--primary)" class="bi bi-person-bounding-box" viewBox="0 0 16 16">
                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z"/>
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
              </svg>
           </div>
           <h5 class="mb-0 fw-bold position-relative z-1">Personal Details</h5>
        </div>

        <div class="card-body p-4 p-md-5">
          @if (errorMessage) {
            <div class="alert alert-danger border-0 shadow-sm d-flex align-items-center rounded-3 mb-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-exclamation-octagon-fill me-3 text-danger" viewBox="0 0 16 16">
                  <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
               </svg>
               <div>{{ errorMessage }}</div>
            </div>
          }
          <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <div class="row g-4 mb-4">
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="text" class="form-control bg-light border-0 px-4" id="firstName" placeholder="First Name" formControlName="first_name" [class.is-invalid]="form.get('first_name')?.invalid && form.get('first_name')?.touched" />
                  <label for="firstName" class="ps-4 text-muted">First Name</label>
                  @if (form.get('first_name')?.invalid && form.get('first_name')?.touched) {
                    <div class="invalid-feedback ps-4 text-uppercase tracking-wider small fw-bold mt-2">First name is required.</div>
                  }
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-floating">
                  <input type="text" class="form-control bg-light border-0 px-4" id="lastName" placeholder="Last Name" formControlName="last_name" [class.is-invalid]="form.get('last_name')?.invalid && form.get('last_name')?.touched" />
                  <label for="lastName" class="ps-4 text-muted">Last Name</label>
                  @if (form.get('last_name')?.invalid && form.get('last_name')?.touched) {
                    <div class="invalid-feedback ps-4 text-uppercase tracking-wider small fw-bold mt-2">Last name is required.</div>
                  }
                </div>
              </div>
            </div>

            <div class="mb-4">
               <div class="form-floating">
                  <input type="email" class="form-control bg-light border-0 px-4" id="email" placeholder="Email Address" formControlName="email" [class.is-invalid]="form.get('email')?.invalid && form.get('email')?.touched" />
                  <label for="email" class="ps-4 text-muted">Email Address</label>
                  @if (form.get('email')?.invalid && form.get('email')?.touched) {
                    <div class="invalid-feedback ps-4 text-uppercase tracking-wider small fw-bold mt-2">A valid email is required.</div>
                  }
                </div>
            </div>

            <div class="row g-4 mb-5">
              <div class="col-md-6">
                 <div class="form-floating">
                    <input type="text" class="form-control bg-light border-0 px-4" id="phone" placeholder="Phone Number" formControlName="phone" />
                    <label for="phone" class="ps-4 text-muted">Phone Number</label>
                </div>
              </div>
              <div class="col-md-6">
                 <div class="form-floating">
                    <select class="form-select bg-light border-0 px-4" id="gender" formControlName="gender" aria-label="Gender Selection">
                      <option value="" disabled selected>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label for="gender" class="ps-4 text-muted">Gender</label>
                </div>
              </div>
            </div>
            
            <div class="row g-4 mb-5">
              <div class="col-md-6">
                 <div class="form-floating">
                    <select class="form-select bg-light border-0 px-4" id="course" formControlName="course" aria-label="Course Selection">
                      <option value="" disabled selected>Select a Course</option>
                      <option value="Bachelor of Technology (B.Tech)">Bachelor of Technology (B.Tech)</option>
                      <option value="Bachelor of Science (B.Sc)">Bachelor of Science (B.Sc)</option>
                      <option value="Bachelor of Commerce (B.Com)">Bachelor of Commerce (B.Com)</option>
                      <option value="Bachelor of Arts (B.A)">Bachelor of Arts (B.A)</option>
                      <option value="Bachelor of Business Administration (BBA)">Bachelor of Business Administration (BBA)</option>
                      <option value="Master of Technology (M.Tech)">Master of Technology (M.Tech)</option>
                      <option value="Master of Science (M.Sc)">Master of Science (M.Sc)</option>
                      <option value="Master of Business Administration (MBA)">Master of Business Administration (MBA)</option>
                      <option value="Diploma in Engineering">Diploma in Engineering</option>
                    </select>
                    <label for="course" class="ps-4 text-muted">Course Enrollment</label>
                </div>
              </div>
            </div>

            <div class="row g-4 mb-5">
              <div class="col-md-6">
                 <div class="form-floating">
                    <select class="form-select bg-light border-0 px-4" id="university_name" formControlName="university_name" aria-label="University Selection">
                      <option value="" disabled selected>Select a University</option>
                      @for (uni of universities; track uni) {
                        <option [value]="uni">{{ uni }}</option>
                      }
                    </select>
                    <label for="university_name" class="ps-4 text-muted">University</label>
                </div>
              </div>
              <div class="col-md-6">
                 <div class="form-floating">
                    <select class="form-select bg-light border-0 px-4" id="college_name" formControlName="college_name" aria-label="College Selection" [disabled]="!availableColleges.length">
                      <option value="" disabled selected>Select a College</option>
                      @for (col of availableColleges; track col) {
                        <option [value]="col">{{ col }}</option>
                      }
                    </select>
                    <label for="college_name" class="ps-4 text-muted">College Name</label>
                </div>
              </div>
            </div>
            
            <hr class="border-light opacity-100 mb-4">

            <div class="d-flex align-items-center justify-content-end gap-3">
              <a routerLink="/admin/students" class="btn btn-light fw-medium px-4 py-2 rounded-pill">Cancel</a>
              <button type="submit" class="btn btn-primary fw-medium px-5 py-2 rounded-pill d-flex align-items-center" [disabled]="form.invalid || loading">
                @if (loading) {
                  <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2 me-2" viewBox="0 0 16 16">
                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                  </svg>
                  {{ isEdit ? 'Save Changes' : 'Complete Registration' }}
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class StudentFormComponent implements OnInit {
  form = this.fb.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    course: [''],
    gender: [''],
    university_name: [''],
    college_name: [''],
  });

  universities = [
    'Veer Narmad South Gujarat University (VNSGU)',
    'Gujarat Technological University (GTU)',
    'Private Universities (Surat Region)'
  ];

  collegesByUniversity: { [key: string]: string[] } = {
    'Veer Narmad South Gujarat University (VNSGU)': [
      'Akhand Anand Arts and Commerce College, Surat',
      'Ambaba Commerce College, Surat',
      'BJ Patel College of Education, Surat',
      'Chaganbhai Balabhai Patel Computer College, Surat',
      'Government B.Ed. College, Surat',
      'Government Medical College, Surat',
      'J.P. Pardiwala Arts & Commerce College',
      'M.T.B. Arts College, Surat',
      'P.R.B. Arts and P.G.R. Commerce College, Bardoli',
      'SDJ International College, Surat',
      'Sir K.P. College of Commerce, Surat',
      'Sir P.T. Sarvajanik College of Science, Surat',
      'Surat Municipal Institute of Medical Education and Research (SMIMER)',
      'Udhana Citizen Commerce College, Surat',
      'VNSGU Department of Computer Science',
      'Vivekanand College, Surat'
    ],
    'Gujarat Technological University (GTU)': [
      'Sarvajanik College of Engineering and Technology (SCET)',
      'C.K. Pithawalla College of Engineering and Technology (CKPCET)',
      'Bhagwan Mahavir College of Engineering and Technology (BMCET)',
      'Government Engineering College, Surat (GEC Surat)'
    ],
    'Private Universities (Surat Region)': [
      'Sardar Vallabhbhai National Institute of Technology (SVNIT)',
      'Auro University',
      'P.P. Savani University',
      'Uka Tarsadia University'
    ]
  };

  availableColleges: string[] = [];
  isEdit = false;
  id: number | null = null;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form.get('university_name')?.valueChanges.subscribe(uni => {
      this.availableColleges = uni ? this.collegesByUniversity[uni] || [] : [];
      const currentCollege = this.form.get('college_name')?.value;
      if (currentCollege && !this.availableColleges.includes(currentCollege)) {
        this.form.patchValue({ college_name: '' });
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.id = +id;
      this.api.getStudent(this.id).subscribe({
        next: (s) => this.form.patchValue({
          first_name: s.first_name,
          last_name: s.last_name,
          email: s.email,
          phone: s.phone || '',
          course: s.course || '',
          gender: s.gender || '',
          university_name: s.university_name || '',
          college_name: s.college_name || '',
        }),
        error: () => this.router.navigate(['/admin/students']),
      });
    }
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.errorMessage = '';
    const payload = this.form.value as any;
    const req = this.isEdit && this.id
      ? this.api.updateStudent(this.id, payload)
      : this.api.addStudent(payload);
    req.subscribe({
      next: () => this.router.navigate(['/admin/students']),
      error: (err) => {
        this.errorMessage = err.error?.message || 'Operation failed.';
        this.loading = false;
      },
    });
  }
}
