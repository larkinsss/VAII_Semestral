import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Procedure } from 'src/app/model/procedure';

@Component({
  selector: 'app-procedure-entry',
  templateUrl: './procedure-entry.component.html',
  styleUrls: ['./procedure-entry.component.scss']
})
export class ProcedureEntryComponent implements OnInit {

  @Input()
  public data: Procedure;

  @Output()
  public delete = new EventEmitter<Procedure>();

  @Output()
  public update = new EventEmitter<Procedure>();

  constructor() { }

  onUpdate() {
    this.update.emit(this.data);
  }

  ngOnInit(): void {
  }
}
