import { PnForm } from './../../model/pnForm';
import { EndDialogComponent } from './end-dialog/end-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PnEntryData } from './../../model/pnEntryData';
import { PnFormService } from './../../services/pn-form/pn-form.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';
import { HtmlParser } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pn-list',
  templateUrl: './pn-list.component.html',
  styleUrls: ['./pn-list.component.scss']
})
export class PnListComponent implements OnInit {

  public pnFormList: PnForm[];
  public patientList: Patient[];
  public dataListActive: PnEntryData[] = [];
  public dataListInactive: PnEntryData[] = [];
  dialogSubscription: any;
  

  constructor(private pnFormService: PnFormService, private patientService: WaitingListService, public dialog: MatDialog) {

    this.pnFormService.getAllPnForms().subscribe((result) => {
      this.pnFormList = result;

      let allPatients: Patient[];
      this.patientService.getWaitingList().subscribe(response => {

        allPatients = response;

        this.pnFormList.forEach(element => {
          const entry = {
            pnForm: element,
            patient: allPatients.find(patient =>  patient.id === element.patientBirthNumber)
          };
          let now = new Date;
          let pnDate = new Date(element.beginningDate);
          let difference = now.getTime() - pnDate.getTime();
          let numOfDays = difference / (1000 * 3600 * 24);
          if (numOfDays < 11) {
            this.dataListActive.push(entry);
          } else {
            this.dataListInactive.push(entry);
          }
          
        });

      });

      this.dataListActive.sort((a, b) => {
        const dateA = a.pnForm.beginningDate;
        const dateB = b.pnForm.beginningDate;
        if (dateA < dateB) {
          return -1;
        }
        if (dateA > dateB) {
          return 1;
        }
        return 0;
      });
    });


  }

  ngOnInit(): void {
  }

  updatePnForm(pnForm: PnForm) {
    this.pnFormService.updatePnForm(pnForm).subscribe(response => {
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  uploadPdf(pnForm: PnForm) {
    this.pnFormService.uploadDataToPdf(pnForm).subscribe(async response => {
      console.log(response);
      await this.delay(1000);
      this.pnFormService.downloadPnForm().subscribe((data) => {
        let pdfFile = new Blob([data], {type: 'application/pdf'});
        let downloadURL = URL.createObjectURL(pdfFile);
        let link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'pn_form.pdf';
        link.click();
        URL.revokeObjectURL(downloadURL);
      });
    },
    (err: HttpErrorResponse) => {
      console.error(err.message);
    });
  }

  onClick(target: HTMLElement) {
    let div = target.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }

  openEndDialog(pnForm: PnForm) {
    const dialogRef = this.dialog.open(EndDialogComponent, {
      panelClass: ['custom-dialog-container', 'custom-form-field-infix'],
      width: '700px',
      height: '500px',
      data: pnForm,
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}
