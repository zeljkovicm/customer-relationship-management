import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';


/*
    GuestGuard je dodat iz razloga da se aktivni korisnici koji su autentifikovani ne bi mogli da odu
    ponovo na login ili signup 
*/
export const guestGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        router.navigateByUrl('/');
        return false;
    }
    return true;
};
