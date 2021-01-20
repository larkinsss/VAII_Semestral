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
  loginService: LoginService;
  loginCorrect: boolean = true;

  constructor(private loginServ: LoginService, private http: HttpClient, private router: Router) { 
    this.loginService = loginServ;
  }

  ngOnInit(): void {
  }

  login() {
    this.loginService.authenticate(this.credentials, () => {
        this.routeAccordingToRole(localStorage.getItem('ROLE'));
    });
    if(this.loginServ.authenticated){
      this.loginCorrect= true;
    } else {
      this.loginCorrect= false;
    }
    
  }

  routeAccordingToRole(role: string): void{
    if (role === 'ADMIN') {
      this.router.navigate(['admin']);
    } else {
      this.router.navigate(['user/home']);
    }
  }

  registerUser(){
    this.router.navigate(['register']);
  }

}
