import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patient } from 'src/app/model/patient';

@Component({
  selector: 'app-waiting-list-entry',
  templateUrl: './waiting-list-entry.component.html',
  styleUrls: ['./waiting-list-entry.component.scss']
})
export class WaitingListEntryComponent {
  arrivalDate: Date;

  @Input()
  public data: Patient;

  @Output()
  public delete = new EventEmitter<Patient>();

  @Output()
  public update = new EventEmitter<Patient>();

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

  public change(data: Patient): void
  {
    if (this.arrivalDate != null)
    {
      this.data.dateOfBirth = this.arrivalDate;
    }
    this.update.next(this.data);
  }
}
