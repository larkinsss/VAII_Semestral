import { HttpErrorResponse } from '@angular/common/http';
import { PatientService } from 'src/app/services/patient/patient.service';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Patient } from 'src/app/model/patient';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public patient: Patient,
              private patientServ: PatientService,
              private snackBar: MatSnackBar) {

  }

  @Output()
  public delete = new EventEmitter<Patient>();

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public deletePatient(): void {
    this.patientServ.deleteFromList(this.patient.id).subscribe(async response => {
      if (response) {
        this.dialogRef.close();
        this.snackBar.open('Pacient: ' + this.patient.firstname + ' ' + this.patient.lastname + ' bol odstránený', 'Zatvoriť', {
          duration: 10000,
        });
        await this.delay(1000);
        window.location.reload();
      } else {
        this.snackBar.open('Pri odstraňovaní pacienta nastal problém', 'Zatvoriť', {
          duration: 10000,
        });
      }
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open(error.message, 'Zatvoriť', {
        duration: 10000,
      });
    });
  }


}
