import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Patient } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class PnFormDataService {

  private dataSource = new  BehaviorSubject<Patient>(null);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data: Patient): void {
    this.dataSource.next(data);
  }
}
