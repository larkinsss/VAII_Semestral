import { WaitingListEntry } from 'src/app/model/waiting-list-entry';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {

  private IdBoundary = 0;
  private entryList: WaitingListEntry[];
  private authHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) {
    this.getWaitingList().subscribe((response) => {
      this.entryList = response;
      this.entryList.forEach(entry => {
        if (entry.id > this.IdBoundary)
        {
          this.IdBoundary = entry.id;
        }
      });
    });
  }

  public getWaitingList(): Observable<WaitingListEntry[]> {
    const url = `${environment.baseUrl}/get/all`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as WaitingListEntry[])));
  }

  public updateList(waitingListEntry: WaitingListEntry): Observable<any> {
    const url = `${environment.baseUrl}/post/patient`;
    this.IdBoundary++;
    waitingListEntry.id = this.IdBoundary;
    return this.httpClient.post(url, waitingListEntry, { headers : this.authHeader });
  }

  public deleteFromList(id: number): Observable<any> {
    const url = `${environment.baseUrl}/delete/patient?id=${id}`;
    return this.httpClient.delete(url, { headers : this.authHeader });
  }

  public deleteAll(): Observable<any> {
    const url = `${environment.baseUrl}/delete/all`;
    return this.httpClient.delete(url, { headers : this.authHeader });
  }

  public updateEntry(waitingListEntry: WaitingListEntry): Observable<any> {
    const url = `${environment.baseUrl}/update/patient`;
    return this.httpClient.post(url, waitingListEntry, { headers : this.authHeader });
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ 'Authorization': 'Bearer '+ jwt, 'Content-type': 'application/json'}​​);
    //this.authHeader = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'Bearer '+ jwt);
  }
}
