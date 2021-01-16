import { Procedure } from './../model/procedure';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {

  private procedureList: Procedure[];
  private maxId: number;

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
    const url = `${environment.baseUrl}/get/procedure/all`;
    const apiCall = this.httpClient.get(url);
    return apiCall.pipe(map(response => (response as Procedure[])));
  }

  public updateProcedureList(procedure: Procedure): Observable<any> {
    const url = `${environment.baseUrl}/post/procedure`;
    this.maxId++;
    procedure.procedureId = this.maxId;
    return this.httpClient.post(url, procedure);
  }

  public deleteAll(): Observable<any> {
    const url = `${environment.baseUrl}/delete/procedure/all`;
    return this.httpClient.delete(url);
  }

  public updateEntry(procedure: Procedure): Observable<any> {
    const url = `${environment.baseUrl}/update/procedure`;
    return this.httpClient.post(url, procedure);
  }
}
