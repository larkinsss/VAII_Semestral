import { PnForm } from './../../../model/pnForm';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pn-list-entry',
  templateUrl: './pn-list-entry.component.html',
  styleUrls: ['./pn-list-entry.component.scss']
})
export class PnListEntryComponent {

  @Input()
  public data: PnForm;

  @Output()
  public delete = new EventEmitter<PnForm>();

  @Output()
  public update = new EventEmitter<PnForm>();

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

  

}
