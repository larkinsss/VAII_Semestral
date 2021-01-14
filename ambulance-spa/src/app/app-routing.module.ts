import { AppComponent } from './app.component';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'waiting-list', component: WaitingListComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'ambulance', component: AmbulanceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
