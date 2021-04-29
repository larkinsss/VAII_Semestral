import { HttpErrorResponse } from '@angular/common/http';
import { Employer } from './../../../model/employer';
import { EmployerService } from './../../../services/employer/employer.service';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ZipService } from 'src/app/services/zip/zip.service';
import { Zip } from 'src/app/model/zip';
import { HasErrorState } from '@angular/material/core/common-behaviors/error-state';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-employer-modal',
  templateUrl: './employer-modal.component.html',
  styleUrls: ['./employer-modal.component.scss']
})
export class EmployerModalComponent implements OnInit {
  employerForm: FormGroup;
  zipArray: Zip[];
  loading = true;

  @Output() outputEmployer: EventEmitter<Employer> =   new EventEmitter();
  filteredOptions: any;

  constructor(public dialogRef: MatDialogRef<EmployerModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Employer,
              private fb: FormBuilder,
              private emplServ: EmployerService,
              private snackBar: MatSnackBar,
              private zipService: ZipService) {

      this.employerForm = this.fb.group({
        employerName: ['', [
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
          Validators.pattern(/^-?(0|[0-9]\d*)?$/)
        ]]
      });

      this.zipService.getAllZips().subscribe(response => {
        this.zipArray = response;
        this.filteredOptions = this.employerForm.get('employerPscValue').valueChanges
        .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
        this.loading = false;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      });
  }

  ngOnInit(): void {
    console.log(this.data);
  }

  private _filter(value: string): Zip[] {
    const filterValue = value.toLowerCase();

    return this.zipArray.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public get name(): any {
    return this.employerForm.get('employerName').value;
  }

  public get street(): any {
    return this.employerForm.get('employerStreetValue').value;
  }

  public get strNumber(): any {
    return this.employerForm.get('employerStreetNumberValue').value;
  }

  public get empZip(): any {
    return this.employerForm.get('employerPscValue').value;
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  createEmployer(): void {
    this.data.name = this.name;
    this.data.adressStreet = this.street;
    this.data.adressNumber = this.strNumber;
    this.data.psc = this.empZip;

    this.emplServ.postEmployer(this.data).subscribe(response => {
      this.dialogRef.close();
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
