import { Message } from './../../model/message';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private authHeader: HttpHeaders;

  constructor(private httpClient: HttpClient) {}

  public getMessageList(): Observable<Message[]> {
    const url = `${environment.baseUrl}/message/get/all`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as Message[])));
  }


  public postMessage(message: Message): Observable<any> {
    const url = `${environment.baseUrl}/message/post`;
    this.setAuthHeader();
    return this.httpClient.post(url, message, { headers : this.authHeader });
  }

  public getMessage(pnFormId: string): Observable<Message> {
    const url = `${environment.baseUrl}/message/get/${pnFormId}`;
    this.setAuthHeader();
    const apiCall = this.httpClient.get(url, { headers : this.authHeader });
    return apiCall.pipe(map(response => (response as Message)));
  }

  public deleteMessage(id: string): Observable<any> {
    const url = `${environment.baseUrl}/message/delete/${id}`;
    this.setAuthHeader();
    return this.httpClient.delete(url, { headers: this.authHeader, responseType: 'text'});
  }

  private setAuthHeader(): void {
    const jwt = localStorage.getItem('JWT');
    this.authHeader = new HttpHeaders({​​ Authorization: 'Bearer ' + jwt, 'Content-type': 'application/json'}​​);
    // this.authHeader = new HttpHeaders().set('Content-type', 'application/json').set('Authorization', 'Bearer '+ jwt);
  }
}
