import { WaitingListEntry } from './../../model/waiting-list-entry';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientDetailDialogData } from 'src/app/model/patient-detail-dialog-data';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  patient: WaitingListEntry;

  constructor(public dialogRef:MatDialogRef<PatientDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PatientDetailDialogData,
  ) {
    this.patient = data.patientData;
  }

  ngOnInit(): void {
  }

  createPN(){
    
  }
}
