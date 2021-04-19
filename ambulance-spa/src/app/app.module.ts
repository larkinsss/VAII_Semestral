import { PatientDetailComponent } from './doctor/patient-list/patient-detail/patient-detail.component';
import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeComponent } from './doctor/home/home.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserComponent } from './doctor/user.component';
import { LoginComponent } from './login/login.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { AdminComponent } from './admin/admin/admin.component';
import { UserEditorComponent } from './admin/user-editor/user-editor.component';
import { RegisterComponent } from './register/register.component';
import { RequestsComponent } from './admin/requests/requests.component';
import { MatCardModule } from '@angular/material/card';
import { PatientListComponent } from './doctor/patient-list/patient-list.component';
import { FilterPipe } from './patient-filter.pipe';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PnFormComponent } from './doctor/pn-form/pn-form.component';
import { MatRadioModule } from '@angular/material/radio';
import { PnListComponent } from './doctor/pn-list/pn-list.component';
import { PnListEntryComponent } from './doctor/pn-list/pn-list-entry/pn-list-entry.component';
import { InsWorkerComponent } from './ins-worker/ins-worker.component';
import { MatMenuModule } from '@angular/material/menu';
import { ProfileComponent } from './profile/profile.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PatientRecordComponent } from './doctor/patient-record/patient-record.component';
import { EmployerModalComponent } from './doctor/patient-record/employer-modal/employer-modal.component';
import { UserEntryComponent } from './admin/user-editor/user-entry/user-entry.component';
import { EndDialogComponent } from './doctor/pn-list/end-dialog/end-dialog.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    LoginComponent,
    AdminComponent,
    UserEditorComponent,
    RegisterComponent,
    RequestsComponent,
    PatientListComponent,
    FilterPipe,
    PatientDetailComponent,
    PnFormComponent,
    PnListComponent,
    PnListEntryComponent,
    InsWorkerComponent,
    ProfileComponent,
    PasswordResetComponent,
    PatientRecordComponent,
    EmployerModalComponent,
    UserEntryComponent,
    EndDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    FormsModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatBadgeModule,
    MatProgressSpinnerModule
  ],
  providers: [MatSnackBar, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  entryComponents: [PatientDetailComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
