import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';


/*
    AuthGuard je dodat kako bi se uradila protekcija ruta za koje korisnik mora da bude ulogovan
    Recimo guest ne moze da vidi informacije o klijentima, sastancima, itd
*/
export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        return true
    }

    router.navigateByUrl('/login')
    return false
};