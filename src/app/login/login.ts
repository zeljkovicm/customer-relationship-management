import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService, SignupRequest } from '../services/auth.service';
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

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    const data = this.loginForm.value

    const payload = {
      email: data.email,
      password: data.password
    }

    this.authService.login(payload).subscribe({
      next: (res) => {
        Swal.fire({
          title: "You've logged in successfully!",
          icon: "success",
          draggable: true
        })
      },
      error: (err) => {
        Swal.fire({
          title: "Login failed!",
          icon: "error",
          draggable: true
        })
      }
    })
  }
}
