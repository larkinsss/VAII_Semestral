import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { WaitingListEntry } from 'src/app/model/patient';

@Injectable({
  providedIn: 'root'
})
export class PnFormDataService {

  private dataSource = new  BehaviorSubject<WaitingListEntry>(null);
  currentData = this.dataSource.asObservable();

  constructor() { }

  changeData(data: WaitingListEntry): void {
    this.dataSource.next(data);
  }
}
