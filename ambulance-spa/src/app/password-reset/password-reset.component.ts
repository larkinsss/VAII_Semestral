import { Component, Inject, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../model/user';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {
  myForm: any;
  changeFullName: any;
  changeEmail: any;
  changeUserName: any;
  email: any;
  fullName: any;
  userName: any;
  userId: any;
  changeRequest: any;

  constructor(
    public dialogRef: MatDialogRef<PasswordResetComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) {

  }

  ngOnInit(): void {
  }

}
