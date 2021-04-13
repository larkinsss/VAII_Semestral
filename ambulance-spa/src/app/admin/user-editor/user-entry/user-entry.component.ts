import { User } from './../../../model/user';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.scss']
})
export class UserEntryComponent implements OnInit {

  @Input()
  public data: User;

  @Output()
  public delete = new EventEmitter<User>();

  @Output()
  public update = new EventEmitter<User>();

  constructor() { }

  ngOnInit(): void {
  }

  onUpdate() {
    this.delete.emit(this.data);
  }
}
