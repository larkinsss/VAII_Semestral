import { Observable } from 'rxjs';
import { AuthRequest } from './../model/auth-request';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { AuthResponse } from '../model/auth-response';
import { User } from '../model/user';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  authenticated = false;
  authRequest: AuthRequest;
  authResponse: AuthResponse;

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
              localStorage.setItem('JWT',this.authResponse.jwt);
              localStorage.setItem('ROLE', this.checkRole(this.authResponse.user));
              localStorage.setItem('STATE', 'true');
              this.authenticated = true;
            } else {
              this.authenticated = false;
            }
            return callback && callback();
        }, (error) => {
          return error as HttpErrorResponse;
        });

  }

  public getNewUserId(): Observable<number> {
    let url = `${environment.baseUrl}/user/get/newId`;
    const apiCall = this.http.get(url);
    return apiCall.pipe(map(response => (response as number)));
  }

  register(user: User): Observable<any> {
    let url = `${environment.baseUrl}/register`;
    const apiCall = this.http.post(url, user);
    return apiCall;
  }

  private checkRole(user: User): string {
    let role;
    if (user.role === 'ADMIN') {
      role = 'ADMIN';
    }
    else {
      role = 'USER';
    }
    return role;
  }
}
