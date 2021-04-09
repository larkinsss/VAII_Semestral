import { AuthGuard } from './../authguard/auth.guard';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ins-worker',
  templateUrl: './ins-worker.component.html',
  styleUrls: ['./ins-worker.component.scss']
})
export class InsWorkerComponent implements OnInit {

  constructor(public authGuard: AuthGuard, public authServ: LoginService, public router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authServ.logout();
    this.router.navigate(['login']);
  }

}
