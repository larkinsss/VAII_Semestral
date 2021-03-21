import { LoginService } from '../../services/login/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/authguard/auth.guard';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  authGuard: AuthGuard;
  authServ: LoginService;
  router: Router;

  constructor(authGuard: AuthGuard, authServ: LoginService, router: Router) { 
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
