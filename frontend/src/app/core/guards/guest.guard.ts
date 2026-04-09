import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const guestGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if (auth.isLoggedIn()) {
        // If user is already logged in, push them to their correct dashboard
        // This prevents going "back" to login page while authenticated
        const userRole = auth.user()?.role;
        if (userRole === 'admin') {
            router.navigate(['/admin/dashboard'], { replaceUrl: true });
        } else {
            router.navigate(['/student/dashboard'], { replaceUrl: true });
        }
        return false;
    }

    return true;
};
