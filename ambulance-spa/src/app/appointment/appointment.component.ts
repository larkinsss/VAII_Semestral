import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { WaitingListEntry } from 'src/app/model/waiting-list-entry';
import { WaitingListService } from 'src/app/services/waiting-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  myForm: FormGroup;
  // firstName: string;
  // lastName: string;
  // dateOfBirth: Date;
  // phoneNumber: string;
  // email: string;
  // descIllness: string;
  // timeOfArrival: Date;
  showWarning = false;
  @ViewChild('appointmentForm') private formDirective: NgForm;

  constructor(private service: WaitingListService, private snackBar: MatSnackBar, private fb: FormBuilder) {
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
        Validators.pattern('^((\\+91-?)|0)?[0-9]{12}$')
      ]],
      dateValue: [null, [
        Validators.required
      ]],
      illnessValue: ['', [Validators.required, Validators.maxLength(150)]]
    });
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

  public get illnessValue(): any {
    return this.myForm.get('illnessValue').value;
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
      const timeOfArrival = new Date();
      const entry = {
        firstname: this.firstnameValue,
        lastname: this.lastnameValue,
        dateOfBirth: this.dateValue,
        phoneNumber: this.phonenumberValue,
        email: this.emailValue,
        illnessDesc: this.illnessValue,
        dateOfArrival: timeOfArrival
      };
      this.service.updateList(entry as WaitingListEntry).subscribe((response) => {
        this.snackBar.open('Your appointment was saved!', 'Hide', {
          duration: 3000,
        });
        this.resetForm();
      });
    }
  }

  private resetForm(): void {
    this.formDirective.resetForm();
    this.myForm.reset();
    this.ngOnInit();
  }

}
