import { WaitingListEntry } from '../../model/patient';
import { PatientDetailComponent } from './patient-detail/patient-detail.component';
import { MatDialog } from '@angular/material/dialog';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  searchText: string;
  patients: WaitingListEntry[];
  waitingListService: WaitingListService;
  dialogSubscription: Subscription;

  constructor(waitingService: WaitingListService, public dialog: MatDialog) {
    this.waitingListService = waitingService;

  }

  ngOnInit(): void {
    this.waitingListService.getWaitingList().subscribe(response => {
      this.patients = response;
    });
  }

  public openPatientDetail(patient: WaitingListEntry): any {
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

}
