import { HttpErrorResponse } from '@angular/common/http';
import { Employer } from './../../../model/employer';
import { EmployerService } from './../../../services/employer/employer.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employer-modal',
  templateUrl: './employer-modal.component.html',
  styleUrls: ['./employer-modal.component.scss']
})
export class EmployerModalComponent implements OnInit {
  employerForm: FormGroup;

  @Output() outputEmployer: EventEmitter<Employer> =   new EventEmitter();

  constructor(public dialogRef: MatDialogRef<EmployerModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employer,
    private fb: FormBuilder,
    private emplServ: EmployerService,
    private snackBar: MatSnackBar
    ) {

  }

  ngOnInit(): void {
    this.employerForm = this.fb.group({
      employerName:['', [
        Validators.required,
        Validators.pattern('^[ a-zA-ZÀ-ÿÀ-ʯ\u00f1\u00d1]*$'),
        Validators.minLength(2)
      ]],
      employerStreetValue: ['', [
        Validators.required,
        Validators.pattern('^[ a-zA-ZÀ-ÿÀ-ʯ\u00f1\u00d1]*$'),
      ]],
      employerStreetNumberValue: ['', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
      employerPscValue: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]]
    })
  }

  public get newEmployerName(): any {
    return this.employerForm.get('employerName').value;
  }

  public get newEmployerStreet(): any {
    return this.employerForm.get('employerStreetValue').value;
  }

  public get newEmployerStreetNumber(): any {
    return this.employerForm.get('employerStreetNumberValue').value;
  }

  public get newEmployerPsc(): any {
    return this.employerForm.get('employerPscValue').value;
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  createEmployer(): void {
    this.data.name= this.newEmployerName;
    this.data.adressStreet= this.newEmployerStreet;
    this.data.adressNumber = this.newEmployerStreetNumber;
    this.data.psc = this.newEmployerPsc;

    this.emplServ.postEmployer(this.data).subscribe(response => {
      this.snackBar.open('Záznam uložený', 'Zatvoriť', {
        duration: 10000,
      });
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open('Uloženie nebolo úspešné', 'Zatvoriť', {
        duration: 10000,
      });
    });
  }
}
