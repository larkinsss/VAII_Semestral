import { LoginComponent } from './login/login.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';
import { AuthGuard } from './authguard/auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'USER',
    },
    children:  [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'appointment', // child route path
        component: AppointmentComponent, // child route component that the router renders
      },
      {
        path: 'ambulance',
        component: AmbulanceComponent,
      },
            {
        path: 'waiting-list', 
        component: WaitingListComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'admin',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN',
    },
    children:  [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'appointment', // child route path
        component: AppointmentComponent, // child route component that the router renders
      },
      {
        path: 'ambulance',
        component: AmbulanceComponent,
      },
            {
        path: 'waiting-list', 
        component: WaitingListComponent
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
