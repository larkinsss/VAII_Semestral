import { PnEntryData } from './../../../model/pnEntryData';
import { HttpErrorResponse } from '@angular/common/http';
import { Patient } from 'src/app/model/patient';
import { PnListComponent } from './../pn-list.component';
import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';
import { PnForm } from './../../../model/pnForm';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pn-list-entry',
  templateUrl: './pn-list-entry.component.html',
  styleUrls: ['./pn-list-entry.component.scss']
})
export class PnListEntryComponent{

  diagnoses = [{ code: 1, name: 'Choroba' }, { code: 2 , name: 'Karantenne opatrenie' }, { code: 3, name: 'Uraz' }, { code: 4, name: 'Choroba z povolania' },
  { code: 5, name: 'Pracovny uraz' }, { code: 6, name: 'Uraz zav. inou osobou' }, { code: 7, name: 'Pozitie alkoholu alebo zneuzitie inych navykovych latok' }];

  @Input()
  public data: PnEntryData;

  @Output()
  public delete = new EventEmitter<PnForm>();

  @Output()
  public update = new EventEmitter<PnForm>();

  onUpdate(status: number) {
    this.data.pnForm.status = status;
    this.update.emit(this.data.pnForm);
  }

  showToAdmin() {
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
