import { WaitingListEntry } from 'src/app/model/waiting-list-entry';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WaitingListService {

  private IdBoundary = 0;
  private entryList: WaitingListEntry[];

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
    const apiCall = this.httpClient.get(url);
    return apiCall.pipe(map(response => (response as WaitingListEntry[])));
  }

  public updateList(waitingListEntry: WaitingListEntry): Observable<any> {
    const url = `${environment.baseUrl}/post/patient`;
    this.IdBoundary++;
    waitingListEntry.id = this.IdBoundary;
    return this.httpClient.post(url, waitingListEntry);
  }

  public deleteFromList(id: number): Observable<any> {
    const url = `${environment.baseUrl}/delete/patient?id=${id}`;
    return this.httpClient.delete(url);
  }

  public deleteAll(): Observable<any> {
    const url = `${environment.baseUrl}/delete/all`;
    return this.httpClient.delete(url);
  }

  public updateEntry(waitingListEntry: WaitingListEntry): Observable<any> {
    const url = `${environment.baseUrl}/update/patient`;
    return this.httpClient.post(url, waitingListEntry);
  }
}
