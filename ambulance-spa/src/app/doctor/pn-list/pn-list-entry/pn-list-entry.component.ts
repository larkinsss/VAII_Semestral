import { MessageComponent } from './../../../ins-worker/message/message.component';
import { Message } from './../../../model/message';
import { MessageService } from './../../../services/message/message.service';
import { UploadedFile } from './../../../model/uploadedFile';
import { PnEntryData } from './../../../model/pnEntryData';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from 'src/app/model/patient';
import { PnListComponent } from './../pn-list.component';
import { PatientService } from 'src/app/services/patient/patient.service';
import { PnForm } from './../../../model/pnForm';
import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { PnFormService } from 'src/app/services/pn-form/pn-form.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pn-list-entry',
  templateUrl: './pn-list-entry.component.html',
  styleUrls: ['./pn-list-entry.component.scss']
})
export class PnListEntryComponent implements OnInit{

  diagnoses = [{ code: 1, name: 'Choroba' }, { code: 2 , name: 'Karantenne opatrenie' }, { code: 3, name: 'Uraz' }, { code: 4, name: 'Choroba z povolania' },
  { code: 5, name: 'Pracovny uraz' }, { code: 6, name: 'Uraz zav. inou osobou' }, { code: 7, name: 'Pozitie alkoholu alebo zneuzitie inych navykovych latok' }];
  message: Message;


  @Input()
  public data: PnEntryData;

  @Output()
  public delete = new EventEmitter<PnForm>();

  @Output()
  public update = new EventEmitter<PnForm>();

  @Output()
  public print = new EventEmitter<PnForm>();

  @Output()
  public open = new EventEmitter<PnForm>();

  @Output()
  public change = new EventEmitter<UploadedFile>();

  @Output()
  public download = new EventEmitter<string>();
  dialogSubscription: any;

  constructor(private messageService: MessageService, public dialog: MatDialog, private messageServ: MessageService) {
  }

  ngOnInit(): void {
    if (this.data.pnForm.status === 1) {
      this.messageService.getMessage(this.data.pnForm.id).subscribe(response => {
        this.message = response;
      });
    }
  }

  downloadFile(name: string) {
    this.download.emit(name);
  }

  onUpdate(status: number) {
    if (status === 1) {
      this.openMessageDialog();
    } else {
      if (this.data.pnForm.status === 1) {
        this.messageServ.deleteMessage(this.data.pnForm.id).subscribe(response => {
          this.data.pnForm.status = status;
          this.update.emit(this.data.pnForm);
        });
      } else {
        this.data.pnForm.status = status;
        this.update.emit(this.data.pnForm);
      }
    }
  }

  openMessageDialog(): void {
    const dialogRef = this.dialog.open(MessageComponent, {
      panelClass: ['custom-dialog-container', 'custom-form-field-infix'],
      width: '980px',
      height: '300px',
      data: this.data.pnForm,
    });

    this.dialogSubscription = dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onPrint(pnForm: PnForm) {
    this.print.emit(pnForm);
  }

  onOpen(pnForm: PnForm) {
    this.open.emit(pnForm);
  }

  onFileSelected(file: File, pn: PnForm) {
    this.change.emit({file, pnForm: this.data.pnForm  });
  }

  showToSocWork() {
    if (localStorage.getItem('ROLE') === 'PSP') {
      return true;
    } else {
      return false;
    }
  }

  showToUser() {
    if (localStorage.getItem('ROLE') === 'DOCTOR') {
      return true;
    }
    return false;
  }

  mapDiagnose(diagnose: number) {
    return this.diagnoses.find(element => element.code === diagnose).name;
  }

  getTempAddress(): string {

    if (this.data.pnForm.streetName === null) {
      return this.data.patient.streetName + ' ' + this.data.patient.streetNumber + ', ' + this.data.patient.psc;
    } else {
      return this.data.pnForm.streetName + ' ' + this.data.pnForm.streetNumber + ', ' + this.data.pnForm.tempAddressPSC;
    }

  }

  getInsuranceComp(): string {
    switch (this.data.patient.insuranceNumber) {
      case 24:
        return '24 - Dôvera';
      case 25:
        return '25 - VšZP';
      case 27:
        return '27 - UNION';
    }
  }



}
