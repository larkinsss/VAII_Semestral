import { HttpClient, HttpHeaders } from '@angular/common/http';
import { identifierName } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employer } from 'src/app/model/employer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  private authHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) { }

  public getEmployers(): Observable<Employer[]> {
    const url = `${environment.baseUrl}/get/employer/all`;
    const apiCall = this.httpClient.get(url);
    return apiCall.pipe(map(response => (response as Employer[])));
  }
  
  public getEmployer(id: number): Observable<Employer> {
    const url = `${environment.baseUrl}/get/employer/${id}`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as Employer)));
  }

  public postEmployer(employer: Employer): Observable<any> {
    const url = `${environment.baseUrl}/post/employer`;
    this.setAuthHeader();
    return this.httpClient.post(url, employer, { headers : this.authHeader });
  }

  public deleteEmployer(id: number): Observable<any> {
    const url = `${environment.baseUrl}/delete/employer?id=${id}`;
    this.setAuthHeader();
    return this.httpClient.delete(url, { headers : this.authHeader });
  }

  public updateEmployer(employer: Employer): Observable<any> {
    const url = `${environment.baseUrl}/update/employer`;
    this.setAuthHeader();
    return this.httpClient.post(url, employer, { headers : this.authHeader });
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ Authorization: 'Bearer ' + jwt, 'Content-type': 'application/json'}​​);
  }
}
