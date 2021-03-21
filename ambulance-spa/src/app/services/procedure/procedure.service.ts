import { Procedure } from '../../model/procedure';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  public procedureList: Procedure[];
  private maxId: number;
  private authHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) { 
    this.getProcedureList().subscribe((response) => {
      this.procedureList = response;
      this.procedureList.forEach(entry => {
        if (entry.procedureId > this.maxId)
        {
          this.maxId= entry.procedureId;
        }
      });
    });
  }

  public getProcedureList(): Observable<Procedure[]> {
    const url = `${environment.baseUrl}/procedure/get/all`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as Procedure[])));
  }

  public updateProcedureList(procedure: Procedure): Observable<any> {
    const url = `${environment.baseUrl}/procedure/post`;
    this.setAuthHeader();
    this.maxId++;
    procedure.procedureId = this.maxId;
    return this.httpClient.post(url, procedure, { headers : this.authHeader });
  }

  public deleteAll(): Observable<any> {
    const url = `${environment.baseUrl}/procedure/delete/all`;
    this.setAuthHeader();
    return this.httpClient.delete(url, { headers : this.authHeader });
  }

  public updateEntry(procedure: Procedure): Observable<any> {
    const url = `${environment.baseUrl}/procedure/update`;
    this.setAuthHeader();
    return this.httpClient.post(url, procedure, { headers : this.authHeader });
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ 'Authorization': 'Bearer '+ jwt, 'Content-type': 'application/json'}​​);
    //this.authHeader = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'Bearer '+ jwt);
  }
}
