import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PasswordChangeRequest } from 'src/app/model/password-change-request';
import { User } from 'src/app/model/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private authHeader: HttpHeaders;

  constructor(private http: HttpClient) { }

  public getUserById(id: string): Observable<User> {
    const url = `${environment.baseUrl}/user/get/${+id}`;
    this.setAuthHeader();
    const apiCall = this.http.get(url, { headers :  this.authHeader});
    return apiCall.pipe(map(response => (response as User)));
  }

  public upsertUser(user: User): Observable<User> {
    const url = `${environment.baseUrl}/user/post`;
    this.setAuthHeader();
    return this.http.post(url, user, {headers : this.authHeader}) as Observable<User>;
  }

  public getNewUserId(): Observable<any> {
    const url = `${environment.baseUrl}/user/get/newId`;
    const apiCall = this.http.get(url);
    return apiCall.pipe(map(response => (response as number)));
  }

  public getAllUsers(): Observable<User[]> {
    const url = `${environment.baseUrl}/user/get/all`;
    this.setAuthHeader();
    const apiCall = this.http.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as User[])));
  }

  public changeUserPassword(request: PasswordChangeRequest): Observable<string> {
    const url = `${environment.baseUrl}/user/password/change`;
    this.setAuthHeader();
    return this.http.post(url, request, {headers: this.authHeader, responseType: 'text'}) as Observable<string>;
  }

  public deleteUser(id: number): Observable<any> {
    const url = `${environment.baseUrl}/user/delete/${id}`;
    this.setAuthHeader();
    return this.http.delete(url, { headers : this.authHeader });
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ Authorization: 'Bearer ' + jwt, 'Content-type': 'application/json'}​​);
  }

  public register(user: User): Observable<any> {
    const url = `${environment.baseUrl}/register`;
    const apiCall = this.http.post(url, user);
    return apiCall;
  }
}
