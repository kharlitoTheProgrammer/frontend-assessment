import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { AuthStoreService } from '../store/auth.service';
import { User } from '../models/user.model';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';
  isDisabled = false;

  constructor(
    private authService: AuthService,
    private authStore: AuthStoreService,
    private router: Router
  ) {}

  ngOnInit() {
    const lockUntil = localStorage.getItem('lockUntil');
    if (lockUntil && Date.now() < +lockUntil) {
      this.isDisabled = true;
      this.errorMessage = 'Too many attempts. Try again in 1 minute';

      // Automatically re-enable after the remaining time
      const remaining = +lockUntil - Date.now();
      setTimeout(() => {
        this.isDisabled = false;
        this.errorMessage = '';
        localStorage.removeItem('lockUntil');
        this.authService.resetAttempts(this.username);
      }, remaining);
    }
  }

  onLogin() {
    if (this.isDisabled) return;

    const user = new User(this.username, this.password);

    if (this.authService.isValidLogin(user)) {
      this.authService.resetAttempts(this.username);
      this.authStore.login(user);
      this.router.navigate(['/main']);
    } else {
      // If attempts is equals to 3 the error message will appear then button will be disabled
      const attempts = this.authService.recordFailedAttempt(this.username);
      if (attempts >= 3) {
        this.errorMessage = 'Too many attempts. Try again in 1 minute';
        this.isDisabled = true;

        const lockUntil = Date.now() + 60000;
        localStorage.setItem('lockUntil', lockUntil.toString());

        setTimeout(() => {
          this.isDisabled = false;
          this.errorMessage = '';
          localStorage.removeItem('lockUntil');
          this.authService.resetAttempts(this.username);
        }, 60000);
      } else {
        this.errorMessage = 'Invalid username or password';
      }
    }
  }

  onForgotPassword() {
    window.open('https://www.google.com', '_blank');
  }
}
