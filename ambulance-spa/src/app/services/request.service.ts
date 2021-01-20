import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private authHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) { }


  public getRequest(): Observable<any> {
    const url = `${environment.baseUrl}/get/requests`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as User[])));
  }

  public approveRequest(username:string) {
    const url = `${environment.baseUrl}/approve/request/${username}`;
    this.setAuthHeader();
    return this.httpClient.post(url, username, { headers : this.authHeader });
  }

  public declineRequest(username:string) {
    const url = `${environment.baseUrl}/decline/request/${username}`;
    this.setAuthHeader();
    return this.httpClient.post(url, username, { headers : this.authHeader });
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ 'Authorization': 'Bearer '+ jwt, 'Content-type': 'application/json'}​​);
    //this.authHeader = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'Bearer '+ jwt);
  }
}
