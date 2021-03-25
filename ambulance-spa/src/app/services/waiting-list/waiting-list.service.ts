import { WaitingListEntry } from 'src/app/model/patient';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {

  private IdBoundary = 0;
  private entryList: WaitingListEntry[];
  private authHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) {}

  public getWaitingList(): Observable<WaitingListEntry[]> {
    const url = `${environment.baseUrl}/get/all`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as WaitingListEntry[])));
  }

  public getPatient(id: string): Observable<WaitingListEntry> {
    const url = `${environment.baseUrl}/get/patient/${id}`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as WaitingListEntry)));
  }

  public updateList(waitingListEntry: WaitingListEntry): Observable<any> {
    const url = `${environment.baseUrl}/post/patient`;
    return this.httpClient.post(url, waitingListEntry);
  }

  public deleteFromList(id: string): Observable<any> {
    const url = `${environment.baseUrl}/delete/patient?id=${id}`;
    this.setAuthHeader();
    return this.httpClient.delete(url, { headers : this.authHeader });
  }

  public deleteAll(): Observable<any> {
    const url = `${environment.baseUrl}/delete/all`;
    this.setAuthHeader();
    return this.httpClient.delete(url, { headers : this.authHeader });
  }

  public updateEntry(waitingListEntry: WaitingListEntry): Observable<any> {
    const url = `${environment.baseUrl}/update/patient`;
    this.setAuthHeader();
    return this.httpClient.post(url, waitingListEntry, { headers : this.authHeader });
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ 'Authorization': 'Bearer '+ jwt, 'Content-type': 'application/json'}​​);
    //this.authHeader = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'Bearer '+ jwt);
  }
}
