import { ProfileComponent } from './../profile/profile.component';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../authguard/auth.guard';
import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  authGuard: AuthGuard;
  authServ: LoginService;
  router: Router;
  loggedUser: User;
  username: string;
  dialogSubscription: any;

  constructor(authGuard: AuthGuard, authServ: LoginService, router: Router, public dialog: MatDialog) {
    this.authGuard = authGuard;
    this.authServ = authServ;
    this.router = router;

    this.username = localStorage.getItem('USERNAME');
    const userID = localStorage.getItem('USER_ID');
    this.authServ.getUserById(userID).subscribe(response => {
      this.loggedUser = response;
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    });
  }


  ngOnInit(): void {
  }

  logout(): void {
    this.authServ.logout();
    this.router.navigate(['login']);
  }

  openProfile(): void {
    const dialogRef = this.dialog.open(ProfileComponent, {
      panelClass: ['custom-dialog-container', 'custom-form-field-infix'],
      width: '700px',
      height: '500px',
      data: { user: this.loggedUser },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



}
