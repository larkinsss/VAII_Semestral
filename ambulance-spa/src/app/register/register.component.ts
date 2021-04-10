import { LoginService } from '../services/login/login.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { User } from '../model/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup;
  showWarning = false;
  @ViewChild('registerForm') private formDirective: NgForm;

  constructor(private service: LoginService, private snackBar: MatSnackBar, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      usernameValue: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z0-9_-]{8,15}$')
      ]],
      firstnameValue: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      lastnameValue: ['',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z]+$')
      ]],
      emailValue: ['', [
        Validators.required,
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]],
      passwordValue: ['',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}')
      ]],
      dateValue: [null, [
        Validators.required
      ]]
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

  public get passwordValue(): any {
    return this.myForm.get('passwordValue').value;
  }

  public get dateValue(): Date {
    return this.myForm.get('dateValue').value;
  }

  public get usernameValue(): any {
    return this.myForm.get('usernameValue').value;
  }

  registerNewUser(): void {
    if (this.firstnameValue !== undefined &&
      this.lastnameValue !== undefined &&
      this.emailValue !== undefined &&
      this.passwordValue !== undefined &&
      this.usernameValue !== undefined) {
      const entry = {
        id: null,
        username: this.usernameValue,
        email: this.emailValue,
        firstname: this.firstnameValue,
        lastname: this.lastnameValue,
        birthdate: this.dateValue,
        password: this.passwordValue,
        role: 'UNREGISTERED'
      };

      this.service.getNewUserId().subscribe(response =>
        {
          const newId = response as number;
          entry.id = newId;
          this.service.register(entry as User).subscribe(response =>
          {
            this.snackBar.open('Vaša žiadosť bola spracovaná', 'Zatvoriť', {
              duration: 10000,
            });
            this.resetForm();
          },
          error =>
          {
            this.snackBar.open('Vaša žiadosť neprešla, skúste to neskôr prosím.', 'Zatvoriť', {
              duration: 3000,
            });
          });
        },
        error => {});
    }
  }

  resetForm() {
    this.formDirective.resetForm();
    this.myForm.reset();
    this.ngOnInit();
  }
}
