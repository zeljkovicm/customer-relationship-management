import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Login } from './login/login';
import { Signup } from './signup/signup';
import { authGuard } from './services/auth.guard';
import { guestGuard } from './guest.guard';
import { Profile } from './profile/profile';
import { Customers } from './customers/customers';
import { Meetings } from './meetings/meetings';
import { About } from './about/about';
import { Members } from './members/members';
import { Contact } from './contact/contact';
import { Bundles } from './bundles/bundles';

export const routes: Routes = [

    { path: '', title: 'Home', component: Home },
    { path: 'about', title: 'About', component: About },
    { path: 'members', title: 'Members', component: Members },
    { path: 'contact', title: 'Contact', component: Contact },

    { path: 'signup', title: 'Sign up', component: Signup, canActivate: [guestGuard] },
    { path: 'login', title: 'Log in', component: Login, canActivate: [guestGuard] },

    { path: 'profile', title: 'Profile', component: Profile, canActivate: [authGuard] },
    { path: 'customers', title: 'Customers', component: Customers, canActivate: [authGuard] },
    { path: 'meetings', title: 'Meetings', component: Meetings, canActivate: [authGuard] },
    { path: 'bundles', title: 'Bundles', component: Bundles, canActivate: [authGuard] },

    { path: '**', redirectTo: '' }
];
