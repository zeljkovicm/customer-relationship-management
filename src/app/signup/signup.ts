import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  showPassword = false

  signupForm!: FormGroup // bice inicijalizovana kasnije

  constructor(private fb: FormBuilder) {
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

  onSubmit() { }


}