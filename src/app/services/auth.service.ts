import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface SignupResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    user: User;
}

@Injectable({ // Globalan singleton u celoj aplikaciji
    providedIn: 'root',
})

export class AuthService {
    private apiUrl = 'http://localhost:8000';

    private currentUserSubject = new BehaviorSubject<User | null>(
        this.loadUserFromStorage()
    );

    /* 
        currentUser$ je Observable stream koji emituje trenutnog korisnika svaki put kada se promeni
        i zato nosi $ na kraju naziva promenljive da bi dao do znanja da je to asinhroni tok podataka
    */
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private http: HttpClient) { }

    signup(data: SignupRequest): Observable<SignupResponse> {
        return this.http.post<SignupResponse>(
            `${this.apiUrl}/auth/signup`,
            data,
            { withCredentials: true } // nije obavezno, ali može da stoji
        );
    }

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(
            `${this.apiUrl}/auth/login`,
            data,
            { withCredentials: true }   // kljucno zbog HttpOnly cookie
        ).pipe(
            tap((res) => {
                this.setUser(res.user);
            })
        );
    }

    logout(): Observable<{ message: string }> {
        return this.http.post<{ message: string }>(
            `${this.apiUrl}/auth/logout`,
            {},
            { withCredentials: true }   // da bi server obrisao cookie
        ).pipe(
            tap(() => {
                this.setUser(null);
            })
        );
    }

    getMe(): Observable<User> {
        return this.http.get<User>(
            `${this.apiUrl}/auth/me`,
            { withCredentials: true }
        ).pipe(
            tap((user) => {
                this.setUser(user);
            })
        );
    }

    get currentUserValue(): User | null {
        return this.currentUserSubject.value
    }

    private loadUserFromStorage(): User | null {
        const raw = localStorage.getItem('currentUser');
        if (!raw) return null;
        try {
            return JSON.parse(raw) as User;
        } catch {
            return null;
        }
    }

    private saveUserToStorage(user: User | null) {
        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
            localStorage.removeItem('currentUser');
        }
    }

    isAuthenticated(): boolean {
        return this.currentUserSubject.value !== null;
    }

    setUser(user: User | null) {
        this.currentUserSubject.next(user);
        this.saveUserToStorage(user);
    }
}