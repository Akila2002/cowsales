// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly adminCredentials = { username: 'Akila', password: 'Akila@2002' };
  private isLoggedIn: boolean = false;

  constructor() { }

  login(username: string, password: string): boolean {
    if (username === this.adminCredentials.username && password === this.adminCredentials.password) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
  }

  isAdminLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
