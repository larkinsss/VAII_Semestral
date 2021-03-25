import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';
import { WaitingListEntry } from './../../model/patient';
import { PnFormService } from './../../services/pn-form/pn-form.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { PnFormDataService } from 'src/app/services/pn-form-data/pn-form-data.service';

@Component({
  selector: 'app-pn-form',
  templateUrl: './pn-form.component.html',
  styleUrls: ['./pn-form.component.scss']
})
export class PnFormComponent implements OnInit {

  patient: WaitingListEntry;
  pnFormServ: PnFormService;
  private pnFormDataService: PnFormDataService;
  dateBeginnig: Date;
  dateEnding: Date;
  diagnoseMark: number;
  endDiagnoseMark: number;
  pnForm: FormGroup;
  diagnoseCategory = '--Vyberte jednu z moznosti--';
  isChecked = false;
  // localData: WaitingListEntry;

  diagnoses = [{ code: 1, name: 'Choroba' }, { code: 2 , name: 'Karantenne opatrenie' }, { code: 3, name: 'Uraz' }, { code: 4, name: 'Choroba z povolania' },
  { code: 5, name: 'Pracovny uraz' }, { code: 6, name: 'Uraz zav. inou osobou' }, { code: 7, name: 'Pozitie alkoholu alebo zneuzitie inych navykovych latok' }];

  @ViewChild('pnFormDirective') private formDirective: NgForm;

  constructor(pnService: PnFormService,
              private formBuilder: FormBuilder,
              pnFormDataService: PnFormDataService,
              private patientService: WaitingListService) {
    this.pnFormServ = pnService;
    this.pnFormDataService = pnFormDataService;
  }

  ngOnInit(): void {
    // this.patient = history.state.data;
    // console.log(this.patient);
    this.pnFormDataService.currentData.subscribe(data => {
      if (data != null) {
        this.patient = data;
        localStorage.setItem('patient-id', data.id);
        this.setForm();
      } else {
        const patientId = localStorage.getItem('patient-id');
        if (patientId != null) {
          this.patientService.getPatient(patientId).subscribe(response => {
            this.patient = response;
            this.setForm();
          });
        }
      }
    });
  }

  private setForm(): void {
    this.pnForm = this.formBuilder.group({
      patientName: this.patient.firstname + ' ' + this.patient.lastname,
      patientBirthNumber: this.patient.id,
      adresa: this.patient.streetName + ' ' + this.patient.streetNumber + ', Slovensko',
      prechAdresa: '',
      zamestnavatel: '',
      poistnyVztah: this.patient.insuranceRelationship,
      kod: this.patient.insuranceNumber,
      diagnoseCat: this.diagnoseCategory,
      dateBegValue: '',
      dateEndValue: '',
      diagnoseNum: '',
      sameAdress: false
    });
  }

  public get patientName(): any {
    return this.pnForm.get('patientName').value;
  }

  public get patientBirthNumber(): any {
    return  this.pnForm.get('patientBirthNumber').value;
  }

  public get adress(): any {
    return this.pnForm.get('adresa').value;
  }

  public get tempAdress(): string {
    return  this.pnForm.get('prechAdresa').value;
  }

  public get employer(): any {
    return this.pnForm.get('zamestnavatel').value;
  }

  public get insRel(): any {
    return  this.pnForm.get('poistnyVztah').value;
  }

  public get insCode(): any {
    return  this.pnForm.get('kod').value;
  }

  public get dateBeg(): any {
    return  this.pnForm.get('dateBegValue').value;
  }

  public get dateEnd(): any {
    return  this.pnForm.get('dateEndValue').value;
  }

  public get digNum(): any {
    return  this.pnForm.get('diagnoseNum').value;
  }

  public get digCategory(): any {
    return  this.pnForm.get('diagnoseCat').value;
  }

  public get sameAdress(): any {
    return  this.pnForm.get('sameAdress').value;
  }

  saveForm(): any{
    console.log(this.digCategory);
  }

  onCheckboxChange(data: any): void {
    console.log(this.sameAdress);
    if (this.sameAdress) {
      this.pnForm.controls.prechAdresa.setValue(this.adress);
    } else {
      this.pnForm.controls.prechAdresa.setValue(null);
    }
    console.log(this.tempAdress);
  }





}
