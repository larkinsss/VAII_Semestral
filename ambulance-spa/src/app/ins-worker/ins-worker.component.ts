import { UserService } from './../services/user/user.service';
import { AuthGuard } from './../authguard/auth.guard';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../model/user';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-ins-worker',
  templateUrl: './ins-worker.component.html',
  styleUrls: ['./ins-worker.component.scss']
})
export class InsWorkerComponent implements OnInit {
  username: string;
  loggedUser: User;
  dialogSubscription: any;

  constructor(public authGuard: AuthGuard, 
    private userService: UserService, 
    public router: Router, 
    public dialog: MatDialog,
    private loginService: LoginService) {
    this.username = localStorage.getItem('USERNAME');
    let userID = localStorage.getItem('USER_ID');
    this.userService.getUserById(userID).subscribe(response => {
      this.loggedUser = response;
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    });
  }

  ngOnInit(): void {

  }

  logout(): void {
    this.loginService.logout();
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
