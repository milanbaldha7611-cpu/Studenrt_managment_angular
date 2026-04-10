import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ApiService, Student } from '../../../core/services/api.service';
import { ResultsService, Result } from '../../../services/results.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-results-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="mb-4 border-bottom pb-3">
        <h1 class="h3 fw-bold mb-1">Results Management</h1>
        <p class="text-muted small mb-0">Manage and publish academic scores</p>
      </div>

      <div class="row g-4">
        <!-- Add Result Form -->
        <div class="col-lg-4">
          <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4 sticky-top" style="top: 2rem;">
            <div class="card-header bg-transparent border-bottom p-4 pb-3">
              <h5 class="fw-bold mb-0">{{ isEdit ? 'Edit Result' : 'Publish New Result' }}</h5>
            </div>
            <div class="card-body p-4">
              @if (successMessage) {
                <div class="alert alert-success border-0 shadow-sm rounded-3 py-2 px-3 mb-4 d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill me-2" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                  {{ successMessage }}
                </div>
              }
              
              <form [formGroup]="resultForm" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label fw-medium text-dark small">1. Select Semester</label>
                  <select class="form-select bg-light border-light-subtle rounded-3" formControlName="semester">
                    <option value="">-- Choose Semester --</option>
                    @for (sem of semesters; track sem) {
                      <option [value]="sem">{{ sem }}</option>
                    }
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label fw-medium text-dark small">2. Select Student</label>
                  <select class="form-select bg-light border-light-subtle rounded-3" formControlName="student_id" [attr.disabled]="isEdit ? true : null">
                    @if (!resultForm.get('semester')?.value) {
                      <option value="" disabled selected>-- Select Semester First --</option>
                    } @else if (studentsInSelectedSemester.length === 0) {
                      <option value="" disabled selected>-- No students in this semester --</option>
                    } @else {
                      <option value="" disabled selected>-- Choose a Student --</option>
                    }
                    @for (s of studentsInSelectedSemester; track s.id) {
                      <option [value]="s.id">{{ s.first_name }} {{ s.last_name }} ({{ s.enrollment_no || 'No EN' }})</option>
                    }
                  </select>
                </div>
                
                <div class="mb-3">
                  <label class="form-label fw-medium text-dark small">Exam Name</label>
                  <select class="form-select bg-light border-light-subtle rounded-3" formControlName="exam_name">
                    <option value="" disabled selected>-- Select Exam --</option>
                    @for (exam of availableExams; track exam) {
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
                    <label class="form-label fw-medium text-dark small">Max Marks</label>
                    <input type="number" class="form-control bg-light border-light-subtle rounded-3" formControlName="max_marks" placeholder="100">
                  </div>
                </div>

                <div class="d-grid gap-2">
                  <button type="submit" class="btn btn-primary rounded-pill py-2 shadow-sm" [disabled]="resultForm.invalid || submitting">
                    {{ isEdit ? 'Update Result' : 'Publish Result' }}
                  </button>
                  @if (isEdit) {
                    <button type="button" (click)="resetForm()" class="btn btn-light rounded-pill py-2">Cancel Edit</button>
                  }
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Results Table -->
        <div class="col-lg-8">
          <div class="card border-0 bg-white shadow-sm rounded-4 h-100 min-vh-75">
            <div class="card-header bg-white border-0 p-4 d-flex justify-content-between align-items-center">
              <div>
                <h5 class="fw-bold mb-0">Results History</h5>
                <p class="text-muted small mb-0">Track all published student results</p>
              </div>
              <div class="d-flex align-items-center bg-light rounded-pill px-3 py-1 border" style="max-width: 250px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-search text-muted me-2" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input type="text" class="form-control form-control-sm border-0 bg-transparent shadow-none" placeholder="Search results..." [(ngModel)]="resultSearchTerm">
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
                  <tr>
                    <th scope="col" class="ps-4">Student</th>
                    <th scope="col">Exam Detail</th>
                    <th scope="col">Sem</th>
                    <th scope="col">Marks</th>
                    <th scope="col" class="text-end pe-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  @for (r of filteredResults; track r.id) {
                    <tr>
                      <td class="ps-4">
                        <div class="fw-bold">{{ r.first_name }} {{ r.last_name }}</div>
                        <div class="small text-muted" style="font-size: 0.7rem;">{{ r.course }}</div>
                      </td>
                      <td>
                        <div class="fw-bold text-primary" style="font-size: 0.85rem;">{{ r.exam_name }}</div>
                        <div class="small text-muted">{{ r.subject }}</div>
                      </td>
                      <td><span class="small">{{ r.semester }}</span></td>
                      <td>
                        <span class="badge rounded-pill px-2 py-1" [class.bg-success-subtle]="(r.marks_obtained / r.max_marks) >= 0.4" [class.text-success]="(r.marks_obtained / r.max_marks) >= 0.4" [class.bg-danger-subtle]="(r.marks_obtained / r.max_marks) < 0.4" [class.text-danger]="(r.marks_obtained / r.max_marks) < 0.4">
                          {{ r.marks_obtained }} / {{ r.max_marks }}
                        </span>
                      </td>
                      <td class="text-end pe-4">
                        <div class="d-flex justify-content-end gap-2">
                          <button (click)="editResult(r)" class="btn btn-outline-primary btn-sm rounded-3 px-3 shadow-none border-0 bg-primary bg-opacity-10 action-btn-edit" title="Edit Result">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                              <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                          </button>
                          <button (click)="deleteResult(r)" class="btn btn-outline-danger btn-sm rounded-3 px-3 shadow-none border-0 bg-danger bg-opacity-10 action-btn-delete" title="Delete Result">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  } @empty {
                    <tr>
                      <td colspan="5" class="text-center py-5 text-muted small">
                        No results found matching your search.
                      </td>
                    </tr>
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ResultsAdminComponent implements OnInit {
  students: Student[] = [];
  results: Result[] = [];
  resultForm: FormGroup;
  submitting = false;
  successMessage = '';
  showForm = false;
  isEdit = false;
  editId: number | null = null;
  resultSearchTerm = '';

  examNames: string[] = [
    'Semester 1 Exam', 'Semester 2 Exam', 'Semester 3 Exam', 'Semester 4 Exam',
    'Semester 5 Exam', 'Semester 6 Exam', 'Mid Semester', 'Internal Assessment',
    'Unit Test', 'Practical Exam', 'Project Viva', 'Final Exam'
  ];

  semesters: string[] = [
    '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
    '5th Semester', '6th Semester', '7th Semester', '8th Semester'
  ];

  get filteredResults() {
    if (!this.resultSearchTerm) return this.results;
    const term = this.resultSearchTerm.toLowerCase();
    return this.results.filter(r => 
      `${r.first_name || ''} ${r.last_name || ''}`.toLowerCase().includes(term) ||
      (r.subject || '').toLowerCase().includes(term) ||
      (r.exam_name || '').toLowerCase().includes(term)
    );
  }

  get studentsInSelectedSemester() {
    const selectedSem = this.resultForm.get('semester')?.value;
    if (!selectedSem) return [];
    return this.students.filter(s => s.semester === selectedSem);
  }

  get availableExams() {
    const selectedSem = this.resultForm.get('semester')?.value;
    const commonExams = ['Mid Semester', 'Internal Assessment', 'Unit Test', 'Practical Exam', 'Project Viva'];
    if (!selectedSem) return commonExams;
    const semNum = selectedSem.match(/\d+/)?.[0] || '';
    return [`Semester ${semNum} Exam`, ...commonExams];
  }

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private resultsService: ResultsService
  ) {
    this.resultForm = this.fb.group({
      student_id: ['', Validators.required],
      exam_name: ['', Validators.required],
      semester: ['', Validators.required],
      subject: ['', Validators.required],
      marks_obtained: [null, [Validators.required, Validators.min(0)]],
      max_marks: [100, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    this.loadData();
    this.loadResults();
  }

  loadData() {
    this.api.getStudents(1, 100, '').subscribe({
      next: (response: any) => {
        this.students = response.students || response;
      },
      error: (err) => console.error('Error loading students:', err)
    });
  }

  loadResults() {
    console.log('Fetching all results...');
    this.resultsService.getAllResults().subscribe({
      next: (res) => {
        console.log('Results received:', res);
        this.results = res;
      },
      error: (err) => {
        console.error('Error loading results:', err);
        alert('Failed to load results history. Check console for details.');
      }
    });
  }

  toggleForm() {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.resetForm();
    }
  }

  resetForm() {
    this.resultForm.reset({ max_marks: 100 });
    this.isEdit = false;
    this.editId = null;
    this.successMessage = '';
  }

  editResult(result: Result) {
    this.isEdit = true;
    this.editId = result.id!;
    this.showForm = true;
    this.resultForm.patchValue({
      student_id: result.student_id,
      exam_name: result.exam_name,
      semester: result.semester,
      subject: result.subject,
      marks_obtained: result.marks_obtained,
      max_marks: result.max_marks
    });
  }

  deleteResult(result: Result) {
    if (confirm(`Are you sure you want to delete the result for ${result.first_name}?`)) {
      this.resultsService.deleteResult(result.id!).subscribe(() => {
        this.loadResults();
      });
    }
  }

  onSubmit() {
    if (this.resultForm.invalid) return;
    this.submitting = true;

    const req = this.isEdit && this.editId
      ? this.resultsService.updateResult(this.editId, this.resultForm.value)
      : this.resultsService.addResult(this.resultForm.value);

    req.subscribe({
      next: () => {
        this.submitting = false;
        this.successMessage = this.isEdit ? 'Result updated successfully!' : 'Result successfully published!';
        setTimeout(() => {
          this.toggleForm();
          this.loadResults();
        }, 1500);
      },
      error: (err) => {
        this.submitting = false;
        alert(err.error?.message || 'Operation failed.');
      }
    });
  }
}
