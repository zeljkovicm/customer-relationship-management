import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface SignupRequest {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface LoginRequest {
    email: string
    password: string
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private signupUrl = 'http://localhost:8000/signup'
    private loginUrl = 'http://localhost:8000/login'

    constructor(private http: HttpClient) { }

    signup(data: SignupRequest) {
        return this.http.post(this.signupUrl, data)
    }

    login(data: LoginRequest) {
        return this.http.post(this.loginUrl, data)
    }
}