import { Router } from '@angular/router';
import { PnFormService } from './../../../services/pn-form/pn-form.service';
import { WaitingListEntry } from '../../../model/patient';
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

  constructor(public dialogRef: MatDialogRef<PatientDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PatientDetailDialogData,
              public pnformService: PnFormService,
              public router: Router
  ) {
    this.patient = data.patientData;
  }

  ngOnInit(): void {
    
  }

  createPN(patient: WaitingListEntry): void{
    this.router.navigate(['user/pn-form'], {state: {data: patient}});
    this.dialogRef.close();
  }
}
