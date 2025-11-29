import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { AuthService, SignupRequest } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  showPassword = false

  signupForm!: FormGroup // bice inicijalizovana kasnije

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@ncrvoyix\\.com$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)]]
    },
      {
        validators: this.passwordMatchValidator.bind(this)
      }
    )
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value
    const confirmPassword = group.get('confirmPassword')?.value

    return password === confirmPassword ? null : { passwordsMismatch: true }
  }

  onSubmit() {
    const data = this.signupForm.value

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password
    }

    this.authService.signup(payload).subscribe({
      next: (res) => {
        Swal.fire({
          title: "You've signed up successfully!",
          icon: "success",
          draggable: true
        })
      },
      error: (err) => {
        Swal.fire({
          title: "Signup failed!",
          icon: "error",
          draggable: true
        })
      }
    })
  }


}