import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // vytvorenie localStorage aby sme zistili pripojenie
  isLogin = false;
  userName: string;
  roleAs: string;

  username = ' ';
  fullname: string;
  password: string;
  userId = '';
  usernameList: string[];
  passwordList: string[];

  loggedStatus = false;
  httpClient: any;

  constructor(private http: HttpClient) {}

  checkRights(userRole: number): boolean {
    return userRole === 1;
  }

  setLoggedIn(value: boolean): void {
    this.loggedStatus = value;
    // save to local storage our data
    localStorage.setItem('loggedIn', value.toString());
  }

  get userNameValue(): string {
    return localStorage.getItem('USERNAME');
  }
  setUsername(value: string): void {
    this.username = value;
    localStorage.setItem('userName', value);
  }

  setFullname(value: string): void {
    this.fullname = value;
  }

  setUserId(value: string): void{
    this.userId = value;
  }
  getUserId(): string{
    return this.userId;
  }
  getLoggedIn(): boolean {
    return this.loggedStatus;
  }

  getUserName(): string {
    return this.userNameValue;
  }

  getFullname(): string {
    return this.fullname;
  }

  getUserPassword(): string {
    return this.password;
  }

  // moj novy kod

  login(user: User): Observable<{
    success: boolean;
    role: string;
  }> {
    const role = this.checkRole(user);
    this.isLogin = true;
    this.roleAs = role;
    localStorage.setItem('STATE', 'true');
    localStorage.setItem('ROLE', this.roleAs);
    localStorage.setItem('USERNAME', user.username);
    // instead of real http call
    return of({ success: this.isLogin, role: this.roleAs });
  }

  private checkRole(user: User): string {
    let role = 'x';
    if (user.role === 'ADMIN') {
      role = 'ADMIN';
    }
    else {
      role = 'USER';
    }
    return role;
  }

  logout(): Observable<{
    success: boolean;
    role: string;
  }> {
    this.isLogin = false;
    this.roleAs = '';
    // aj po ukonceni chromu stale sme ulozeny
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    localStorage.setItem('USERNAME', '');
    localStorage.setItem('JWT', '');
    localStorage.setItem('AUTHENTICATED', 'false');
    return of({ success: this.isLogin, role: '' });
  }

  isLoggedIn(): boolean {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  getRole(): string {
    this.roleAs = localStorage.getItem('ROLE');
    return this.roleAs;
  }
}
