import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { AuthGuard } from './../authguard/auth.guard';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  authGuard: AuthGuard;
  authServ: AuthService;
  router: Router;


  constructor(authGuard: AuthGuard, authServ: AuthService, router: Router) { 
    this.authGuard = authGuard;
    this.authServ = authServ;
    this.router = router;
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.authServ.logout();
    this.router.navigate(['login']);
  }



}
