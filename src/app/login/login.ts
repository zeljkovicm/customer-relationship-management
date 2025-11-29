import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router, RouterLink } from "@angular/router";
import { AuthService, LoginResponse, SignupRequest, SignupResponse } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  showPassword = false

  loginForm!: FormGroup

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched()
      return
    }

    const data = this.loginForm.value

    const payload = {
      email: data.email,
      password: data.password
    }

    this.authService.login(payload).subscribe({
      next: (res: LoginResponse) => {
        Swal.fire({
          title: "Loggin successful",
          icon: "success",
          text: `Welcome back, ${res.user.firstName} ${res.user.lastName}`,
          draggable: true
        }),
          this.router.navigateByUrl('/')
      },
      error: (err) => {
        Swal.fire({
          title: "Loggin unsuccessful",
          icon: "error",
          text: err.error?.detail,
          draggable: true
        })
      }
    })
  }
}
