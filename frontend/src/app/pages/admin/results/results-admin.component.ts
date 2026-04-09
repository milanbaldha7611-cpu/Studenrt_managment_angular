import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService, Student } from '../../../core/services/api.service';
import { ResultsService } from '../../../services/results.service';

@Component({
  selector: 'app-results-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <div>
          <h1 class="h3 fw-bold mb-1">Publish Results</h1>
          <p class="text-muted small mb-0">Add exam scores for students</p>
        </div>
      </div>

      <div class="row g-4">
        <!-- Add Result Form -->
        <div class="col-lg-5">
          <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4">
            <div class="card-header bg-transparent border-bottom p-4 pb-3">
              <h5 class="fw-bold mb-0">Add New Result</h5>
            </div>
            <div class="card-body p-4">
              @if (successMessage) {
                <div class="alert alert-success border-0 shadow-sm rounded-3 py-2 px-3 mb-4 dropdown-item d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  {{ successMessage }}
                </div>
              }
              
              <form [formGroup]="resultForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label fw-medium text-dark small">Select Student</label>
                  <select class="form-select bg-light border-light-subtle rounded-3" formControlName="student_id">
                    <option value="" disabled>-- Choose a Student --</option>
                    @for (s of students; track s.id) {
                      <option [value]="s.id">{{ s.first_name }} {{ s.last_name }} ({{ s.course }})</option>
                    }
                  </select>
                </div>
                
                <div class="mb-3">
                  <label class="form-label fw-medium text-dark small">Exam Name</label>
                  <select class="form-select bg-light border-light-subtle rounded-3" formControlName="exam_name">
                    <option value="" disabled>-- Select Exam Type --</option>
                    @for (exam of examNames; track exam) {
                      <option [value]="exam">{{ exam }}</option>
                    }
                  </select>
                </div>
                
                <div class="mb-3">
                  <label class="form-label fw-medium text-dark small">Subject</label>
                  <input type="text" class="form-control bg-light border-light-subtle rounded-3" formControlName="subject" placeholder="e.g. Mathematics">
                </div>

                <div class="row gx-3 mb-4">
                  <div class="col-6">
                    <label class="form-label fw-medium text-dark small">Marks Obtained</label>
                    <input type="number" class="form-control bg-light border-light-subtle rounded-3" formControlName="marks_obtained" placeholder="0">
                  </div>
                  <div class="col-6">
                    <label class="form-label fw-medium text-dark small">Total Max Marks</label>
                    <input type="number" class="form-control bg-light border-light-subtle rounded-3" formControlName="max_marks" placeholder="100">
                  </div>
                </div>

                <div class="d-grid mt-2">
                  <button type="submit" class="btn btn-primary rounded-pill py-2 shadow-sm d-flex justify-content-center align-items-center" [disabled]="resultForm.invalid || submitting">
                    @if (submitting) {
                       <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                       Saving...
                    } @else {
                       Publish Result
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Instructions -->
        <div class="col-lg-7">
           <div class="card h-100 border-0 bg-primary bg-opacity-10 shadow-sm overflow-hidden rounded-4 p-4 text-primary d-flex flex-column justify-content-center">
              <div class="mb-4 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="currentColor" class="bi bi-award-fill opacity-75" viewBox="0 0 16 16">
                  <path d="M8 0l1.669.864 1.858.282.842 1.68 1.337 1.32L13.4 6l.306 1.854-1.337 1.32-.842 1.68-1.858.282L8 12l-1.669-.864-1.858-.282-.842-1.68-1.337-1.32L2.6 6l-.306-1.854 1.337-1.32.842-1.68L6.331.864 8 0z"/>
                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                </svg>
              </div>
              <h5 class="fw-bold text-center mb-3">Result Management Center</h5>
              <p class="text-center mx-auto" style="max-width: 400px;">
                Use this portal to securely publish academic marks. Once published, students will instantly see these grades on their dashboard and can generate their PDF Report Cards.
              </p>
           </div>
        </div>
      </div>
    </div>
  `
})
export class ResultsAdminComponent implements OnInit {
  students: Student[] = [];
  resultForm: FormGroup;
  submitting = false;
  successMessage = '';

  examNames: string[] = [
    // Semester / Term Exams
    'Semester 1 Exam',
    'Semester 2 Exam',
    'Semester 3 Exam',
    'Semester 4 Exam',
    'Semester 5 Exam',
    'Semester 6 Exam',
    // Mid-Term / Internal Exams
    'Mid Semester 1',
    'Mid Semester 2',
    'Internal Assessment 1',
    'Internal Assessment 2',
    'Unit Test 1',
    'Unit Test 2',
    'Unit Test 3',
    // Practical / Lab
    'Practical Exam',
    'Lab Internal Assessment',
    'Lab Final Exam',
    // Project / Viva
    'Project Viva',
    'Project Evaluation',
    'Mini Project Assessment',
    // Annual / Final
    'Annual Exam',
    'Final Exam',
    'End Semester Exam',
    // Competitive / Entrance Styled
    'Mock Test',
    'Surprise Test',
    'Remedial Exam',
    'Backlog Exam',
  ];

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private resultsService: ResultsService
  ) {
    this.resultForm = this.fb.group({
      student_id: ['', Validators.required],
      exam_name: ['', Validators.required],
      subject: ['', Validators.required],
      marks_obtained: [null, [Validators.required, Validators.min(0)]],
      max_marks: [100, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    // Increase limit to 100 to get a full list of students for the dropdown
    this.api.getStudents(1, 100, '').subscribe((response: any) => {
      this.students = response.students || response;
    });
  }

  onSubmit() {
    if (this.resultForm.invalid) return;
    this.submitting = true;
    
    this.resultsService.addResult(this.resultForm.value).subscribe({
      next: (res) => {
        this.submitting = false;
        this.successMessage = 'Result successfully published!';
        
        // Reset only course data, retain student to speed up data entry for typical bulk upload
        this.resultForm.patchValue({
          subject: '',
          marks_obtained: null,
          max_marks: 100
        });

        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.submitting = false;
        const msg = err.error?.message || 'Failed to publish result.';
        alert(msg);
      }
    });
  }
}
