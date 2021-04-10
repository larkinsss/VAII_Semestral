import { Employer } from './../model/employer';
import { EmployerService } from './../services/employer/employer.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm, FormArray } from '@angular/forms';
import { WaitingListService } from '../services/waiting-list/waiting-list.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  myForm: FormGroup;
  employee = false;
  hospIns = false;
  willingIns = false;
  showWarning = false;
  relationships: Array<string> = ['Zamestnanec', 'Povinne nemocensky poistená samostatne zárobkovo činná osoba', 'Dobrovoľne nemocensky poistená osoba' ];
  poistovne = [{code: 25, name: 'VšZP'}, {code: 24, name: 'Dôvera'}, {code: 27, name: 'UNION'}];
  employers: Array<Employer>;

  @ViewChild('appointmentForm') private formDirective: NgForm;

  constructor(private service: WaitingListService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private employerService: EmployerService) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      firstnameValue: ['',
      [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      lastnameValue: ['',
      [Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      emailValue: ['', [Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      phonenumberValue: ['',
      [Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')
      ]],
      dateValue: [null, [
        Validators.required
      ]],
      birthnumberValue: ['', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(10),
      ]],
      streetNameValue: ['', [
        Validators.required,
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
      insuranceRelationship: ['Zamestnanec', [Validators.required]],
      patientEmployer: ['--Vyberte vašeho zamestnávateľa--', [Validators.required]],
      pscValue: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(5)
      ]]
    });

    this.employerService.getEmployers().subscribe((response) => {
      this.employers = response;
    },
    (err: HttpErrorResponse) => {
      console.error(err.message);
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

  addAppointment(): void {
    if (this.firstnameValue !== undefined &&
      this.lastnameValue !== undefined &&
      this.emailValue !== undefined &&
      this.phonenumberValue !== undefined) {
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
      this.service.updateList(entry as Patient).subscribe((response) => {
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

  private resetForm(): void {
    this.formDirective.resetForm();
    this.myForm.reset();
    this.ngOnInit();
  }

}
