import { LoginService } from './../services/login.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials = {username: '', password: ''};
  error:string;

  constructor(private loginService: LoginService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.loginService.authenticate(this.credentials, () => {
        this.routeAccordingToRole(localStorage.getItem('ROLE'));
    });
    return false;
  }

  routeAccordingToRole(role: string): void{
    if (role === 'ADMIN') {
      this.router.navigate(['admin/home']);
    } else {
      this.router.navigate(['user/home']);
    }
  }

}
