import { Procedure } from '../../model/procedure';
import { ProcedureService } from '../../services/procedure/procedure.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public listOfProcedures: Procedure[];
  get entriesOfProcedures() { return (this.listOfProcedures ) ? this.listOfProcedures : [] }

  constructor(private procedureService: ProcedureService) {}

  getListOfProcedures(): Procedure[]{
    return (this.listOfProcedures) ? this.listOfProcedures : null;
  }

  ngOnInit(): void {
    this.procedureService.getProcedureList().subscribe((response) => {
      this.listOfProcedures = response;
    });
  }
}
