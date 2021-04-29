import { Attachment } from './../../model/attachment';
import { UploadedFile } from './../../model/uploadedFile';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PnForm } from './../../model/pnForm';
import { EndDialogComponent } from './end-dialog/end-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PnEntryData } from './../../model/pnEntryData';
import { PnFormService } from './../../services/pn-form/pn-form.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
import { HtmlParser } from '@angular/compiler';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from 'src/app/services/patient/patient.service';

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
  public dataListEnded: PnEntryData[] = [];
  dialogSubscription: any;
  attachmentList: import('c:/Users/petla/git/bakalarska_praca_ambulancia/ambulance-spa/src/app/model/attachment').Attachment[];
  public loading;

  constructor(private pnFormService: PnFormService,
              private patientService: PatientService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {

    this.loading = true;

    this.pnFormService.getAllPnForms().subscribe((result) => {
      this.pnFormList = result;

      let allPatients: Patient[];
      this.patientService.getWaitingList().subscribe(response => {

        allPatients = response;

        this.pnFormService.getAllFiles().subscribe(files => {
          this.attachmentList = files;
          console.log(this.attachmentList);

          this.pnFormList.forEach(element => {

            const attachments: Attachment[] = [];

            this.attachmentList.forEach(att => {
              if (att.pnForm === element.id) {
                attachments.push(att);
              }
            });

            const entry = {
              pnForm: element,
              patient: allPatients.find(patient =>  patient.id === element.patientBirthNumber),
              attachments
            };

            const now = new Date;
            const pnDate = new Date(element.beginningDate);
            const difference = now.getTime() - pnDate.getTime();
            const numOfDays = difference / (1000 * 3600 * 24);
            if (element.endDate != null) {
              this.dataListEnded.push(entry);
            } else if (numOfDays < 11) {
              this.dataListActive.push(entry);
            } else {
              this.dataListInactive.push(entry);
            }
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

          this.loading = false;

        });
      });
    });
  }

  ngOnInit(): void {
  }

  updatePnForm(pnForm: PnForm): void {
    this.pnFormService.updatePnForm(pnForm).subscribe(response => {
    },
    (error: HttpErrorResponse) => {
      console.error(error.message);
    });
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  uploadPdf(pnForm: PnForm): void {
    this.pnFormService.uploadDataToPdf(pnForm).subscribe(async response => {
      console.log(response);
      await this.delay(1000);
      this.pnFormService.downloadPnForm().subscribe((data) => {
        const pdfFile = new Blob([data], {type: 'application/pdf'});
        const downloadURL = URL.createObjectURL(pdfFile);
        const link = document.createElement('a');
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

  onClick(target: HTMLElement): void {
    const div = target.parentElement;
    div.style.opacity = '0';
    setTimeout(function(){ div.style.display = 'none'; }, 600);
  }

  openEndDialog(pnForm: PnForm): void {
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

  onFileUpload(files: UploadedFile): void {
    const file: File = files.file.target.files[0];
    console.log(file);
    if (file) {
        this.pnFormService.uploadFile(file, files.pnForm.id).subscribe(response => {
          this.snackBar.open(response, 'Zatvoriť', {
            duration: 10000,
          });
          window.location.reload();
        },
        (error: HttpErrorResponse) => {
          this.snackBar.open(error.message, 'Zatvoriť', {
            duration: 10000,
          });
          window.location.reload();
        });
    }
  }

  onFileDownload(name: string): void {
    this.pnFormService.getFileByName(name).subscribe((data) => {
      const pdfFile = new Blob([data], {type: 'application/pdf'});
      const downloadURL = URL.createObjectURL(pdfFile);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = name;
      link.click();
      URL.revokeObjectURL(downloadURL);
    });
  }


}
