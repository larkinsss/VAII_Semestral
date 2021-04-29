import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PnFormService } from './../../../services/pn-form/pn-form.service';
import { PnForm } from './../../../model/pnForm';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-end-dialog',
  templateUrl: './end-dialog.component.html',
  styleUrls: ['./end-dialog.component.scss']
})
export class EndDialogComponent implements OnInit {
  endForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<EndDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PnForm,
    private fb: FormBuilder,
    private pnFormServ: PnFormService,
    private snackBar: MatSnackBar
    ) {

  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.endForm = this.fb.group({
      endDateValue:['', [
        Validators.required,
      ]],
      endDiagnoseValue: ['', [
        Validators.required,
      ]]
    });
  }


  public get endDiagnose(): any {
    return  this.endForm.get('endDiagnoseValue').value;
  }

  public get endDate(): any {
    return  this.endForm.get('endDateValue').value;
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  saveForm(): any {
    this.data.endDate = this.endDate;
    this.data.endDiagnose = this.endDiagnose;
    this.pnFormServ.updatePnForm(this.data).subscribe(response => {
      this.dialogRef.close();
      this.snackBar.open('Práceneschopnosť ukončená', 'Zatvoriť', {
        duration: 10000,
      });
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open(error.message, 'Zatvoriť', {
        duration: 10000,
      });
    })
  }

  

}
