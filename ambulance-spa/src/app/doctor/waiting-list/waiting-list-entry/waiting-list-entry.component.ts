import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WaitingListEntry } from 'src/app/model/patient';

@Component({
  selector: 'app-waiting-list-entry',
  templateUrl: './waiting-list-entry.component.html',
  styleUrls: ['./waiting-list-entry.component.scss']
})
export class WaitingListEntryComponent {
  arrivalDate: Date;

  @Input()
  public data: WaitingListEntry;

  @Output()
  public delete = new EventEmitter<WaitingListEntry>();

  @Output()
  public update = new EventEmitter<WaitingListEntry>();

  onUpdate() {
    this.update.emit(this.data);
  }

  showToAdmin() {
    if (localStorage.getItem('ROLE') === 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }

  showToUser() {
    if (localStorage.getItem('ROLE') === 'DOCTOR') {
      return true;
    }
    return false;
  }

  public change(data: WaitingListEntry): void
  {
    if (this.arrivalDate != null)
    {
      this.data.dateOfArrival = this.arrivalDate;
    }
    this.update.next(this.data);
  }
}
