import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Procedure } from 'src/app/model/procedure';
import { ProcedureService } from 'src/app/services/procedure.service';

@Component({
  selector: 'app-procedures-editor',
  templateUrl: './procedures-editor.component.html',
  styleUrls: ['./procedures-editor.component.scss']
})
export class ProceduresEditorComponent implements OnInit {

  proceduresServ: ProcedureService;
  proceduresList: Procedure[];


  constructor(proceduresService: ProcedureService, private snackBar: MatSnackBar) {
    this.proceduresServ = proceduresService;
    this.proceduresServ.getProcedureList().subscribe(response => {
      this.proceduresList = response;
      this.proceduresList.sort((a, b) => {
        const idA = a.procedureId;
        const idB = b.procedureId;
        if (idA < idB) {
          return -1;
        }
        if (idA > idB) {
          return 1;
        }
        return 0;
      });
    });
  }

  ngOnInit(): void {
  }

  onUpdate(data: Procedure): void {
    this.proceduresServ.updateEntry(data).subscribe((response) => {
      this.snackBar.open('Selected appointment is updated!', 'Hide', {
        duration: 3000,
      });
    });
  }

  deleteAllRecords(): void {
    this.proceduresServ.deleteAll().subscribe((resonse) => {
      this.proceduresList = [];
      this.snackBar.open('All appointments were removed!', 'Hide', {
        duration: 3000,
      });
    }, (error: HttpErrorResponse) => {
      if (error.status === 202) {
        this.proceduresList = [];
        this.snackBar.open('All appointments will be removed!', 'Hide', {
        duration: 3000,
      });
      } else
      {
        console.log(error.message);
      }
    });
  }


}
