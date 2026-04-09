import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, AppUser } from '../../../core/services/api.service';
import { UpperCasePipe, DatePipe } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [FormsModule, UpperCasePipe, DatePipe],
  template: `
    <div class="animate-fade-in pb-5">

      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 class="h3 fw-bold mb-1">User Management</h1>
          <p class="text-muted small mb-0">Manage all system accounts and roles</p>
        </div>
        <button class="btn btn-primary rounded-pill px-4 shadow-sm d-flex align-items-center gap-2" (click)="showCreateModal = true">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
            <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          Create User
        </button>
      </div>

      <!-- Alerts -->
      @if (successMsg) {
        <div class="alert alert-success d-flex align-items-center gap-2 mb-4 rounded-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/></svg>
          {{ successMsg }}
        </div>
      }
      @if (errorMsg) {
        <div class="alert alert-danger d-flex align-items-center gap-2 mb-4 rounded-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16"><path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 4zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/></svg>
          {{ errorMsg }}
        </div>
      }

      <!-- Search -->
      <div class="card border-0 bg-white shadow-sm rounded-4 mb-4">
        <div class="card-body p-4">
          <div class="d-flex align-items-center bg-light rounded-pill p-2 border">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search text-muted ms-3 me-2" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
            <input type="text" class="form-control border-0 bg-transparent shadow-none" placeholder="Search by name, email or role…" [(ngModel)]="search" (keyup.enter)="load(1)" />
            <button class="btn btn-primary rounded-pill px-4 ms-2" (click)="load(1)">Search</button>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="card border-0 bg-white shadow-sm overflow-hidden rounded-4">
        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-light text-muted small fw-bold text-uppercase">
              <tr>
                <th class="ps-4" style="width:50px">ID</th>
                <th>User</th>
                <th>Role</th>
                <th>Joined</th>
                <th class="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody class="border-top-0">
              @for (u of users; track u.id) {
                <tr>
                  <td class="ps-4 text-muted small">#{{ u.id }}</td>
                  <td>
                    <div class="d-flex align-items-center gap-3">
                      <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-flex align-items-center justify-content-center fw-bold"
                           style="width:40px;height:40px;font-size:1.1rem;flex-shrink:0;">
                        {{ u.name.charAt(0) | uppercase }}
                      </div>
                      <div>
                        <div class="fw-bold text-dark">{{ u.name }}
                          @if (u.id === currentUserId) {
                            <span class="badge bg-primary bg-opacity-10 text-primary border ms-2 small fw-normal">You</span>
                          }
                        </div>
                        <div class="small text-muted">{{ u.email }}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select class="form-select form-select-sm rounded-pill border-0 bg-light fw-medium"
                            style="width:120px"
                            [value]="u.role"
                            [disabled]="u.id === currentUserId"
                            (change)="changeRole(u, $any($event.target).value)">
                      <option value="student">Student</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td class="text-muted small">{{ u.created_at | date:'dd MMM yyyy' }}</td>
                  <td class="text-end pe-4">
                    <button class="btn btn-sm btn-outline-danger rounded-pill px-3"
                            [disabled]="u.id === currentUserId"
                            (click)="deleteUser(u)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-trash3 me-1" viewBox="0 0 16 16">
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                      </svg>
                      Delete
                    </button>
                  </td>
                </tr>
              } @empty {
                <tr>
                  <td colspan="5" class="text-center text-muted py-5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-people text-light mb-3 d-block mx-auto" viewBox="0 0 16 16">
                      <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
                    </svg>
                    No users found.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        @if (pagination.totalPages > 1) {
          <div class="card-footer bg-white border-top p-4 d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
            <span class="small text-muted fw-bold text-uppercase">Total: <span class="text-dark">{{ pagination.total }}</span></span>
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

    <!-- Create User Modal -->
    @if (showCreateModal) {
      <div class="modal d-block" tabindex="-1" style="background:rgba(0,0,0,0.5);">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content rounded-4 border-0 shadow-lg">
            <div class="modal-header border-0 pb-0 px-4 pt-4">
              <h5 class="modal-title fw-bold">Create New User</h5>
              <button type="button" class="btn-close" (click)="showCreateModal = false; resetForm()"></button>
            </div>
            <div class="modal-body px-4 pt-3 pb-4">
              @if (createError) {
                <div class="alert alert-danger rounded-3 small py-2 mb-3">{{ createError }}</div>
              }
              <div class="mb-3">
                <label class="form-label fw-medium small">Full Name</label>
                <input type="text" class="form-control" placeholder="e.g. John Doe" [(ngModel)]="newUser.name" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-medium small">Email Address</label>
                <input type="email" class="form-control" placeholder="e.g. john@example.com" [(ngModel)]="newUser.email" />
              </div>
              <div class="mb-3">
                <label class="form-label fw-medium small">Password</label>
                <input type="password" class="form-control" placeholder="Min. 6 characters" [(ngModel)]="newUser.password" />
              </div>
              <div class="mb-4">
                <label class="form-label fw-medium small">Role</label>
                <select class="form-select" [(ngModel)]="newUser.role">
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div class="d-flex gap-2 justify-content-end">
                <button class="btn btn-light rounded-pill px-4" (click)="showCreateModal = false; resetForm()">Cancel</button>
                <button class="btn btn-primary rounded-pill px-4" [disabled]="creating" (click)="createUser()">
                  @if (creating) { <span class="spinner-border spinner-border-sm me-2"></span> } Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class UsersListComponent implements OnInit {
  users: AppUser[] = [];
  search = '';
  pagination = { page: 1, limit: 10, total: 0, totalPages: 0 };
  successMsg = '';
  errorMsg = '';
  currentUserId = 0;

  showCreateModal = false;
  creating = false;
  createError = '';
  newUser = { name: '', email: '', password: '', role: 'student' };

  get pages(): number[] {
    const p = this.pagination;
    const arr: number[] = [];
    for (let i = Math.max(1, p.page - 2); i <= Math.min(p.totalPages, p.page + 2); i++) arr.push(i);
    return arr;
  }

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.currentUserId = this.auth.user()?.id ?? 0;
    this.load(1);
  }

  load(page: number) {
    this.api.getUsers(page, this.pagination.limit, this.search).subscribe((res) => {
      this.users = res.users || [];
      this.pagination = res.pagination;
    });
  }

  changeRole(u: AppUser, role: 'admin' | 'student') {
    this.api.updateUserRole(u.id, role).subscribe({
      next: () => { u.role = role; this.flash('success', `${u.name}'s role updated to ${role}.`); },
      error: (err) => this.flash('error', err.error?.message || 'Role update failed.'),
    });
  }

  deleteUser(u: AppUser) {
    if (!confirm(`Delete user "${u.name}" (${u.email})?`)) return;
    this.api.deleteUser(u.id).subscribe({
      next: () => { this.flash('success', `${u.name} deleted.`); this.load(this.pagination.page); },
      error: (err) => this.flash('error', err.error?.message || 'Delete failed.'),
    });
  }

  createUser() {
    this.createError = '';
    if (!this.newUser.name || !this.newUser.email || !this.newUser.password) {
      this.createError = 'All fields are required.'; return;
    }
    if (this.newUser.password.length < 6) {
      this.createError = 'Password must be at least 6 characters.'; return;
    }
    this.creating = true;
    this.api.createUser(this.newUser).subscribe({
      next: () => {
        this.creating = false;
        this.showCreateModal = false;
        this.resetForm();
        this.load(1);
        this.flash('success', 'User created successfully.');
      },
      error: (err) => { this.creating = false; this.createError = err.error?.message || 'Create failed.'; },
    });
  }

  resetForm() {
    this.newUser = { name: '', email: '', password: '', role: 'student' };
    this.createError = '';
  }

  private flash(type: 'success' | 'error', msg: string) {
    if (type === 'success') { this.successMsg = msg; setTimeout(() => (this.successMsg = ''), 3500); }
    else { this.errorMsg = msg; setTimeout(() => (this.errorMsg = ''), 4000); }
  }
}
