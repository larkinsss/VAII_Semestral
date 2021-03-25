import { Router } from '@angular/router';
import { PnFormService } from './../../../services/pn-form/pn-form.service';
import { WaitingListEntry } from '../../../model/patient';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientDetailDialogData } from 'src/app/model/patient-detail-dialog-data';
import { PnFormDataService } from 'src/app/services/pn-form-data/pn-form-data.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  patient: WaitingListEntry;
  pnFormDataService: PnFormDataService;
  localData: WaitingListEntry;

  constructor(public dialogRef: MatDialogRef<PatientDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PatientDetailDialogData,
              public pnformService: PnFormService,
              public router: Router,
              pnFormDataService: PnFormDataService
  ) {
    this.patient = data.patientData;
    this.pnFormDataService = pnFormDataService;
  }

  ngOnInit(): void {
    this.pnFormDataService.currentData.subscribe(data => this.localData = data);
  }

  createPN(patient: WaitingListEntry): void{
    this.pnFormDataService.changeData(patient);
    this.router.navigate(['user/pn-form']);
    this.dialogRef.close();
  }
}
