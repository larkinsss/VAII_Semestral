import { PatientRecordComponent } from './doctor/patient-record/patient-record.component';
import { PnListComponent } from './doctor/pn-list/pn-list.component';
import { PnFormComponent } from './doctor/pn-form/pn-form.component';
import { PatientListComponent } from './doctor/patient-list/patient-list.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin/admin.component';
import { UserEditorComponent } from './admin/user-editor/user-editor.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './doctor/home/home.component';
import { AuthGuard } from './authguard/auth.guard';
import { UserComponent } from './doctor/user.component';
import { InsWorkerComponent } from './ins-worker/ins-worker.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'DOCTOR',
    },
    children:  [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'pn-list',
        component: PnListComponent
      },
      {
        path: 'patient-list',
        component: PatientListComponent
      },
      {
        path: 'patient-record',
        component: PatientRecordComponent
      },
      {
        path: 'pn-form',
        component: PnFormComponent
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
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'ADMIN',
    },
    children:  [
      {
        path: 'users',
        component: UserEditorComponent,
      },
      {
        path: 'requests', // child route path
        component: RequestsComponent, // child route component that the router renders
      },
      {
        path: '',
        redirectTo: 'users',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'ins-worker',
    component: InsWorkerComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'PSP',
    },
    children:  [
      {
        path: 'evidence',
        component: PnListComponent,
      },
      {
        path: '',
        redirectTo: 'evidence',
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
