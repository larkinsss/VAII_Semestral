import { Observable, of } from 'rxjs';
import { AuthRequest } from '../../model/auth-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AuthResponse } from '../../model/auth-response';
import { User } from '../../model/user';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated = false;
  authRequest: AuthRequest;
  authResponse: AuthResponse;
  isLogin = false;
  roleAs: string;

  constructor(private http: HttpClient) {
    this.authRequest = new AuthRequest;
  }

  authenticate(credentials, callback) {
        this.authRequest.password = credentials.password;
        this.authRequest.username = credentials.username;
        const url = `${environment.baseUrl}/authenticate`;
        this.http.post(url, this.authRequest).subscribe(response => {
            this.authResponse  = response as AuthResponse;
            if (this.authResponse != null) {
              localStorage.setItem('JWT', this.authResponse.jwt);
              localStorage.setItem('ROLE', this.checkRole(this.authResponse.user));
              localStorage.setItem('STATE', 'true');
              localStorage.setItem('AUTHENTICATED', 'true');
              this.authenticated = true;
            } else {
              this.authenticated = false;
            }
            return callback && callback();
        }, (error) => {
          localStorage.setItem('AUTHENTICATED', 'false');
          return callback && callback();
        });

  }

  public getNewUserId(): Observable<number> {
    const url = `${environment.baseUrl}/user/get/newId`;
    const apiCall = this.http.get(url);
    return apiCall.pipe(map(response => (response as number)));
  }

  public register(user: User): Observable<any> {
    const url = `${environment.baseUrl}/register`;
    const apiCall = this.http.post(url, user);
    return apiCall;
  }

  private checkRole(user: User): string {
    return user.role.toString();
  }

  logout(): Observable<{
    success: boolean;
    role: string;
  }> {
    this.isLogin = false;
    this.roleAs = '';
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