import { Observable, pipe } from 'rxjs';
import { WaitingListEntry } from './../../model/patient';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PnFormService {

  private authHeader: HttpHeaders;
  private patient: WaitingListEntry;

  constructor(private httpClient: HttpClient) { }

  public setPatient(patient: WaitingListEntry): void {
    this.patient = patient;
  }

  
}
