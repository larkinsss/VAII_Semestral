import { Router } from '@angular/router';
import { PnFormDataService } from './../../services/pn-form-data/pn-form-data.service';
import { Patient } from '../../model/patient';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PatientService } from 'src/app/services/patient/patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  searchText: string;
  patients: Patient[];
  waitingListService: PatientService;
  dialogSubscription: Subscription;
  pnFormDataService;
  currentData: Patient;

  constructor(waitingService: PatientService, public dialog: MatDialog, pnFormDataService: PnFormDataService, private router: Router) {
    this.waitingListService = waitingService;
    this.pnFormDataService = pnFormDataService;
  }

  ngOnInit(): void {
    this.waitingListService.getWaitingList().subscribe(response => {
      this.patients = response;
    });

    //this.pnFormDataService.currentData.subscribe(data => this.currentData = data);
  }

  public openPatientDetail(patient: Patient): any {
    const dialogRef = this.dialog.open(PatientDetailComponent, {
      panelClass: ['custom-dialog-container', 'custom-form-field-infix'],
      width: '700px',
      height: '500px',
      data: { patientData: patient },
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  createNewPatient(): void {
    this.router.navigate(['user/patient-record']);
  }

}
