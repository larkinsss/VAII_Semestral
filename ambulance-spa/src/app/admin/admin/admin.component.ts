import { UserService } from './../../services/user/user.service';
import { LoginService } from '../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/authguard/auth.guard';
import { User } from 'src/app/model/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  loggedUser: User;
  username: string;
  dialogSubscription: any;

  constructor(public authGuard: AuthGuard,
              private userService: UserService, 
              private router: Router, 
              public dialog: MatDialog, 
              private loginService: LoginService) {
    this.authGuard = authGuard;
    this.userService = userService;
    this.router = router;
    this.loginService = loginService;

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
      width: '980px',
      height: '720px',
      data: { user: this.loggedUser },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
