import { ZipService } from './../../../services/zip/zip.service';
import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PnFormService } from './../../../services/pn-form/pn-form.service';
import { Patient } from '../../../model/patient';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PatientDetailDialogData } from 'src/app/model/patient-detail-dialog-data';
import { PnFormDataService } from 'src/app/services/pn-form-data/pn-form-data.service';
import { Zip } from 'src/app/model/zip';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss']
})
export class PatientDetailComponent implements OnInit {

  patient: Patient;
  pnFormDataService: PnFormDataService;
  localData: Patient;
  patientZip: Zip = new Zip;
  poistovne = [{code: 25, name: 'VšZP'}, {code: 24, name: 'Dôvera'}, {code: 27, name: 'UNION'}];
  poistovna: {code: number , name: string};

  constructor(public dialogRef: MatDialogRef<PatientDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PatientDetailDialogData,
              public pnformService: PnFormService,
              public router: Router,
              pnFormDataService: PnFormDataService,
              public deleteDialog: MatDialog,
              private pscServ: ZipService
  ) {
    this.patient = data.patientData;
    this.pnFormDataService = pnFormDataService;
  }

  ngOnInit(): void {
    this.pscServ.getZip(this.data.patientData.psc).subscribe(response => {
      this.patientZip = response;
    });
    this.poistovna = this.poistovne.find(entry => entry.code == this.data.patientData.insuranceNumber);
    this.pnFormDataService.currentData.subscribe(data => {
      this.localData = data
      
    });
    
  }

  createPN(patient: Patient): void{
    this.pnFormDataService.changeData(patient);
    this.router.navigate(['user/pn-form']);
    this.dialogRef.close();
  }

  openDeleteDialog(patient: Patient): void {
    this.deleteDialog.open(DeleteDialogComponent, {
      data: patient,
    });
    this.dialogRef.close();
  }
}
