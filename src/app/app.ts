import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLink, Router, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLinkWithHref, CommonModule, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  currentUser$: Observable<User | null>

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser$ = this.authService.currentUser$
  }

  ngOnInit(): void {
    this.authService.getMe().subscribe({
      next: () => {
        this.router.navigateByUrl('/')
      },
      error: () => {
        this.authService.setUser(null)
        this.router.navigateByUrl('/login')
      }
    })
  }

  onLogout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigateByUrl('/login')
      },
      error: () => {
        this.authService.setUser(null);
        this.router.navigateByUrl('/login')
      },
    });
  }
}
