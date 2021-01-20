import { HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FlexLayoutModule } from '@angular/flex-layout';
import { WaitingListComponent } from './waiting-list/waiting-list.component';
import { HomeComponent } from './home/home.component';
import { AmbulanceComponent } from './ambulance/ambulance.component';
import { AppointmentComponent } from './appointment/appointment.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { WaitingListEntryComponent } from './waiting-list-entry/waiting-list-entry.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AdminComponent } from './admin/admin/admin.component';
import { ProceduresEditorComponent } from './admin/procedures-editor/procedures-editor.component';
import { AmbulanceEditorComponent } from './admin/ambulance-editor/ambulance-editor.component';
import { RegisterComponent } from './register/register.component';
import { ProcedureEntryComponent } from './admin/procedure-entry/procedure-entry.component';
import { RequestsComponent } from './admin/requests/requests.component';
import {MatCardModule} from '@angular/material/card'; 


@NgModule({
  declarations: [
    AppComponent,
    WaitingListComponent,
    HomeComponent,
    AmbulanceComponent,
    AppointmentComponent,
    WaitingListEntryComponent,
    UserComponent,
    LoginComponent,
    AdminComponent,
    ProceduresEditorComponent,
    AmbulanceEditorComponent,
    RegisterComponent,
    ProcedureEntryComponent,
    RequestsComponent
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
    MatCardModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
