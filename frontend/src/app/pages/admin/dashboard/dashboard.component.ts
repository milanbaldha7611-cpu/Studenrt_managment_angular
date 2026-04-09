import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="animate-fade-in pb-5">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 class="h3 fw-bold mb-1">Admin Dashboard</h1>
          <p class="text-muted small mb-0">Overview of system metrics and quick tasks</p>
        </div>
        <div class="bg-primary bg-opacity-10 text-primary px-3 py-2 rounded-3 small fw-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history me-1" viewBox="0 0 16 16">
            <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
            <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
            <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
          </svg>
          System Active
        </div>
      </div>
      
      <div class="row g-4 mb-5">
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 bg-white shadow-sm position-relative overflow-hidden">
            <div class="position-absolute top-0 end-0 p-3 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="var(--primary)" class="bi bi-people-fill" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
              </svg>
            </div>
            <div class="card-body p-4 position-relative z-1">
              <h5 class="card-title text-muted fw-bold mb-3 small text-uppercase tracking-wider">Total Students</h5>
              <div class="d-flex align-items-baseline gap-2">
                <p class="display-4 fw-bold mb-0 text-dark">{{ stats.totalStudents }}</p>
                <span class="text-success small fw-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-arrow-up-right me-1" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 2.5a.5.5 0 0 0-.5-.5h-6a.5.5 0 0 0 0 1h4.793L2.146 13.146a.5.5 0 0 0 .708.708L13 3.707V8.5a.5.5 0 0 0 1 0v-6z"/>
                  </svg>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4">
          <div class="card h-100 border-0 bg-white shadow-sm position-relative overflow-hidden">
            <div class="position-absolute top-0 end-0 p-3 opacity-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="var(--secondary)" class="bi bi-calendar2-check-fill" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 3.5v1c0 .276.224.5.5.5h11a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5zm8.854 5.354a.5.5 0 0 0-.708-.708L7.5 10.793 6.354 9.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"/>
              </svg>
            </div>
            <div class="card-body p-4 position-relative z-1">
              <h5 class="card-title text-muted fw-bold mb-3 small text-uppercase tracking-wider">Attendance Records</h5>
              <div class="d-flex align-items-baseline gap-2">
                <p class="display-4 fw-bold mb-0 text-dark">{{ stats.totalAttendanceRecords }}</p>
                <span class="text-secondary small fw-medium">Logs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 class="h5 fw-bold mb-4">Quick Actions</h2>
      <div class="row g-4">
        <!-- Action Card 1 -->
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a routerLink="/admin/students" class="card text-decoration-none text-dark h-100 border-0 shadow-sm action-card transition-all">
            <div class="card-body p-4 text-center">
              <div class="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 48px; height: 48px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                </svg>
              </div>
              <h5 class="card-title fw-bold fs-6">View Students</h5>
              <p class="card-text small text-muted mb-0">Browse and manage all registered profiles.</p>
            </div>
          </a>
        </div>
        <!-- Action Card 2 -->
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a routerLink="/admin/students/add" class="card text-decoration-none text-dark h-100 border-0 shadow-sm action-card transition-all">
            <div class="card-body p-4 text-center">
              <div class="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 48px; height: 48px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                  <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </div>
              <h5 class="card-title fw-bold fs-6">Add Student</h5>
              <p class="card-text small text-muted mb-0">Manually onboard a new student into the system.</p>
            </div>
          </a>
        </div>
        <!-- Action Card 3 -->
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a routerLink="/admin/attendance" class="card text-decoration-none text-dark h-100 border-0 shadow-sm action-card transition-all">
            <div class="card-body p-4 text-center">
              <div class="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 48px; height: 48px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-list-check" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3.854 2.146a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 3.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708L2 7.293l1.146-1.147a.5.5 0 0 1 .708 0zm0 4a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0z"/>
                </svg>
              </div>
              <h5 class="card-title fw-bold fs-6">Attendance List</h5>
              <p class="card-text small text-muted mb-0">Review daily attendance logs globally.</p>
            </div>
          </a>
        </div>
        <!-- Action Card 4 -->
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a routerLink="/admin/attendance/mark" class="card text-decoration-none text-dark h-100 border-0 shadow-sm action-card transition-all">
            <div class="card-body p-4 text-center">
              <div class="bg-danger bg-opacity-10 text-danger rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 48px; height: 48px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
                </svg>
              </div>
              <h5 class="card-title fw-bold fs-6">Mark Attendance</h5>
              <p class="card-text small text-muted mb-0">Record or update attendance for classes.</p>
            </div>
          </a>
        </div>
        <!-- Action Card 5 -->
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a routerLink="/admin/results" class="card text-decoration-none text-dark h-100 border-0 shadow-sm action-card transition-all">
            <div class="card-body p-4 text-center">
              <div class="bg-info bg-opacity-10 text-info rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 48px; height: 48px;">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-award" viewBox="0 0 16 16">
                  <path d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.51.229.962.95-.25 1.516.96 1.488-.96 1.487.25 1.516-.962.95-1.51.229-.684 1.365-1.543-.715L8 11.23l-1.544.715-1.543.714-.684-1.365-1.51-.229-.962-.95.25-1.516-.96-1.487.96-1.488-.25-1.516.962-.95 1.51-.229.684-1.365 1.543.714L8 1.23l1.544-.714 1.543-.715z"/>
                  <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"/>
                </svg>
              </div>
              <h5 class="card-title fw-bold fs-6">Publish Results</h5>
              <p class="card-text small text-muted mb-0">Add exam scores and grades for students.</p>
            </div>
          </a>
        </div>
        <!-- Action Card 6 -->
        <div class="col-sm-6 col-md-4 col-lg-3">
          <a routerLink="/admin/users" class="card text-decoration-none text-dark h-100 border-0 shadow-sm action-card transition-all">
            <div class="card-body p-4 text-center">
              <div class="bg-purple bg-opacity-10 text-purple rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style="width: 48px; height: 48px; background-color: rgba(139,92,246,0.1);">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#8b5cf6" class="bi bi-shield-person-fill" viewBox="0 0 16 16">
                  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5v13A1.5 1.5 0 0 0 1.5 16h13a1.5 1.5 0 0 0 1.5-1.5V1.5A1.5 1.5 0 0 0 14.5 0h-13zm5.5 6a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm-2 5.3c0-1.2 1-2.3 3-2.3s3 1.1 3 2.3V13H5v-.7z"/>
                </svg>
              </div>
              <h5 class="card-title fw-bold fs-6">Manage Users</h5>
              <p class="card-text small text-muted mb-0">View, create and manage all system accounts.</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  stats = { totalStudents: 0, totalAttendanceRecords: 0 };

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getDashboardStats().subscribe((s) => (this.stats = s));
  }
}
