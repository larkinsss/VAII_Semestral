import { Employer } from './../../model/employer';
import { EmployerModalComponent } from './employer-modal/employer-modal.component';
import { EmployerService } from '../../services/employer/employer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray } from '@angular/forms';
import { WaitingListService } from '../../services/waiting-list/waiting-list.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-appointment',
  templateUrl: './patient-record.component.html',
  styleUrls: ['./patient-record.component.scss']
})
export class PatientRecordComponent implements OnInit {
  myForm: FormGroup;
  employee = false;
  hospIns = false;
  willingIns = false;
  showWarning = false;
  relationships: Array<string> = ['Zamestnanec', 'Povinne nemocensky poistená samostatne zárobkovo činná osoba', 'Dobrovoľne nemocensky poistená osoba' ];
  poistovne = [{code: 25, name: 'VšZP'}, {code: 24, name: 'Dôvera'}, {code: 27, name: 'UNION'}];
  employers: Array<Employer>;
  newEmployer: Employer;

  @ViewChild('appointmentForm') private formDirective: NgForm;
  dialogSubscription: any;

  constructor(private service: WaitingListService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private employerService: EmployerService,
               public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initForm();
    this.employerService.getEmployers().subscribe((response) => {
      this.employers = response;
    },
    (err: HttpErrorResponse) => {
      console.error(err.message);
    });
  }

  initForm(): any {
    this.myForm = this.fb.group({
      firstnameValue: ['',
      [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿÀ-ʯ\u00f1\u00d1]*$')
      ]],
      lastnameValue: ['',
      [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-ZÀ-ÿÀ-ʯ\u00f1\u00d1]*$')
      ]],
      emailValue: ['', [Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      phonenumberValue: ['',
      [Validators.required,
        Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im)
      ]],
      dateValue: [null, [
        Validators.required
      ]],
      birthnumberValue: ['', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.minLength(9),
        Validators.maxLength(10),
      ]],
      streetNameValue: ['', [
        Validators.required,
        Validators.pattern('^[ a-zA-ZÀ-ÿÀ-ʯ\u00f1\u00d1]*$'),
        Validators.minLength(4),
        Validators.maxLength(30),
      ]],
      streetNumberValue: ['', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
      insuranceCompNumber: ['--Vyberte jednu z moznosti--', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.maxLength(2)
      ]],
      insuranceRelationship: ['Zamestnanec', [
        Validators.required
      ]],
      patientEmployer: ['--Vyberte vašeho zamestnávateľa--', [
        Validators.required,  
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ]],
      pscValue: ['', [
        Validators.required,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        Validators.minLength(5),
        Validators.maxLength(5)
      ]]
    });
  }

  addInsRelControls(): any{
    const arr = this.relationships.map(element => {
      return this.fb.control(false);
    });
    return this.fb.array(arr);
  }

  public get emailValue(): any {
    return this.myForm.get('emailValue').value;
  }

  public get firstnameValue(): any {
    return this.myForm.get('firstnameValue').value;
  }

  public get lastnameValue(): any {
    return this.myForm.get('lastnameValue').value;
  }

  public get phonenumberValue(): any {
    return this.myForm.get('phonenumberValue').value;
  }

  public get dateValue(): Date {
    return this.myForm.get('dateValue').value;
  }

  public get birthnumberValue(): any {
    return this.myForm.get('birthnumberValue').value;
  }

  public get streetNameValue(): any {
    return this.myForm.get('streetNameValue').value;
  }

  public get streetNumberValue(): any {
    return this.myForm.get('streetNumberValue').value;
  }

  public get insuranceCompNumber(): any {
    return this.myForm.get('insuranceCompNumber').value;
  }

  public get relationship(): any {
    return this.myForm.get('insuranceRelationship').value;
  }

  public get patientEmployer(): any {
    return this.myForm.get('patientEmployer').value;
  }

  public get psc(): any {
    return this.myForm.get('pscValue').value;
  }

  

  dateValueValidation(control: FormControl): Observable<any> {
    if (this.validateDatepicker(this.dateValue))
    {
      throw new Error('Bad date value');
    }
    else
    {
      return null;
    }
  }

  private validateDatepicker(value: Date): boolean{
    let isValid = false;
    const now = new Date();
    if (this.dateValue < now) {
      isValid = true;
    }
    return isValid;
  }

  addPatient(): void {
    if (true) {
      let patient = this.createPatient();
      this.service.updateList(patient).subscribe((response) => {
        this.snackBar.open('Vaša požiadavka bola uložená', 'Hide', {
          duration: 15000,
        });
        this.resetForm();
      },
      (httpError: HttpErrorResponse) => {
        this.snackBar.open(httpError.error, 'Zavrieť', {
          duration: 15000,
        });
      });
    }
  }


  public resetForm(): void {
    this.formDirective.resetForm();
    this.myForm.reset();
    this.ngOnInit();
  }

  createEmployer(): void {

    let newId = 0;
    this.employers.forEach(employer => {
      if (employer.id > newId) {
        newId = employer.id;
      }
    });
    newId++;

    this.newEmployer = {
      id: newId,
      name:null,
      adressNumber:null,
      adressStreet:null,
      psc: null
    };

    const dialogRef = this.dialog.open(EmployerModalComponent, {
      panelClass: ['custom-dialog-container', 'custom-form-field-infix'],
      width: '700px',
      height: '500px',
      data: this.newEmployer,
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      this.catchEmployer(this.newEmployer);
      console.log('The dialog was closed');
    });
  }

  catchEmployer(employer: Employer) {
    this.employers.push(employer);
  }

  createPatient() {
    const entry = {
      id: this.birthnumberValue,
      firstname: this.firstnameValue,
      lastname: this.lastnameValue,
      dateOfBirth: this.dateValue,
      phoneNumber: this.phonenumberValue,
      email: this.emailValue,
      streetName: this.streetNameValue,
      streetNumber: this.streetNumberValue,
      insuranceNumber: this.insuranceCompNumber,
      insuranceRelationship: this.relationship,
      psc: this.psc,
      idEmployer: this.patientEmployer
    };
    return entry as Patient;
  }

}
