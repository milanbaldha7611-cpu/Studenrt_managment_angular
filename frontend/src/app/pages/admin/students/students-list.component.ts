import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Student } from '../../../core/services/api.service';
import { UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [RouterLink, FormsModule, UpperCasePipe],
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
           <div class="d-flex align-items-center bg-light rounded-pill p-2 border">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search text-muted ms-3 me-2" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <input type="text" class="form-control border-0 bg-transparent shadow-none" placeholder="Search by name, email, phone, or course..." [(ngModel)]="search" (keyup.enter)="load(1)" />
            <button class="btn btn-primary rounded-pill px-4 ms-2" type="button" (click)="load(1)">Search</button>
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
                <th scope="col">Course</th>
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
                        <div class="small text-muted text-truncate" style="max-width: 150px;">Student ID: {{ s.id }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                     <div class="text-dark small mb-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-envelope-fill text-muted me-1" viewBox="0 0 16 16">
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                        </svg>
                        {{ s.email }}
                     </div>
                     <div class="text-muted small">
                         <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-telephone-fill text-muted me-1" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                          </svg>
                         {{ s.phone || 'No phone' }}
                     </div>
                  </td>
                  <td>
                    <span class="badge bg-secondary bg-opacity-10 text-secondary border fw-medium px-3 py-2 rounded-pill">{{ s.course || 'Unassigned' }}</span>
                  </td>
                  <td class="text-end pe-4">
                     <div class="dropdown d-inline-block">
                        <button class="btn btn-light btn-sm rounded-circle p-2 border" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                          </svg>
                        </button>
                        <ul class="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                          <li>
                            <a class="dropdown-item d-flex align-items-center py-2" [routerLink]="['/admin/attendance/student', s.id]">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-calendar2-check text-muted me-2" viewBox="0 0 16 16">
                                <path d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"/>
                              </svg>
                              View Attendance
                            </a>
                          </li>
                          <li>
                            <a class="dropdown-item d-flex align-items-center py-2" [routerLink]="['/admin/students/edit', s.id]">
                               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-pencil me-2 text-muted" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                              </svg>
                              Edit Profile
                            </a>
                          </li>
                          <li><hr class="dropdown-divider"></li>
                          <li>
                            <button type="button" class="dropdown-item d-flex align-items-center text-danger py-2" (click)="delete(s)">
                               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3 me-2" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                              </svg>
                              Delete Student
                            </button>
                          </li>
                        </ul>
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
    this.api.getStudents(page, this.pagination.limit, this.search).subscribe((res) => {
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
