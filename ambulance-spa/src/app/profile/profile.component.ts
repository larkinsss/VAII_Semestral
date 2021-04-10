import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './../services/login/login.service';
import { ProfileData } from './../model/profile-data';
import { User } from 'src/app/model/user';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('passwordForm') private formDirective: NgForm;
  myForm: any;
  changeRequest: User;
  userId: any;
  userName: any;
  fullName: any;
  email: string;
  changeUserName: any;
  changeFullName: any;
  changeEmail: string;
  hide = true;
  changeFirstName: string;
  changeLastName: string;
  emailPattern;
  profileForm: any;


  constructor(
    public dialogRef: MatDialogRef<ProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProfileData,
    private fb: FormBuilder,
    private loginServ: LoginService,
    private snackBar: MatSnackBar
  ) {
    this.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }

  ngOnInit(): void {
    this.changeRequest = new User();
    this.userId = this.data.user.id;
    this.userName = this.data.user.username;
    this.email = this.data.user.email;
    this.changeUserName = this.userName;
    this.changeFirstName = this.data.user.firstname;
    this.changeLastName = this.data.user.lastname;
    this.changeEmail = this.email;
    this.createPassForm();
    this.createProfileForm();
  }

  private createProfileForm(): any {
    this.profileForm = this.fb.group({
      firstnameValue: this.changeFirstName,
      lastnameValue: this.changeLastName,
      emailValue: [ this.changeEmail, [
        Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]]
    });
  }

  private createPassForm(): any{
    this.myForm = this.fb.group({
      password1: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}'),
        Validators.minLength(8),
        Validators.min(8),
        Validators.max(20)
      ]],
      password2: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}'),
        Validators.minLength(8),
        Validators.min(8),
        Validators.max(20)
      ]],
      password3: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&]).{8,}'),
        Validators.minLength(8),
        Validators.min(8),
        Validators.max(20)
      ]]
    });
  }


  public get password1(): any{
    return this.myForm.get('password1').value;
  }

  public get password2(): any{
    return this.myForm.get('password2').value;
  }

  public get password3(): any{
    return this.myForm.get('password3').value;
  }

  public get firstnameValue(): any{
    return this.profileForm.get('firstnameValue').value;
  }

  public get lastnameValue(): any{
    return this.profileForm.get('lastnameValue').value;
  }

  public get emailValue(): any{
    return this.profileForm.get('emailValue');
  }

  public closeDialog() {
    this.dialogRef.close();
  }

  public updateProfile(): void {
    const newUser = this.data.user;
    newUser.firstname = this.changeFirstName;
    newUser.lastname = this.changeLastName;
    newUser.email = this.changeEmail;
    this.loginServ.upsertUser(newUser).subscribe(response => {
      this.snackBar.open('Vaše údaje boli zmenené', 'Zatvoriť', {
        duration: 10000,
      });
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open('Úprava údajov bola neúspešná', 'Zatvoriť', {
        duration: 10000,
      });
    });
  }

  public changePassword(): void {
    const request = {
      oldPassword: this.password1,
      newPassword: this.password2,
      username: this.userName
    };
    this.loginServ.changeUserPassword(request).subscribe(response => {
      this.resetForm();
      this.snackBar.open('Heslo úspešne zmenené', 'Zatvoriť', {
        duration: 10000,
      });
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open('Heslo sa nepodarilo zmeniť', 'Zatvoriť', {
        duration: 10000,
      });
    });
  }

  resetForm() {
    this.formDirective.resetForm();
    this.myForm.reset();
    this.createPassForm();
  }
}
