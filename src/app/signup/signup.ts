import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService, SignupRequest, SignupResponse } from '../services/auth.service';
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

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@ncrvoyix\\.com$')]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/)]],
      confirmPassword: ['', [Validators.required]]
    },
      {
        validators: (group: FormGroup) => { // Provera da li su password i confirmPassword isti
          return group.get('password')?.value === group.get('confirmPassword')?.value ? null : { passwordsMismatch: true }
        }
      }
    )
  }

  onSubmit() {

    /*
      Iako je u signup.html Submit dugme disableovano ukoliko forma nije validna, ili je korisnik samo 
      usao u polje i odmah izasao, dodao sam jos jednu proveru ovde, za ekstremni slucaj da neko pokusa
      manipulaciju preko DOM-a, recimo: 
        1. document.querySelector("form").submit() 
        2. document.querySelector("form").disabled = false
    */
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched()
      return
    }

    const data = this.signupForm.value

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }

    this.authService.signup(payload).subscribe({
      next: (res: SignupResponse) => {
        Swal.fire({
          title: "Sign up successful!",
          icon: "success",
          text: `Welcome aboard, ${res.firstName} ${res.lastName}`,
          draggable: true
        }),
          this.router.navigateByUrl('/login')
      },
      error: (err) => {
        Swal.fire({
          title: "Signup unsuccessful!",
          icon: "error",
          text: `${err.error.detail}`,
          draggable: true
        }),
          console.log(err)
      }
    })
  }


}