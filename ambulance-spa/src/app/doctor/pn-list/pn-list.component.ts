import { HttpErrorResponse } from '@angular/common/http';
import { PnEntryData } from './../../model/pnEntryData';
import { PnFormService } from './../../services/pn-form/pn-form.service';
import { Component, OnInit } from '@angular/core';
import { PnForm } from 'src/app/model/pnForm';
import { Patient } from 'src/app/model/patient';
import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';

@Component({
  selector: 'app-pn-list',
  templateUrl: './pn-list.component.html',
  styleUrls: ['./pn-list.component.scss']
})
export class PnListComponent implements OnInit {

  public pnFormList: PnForm[];
  public patientList: Patient[];
  public dataList: PnEntryData[] = [];
  

  constructor(private pnFormService: PnFormService, private patientService: WaitingListService) {

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
          this.dataList.push(entry);
        });

      });

      this.pnFormList.sort((a, b) => {
        const dateA = a.beginningDate;
        const dateB = b.beginningDate;
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


}
