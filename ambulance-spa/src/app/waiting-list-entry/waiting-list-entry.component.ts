import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WaitingListEntry } from 'src/app/model/waiting-list-entry';

@Component({
  selector: 'app-waiting-list-entry',
  templateUrl: './waiting-list-entry.component.html',
  styleUrls: ['./waiting-list-entry.component.scss']
})
export class WaitingListEntryComponent {
  illness: string;
  arrivalDate: Date;

  @Input()
  public data: WaitingListEntry;

  @Output()
  public delete = new EventEmitter<WaitingListEntry>();

  @Output()
  public update = new EventEmitter<WaitingListEntry>();

  public change(data: WaitingListEntry): void
  {
    if (this.arrivalDate != null)
    {
      this.data.dateOfArrival = this.arrivalDate;
    }
    if (this.illness != null)
    {
      this.data.illnessDesc = this.illness;
    }
    this.update.next(this.data);
  }
}
