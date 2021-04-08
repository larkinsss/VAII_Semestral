import { Observable, pipe } from 'rxjs';
import { Patient } from './../../model/patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PnForm } from 'src/app/model/pnForm';

@Injectable({
  providedIn: 'root'
})
export class PnFormService {

  private authHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) { }

  public getAllPnForms(): Observable<PnForm[]> {
    const url = `${environment.baseUrl}/get/pnform/all`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as PnForm[])));
  }

  public getPnForm(id: string): Observable<PnForm> {
    const url = `${environment.baseUrl}/get/pnform/${id}`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as PnForm)));
  }

  public postPnForm(pnForm: PnForm): Observable<any> {
    const url = `${environment.baseUrl}/post/pnform`;
    this.setAuthHeader();
    return this.httpClient.post(url, pnForm, { headers : this.authHeader });
  }

  public deletePnForm(id: string): Observable<any> {
    const url = `${environment.baseUrl}/delete/pnform?id=${id}`;
    this.setAuthHeader();
    return this.httpClient.delete(url, { headers : this.authHeader });
  }

  public updatePnForm(pnForm: PnForm): Observable<any> {
    const url = `${environment.baseUrl}/update/pnform`;
    this.setAuthHeader();
    return this.httpClient.post(url, pnForm, { headers : this.authHeader });
  }

  public downloadPnForm(): any {
    const url = `${environment.baseUrl}/pdf/pn_form_filled.pdf`;
    this.setAuthHeader();
    this.authHeader.append('Accept', 'application/pdf');
    return this.httpClient.get(url, { headers: this.authHeader, responseType: 'blob'});
  }

  public uploadDataToPdf(pnForm: PnForm): Observable<any>{
    const url = `${environment.baseUrl}/pdf/fill`;
    this.setAuthHeader();
    return this.httpClient.post(url, pnForm, { headers : this.authHeader });
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ Authorization: 'Bearer ' + jwt, 'Content-type': 'application/json'}​​);
  }
}
