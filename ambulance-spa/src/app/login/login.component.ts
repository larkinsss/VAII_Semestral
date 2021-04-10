import { LoginService } from '../services/login/login.service';
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
      if(localStorage.getItem('AUTHENTICATED') === 'true'){
        this.loginCorrect= true;
        this.routeAccordingToRole(localStorage.getItem('ROLE'));
      } else {
        this.loginCorrect= false;
      }
      
    });
    
    
  }

  routeAccordingToRole(role: string): void{
    switch (role) {
      case 'ADMIN':
        this.router.navigate(['admin']);
        break;
      case 'DOCTOR':
        this.router.navigate(['user/home']);
        break;
      case 'PSP':
        this.router.navigate(['ins-worker']);
        break;
    }
  }

  registerUser(){
    this.router.navigate(['register']);
  }
}
