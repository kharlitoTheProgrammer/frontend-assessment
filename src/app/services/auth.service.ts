import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private validPassword = 'TestPassword';
  private loginAttempts: { [email: string]: number } = {};

  isValidLogin(user: User): boolean {
    return user.password === this.validPassword && user.email.includes('@');
  }

  recordFailedAttempt(email: string): number {
    this.loginAttempts[email] = (this.loginAttempts[email] || 0) + 1;
    return this.loginAttempts[email];
  }

  resetAttempts(email: string) {
    this.loginAttempts[email] = 0;
  }
}
