import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Student } from '../../../core/services/api.service';
import { UpperCasePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterLink, FormsModule, UpperCasePipe, CommonModule],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Students Directory</h1>
          <p class="text-muted small mb-0">Manage student records and profiles</p>
        </div>
        <a routerLink="/admin/students/add" class="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg me-2" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
          Add Student
        </a>
      </div>

      <div class="card border-0 bg-white shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
           <div class="row g-3">
             <div class="col-md-7">
               <div class="d-flex align-items-center bg-light rounded-pill p-1 border">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search text-muted ms-3 me-2" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
                <input type="text" class="form-control border-0 bg-transparent shadow-none" placeholder="Search by name, email, or course..." [(ngModel)]="search" (keyup.enter)="onSearch()" />
              </div>
             </div>
             <div class="col-md-3">
               <select class="form-select border rounded-pill bg-light h-100" [(ngModel)]="selectedSemester" (change)="onSemesterChange()">
                 <option value="">All Semesters</option>
                 @for (sem of semesters; track sem) {
                   <option [value]="sem">{{ sem }}</option>
                 }
               </select>
             </div>
             <div class="col-md-2">
               <button class="btn btn-primary rounded-pill w-100 h-100 shadow-sm" type="button" (click)="onSearch()">Search</button>
             </div>
           </div>
        </div>
      </div>

      <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0 custom-table">
            <thead class="table-light text-muted small fw-bold text-uppercase tracking-wider">
              <tr>
                <th scope="col" class="ps-4 rounded-start" style="width: 50px;">ID</th>
                <th scope="col">Student Details</th>
                <th scope="col">Contact Info</th>
                <th scope="col">Course / Sem</th>
                <th scope="col" class="text-end pe-4 rounded-end">Actions</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              @for (s of students; track s.id) {
                <tr>
                  <td class="ps-4 text-muted small">#{{ s.id }}</td>
                  <td>
                    <div class="d-flex align-items-center">
                      <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold me-3" style="width: 40px; height: 40px; font-size: 1.1rem;">
                        {{ s.first_name.charAt(0) | uppercase }}
                      </div>
                      <div>
                        <div class="fw-bold text-dark d-flex align-items-center">
                          {{ s.first_name }} {{ s.last_name }}
                          @if (s.gender) {
                             <span class="badge bg-light text-secondary border ms-2 small fw-normal">{{ s.gender }}</span>
                          }
                        </div>
                        <div class="small text-muted">ID: {{ s.id }} | Enrol: <span class="text-primary fw-bold">{{ s.enrollment_no || 'N/A' }}</span></div>
                      </div>
                    </div>
                  </td>
                  <td>
                     <div class="text-dark small mb-1">{{ s.email }}</div>
                     <div class="text-muted small">{{ s.phone || 'No phone' }}</div>
                  </td>
                  <td>
                    <div class="d-flex align-items-center gap-2">
                      <div class="badge bg-secondary bg-opacity-10 text-secondary border fw-medium px-2 py-1 rounded-pill text-truncate" style="max-width: 120px;" [title]="s.course">{{ s.course || 'Unassigned' }}</div>
                      @if (s.semester) {
                         <span class="badge bg-primary bg-opacity-10 text-primary border-0 small fw-bold" style="font-size: 0.7rem;">{{ s.semester }}</span>
                      }
                    </div>
                  </td>
                  <td class="text-end pe-4">
                    <div class="d-flex justify-content-end gap-2">
                       <a [routerLink]="['/admin/students/edit', s.id]" class="btn btn-outline-primary btn-sm rounded-3 px-3 shadow-none border-0 bg-primary bg-opacity-10 action-btn-edit" title="Edit Profile">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                          </svg>
                       </a>
                       <button (click)="delete(s)" class="btn btn-outline-danger btn-sm rounded-3 px-3 shadow-none border-0 bg-danger bg-opacity-10 action-btn-delete" title="Delete Student">
                          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                          </svg>
                       </button>
                    </div>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="text-center text-muted py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-search text-light mb-3" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <p class="mb-0">No students found matching your criteria.</p>
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
export class StudentsListComponent implements OnInit {
  students: Student[] = [];
  search = '';
  selectedSemester = '';
  semesters: string[] = [
    '1st Semester', '2nd Semester', '3rd Semester', '4th Semester',
    '5th Semester', '6th Semester', '7th Semester', '8th Semester'
  ];

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

  onSearch() {
    this.selectedSemester = ''; // Clear semester when searching by name
    this.load(1);
  }

  onSemesterChange() {
    this.search = ''; // Clear search when filtering by semester
    this.load(1);
  }

  load(page: number) {
    // Send both, but since we clear the other, only one will be active
    this.api.getStudents(page, this.pagination.limit, this.search, this.selectedSemester).subscribe((res) => {
      this.students = res.students || [];
      this.pagination = res.pagination;
    });
  }

  delete(s: Student) {
    if (!confirm(`Delete ${s.first_name} ${s.last_name}?`)) return;
    this.api.deleteStudent(s.id).subscribe({
      next: () => this.load(this.pagination.page),
      error: (err) => alert(err.error?.message || 'Delete failed'),
    });
  }
}
