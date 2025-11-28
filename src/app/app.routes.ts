import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';

export const routes: Routes = [
    { path: '', title: 'Home', component: Home },
    { path: 'signup', title: 'Sign up', component: Signup },
    { path: 'login', title: 'Log in', component: Login },
    { path: '**', redirectTo: '' }
];
