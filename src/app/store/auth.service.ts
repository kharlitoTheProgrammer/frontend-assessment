import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedIn.asObservable();

  login(user: User) {
    this.loggedIn.next(true);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout() {
    this.loggedIn.next(false);
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }
}
