import { WaitingListEntry } from './../../model/patient';
import { PnFormService } from './../../services/pn-form/pn-form.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-pn-form',
  templateUrl: './pn-form.component.html',
  styleUrls: ['./pn-form.component.scss']
})
export class PnFormComponent implements OnInit {

  patient: WaitingListEntry;
  private pnFormServ: PnFormService;
  dateBeginnig: Date;
  dateEnding: Date;
  diagnoseMark: number;
  endDiagnoseMark: number;
  pnForm: FormGroup;
  diagnoseCategory = '--Vyberte jednu z moznosti--';
  isChecked = false;

  diagnoses = ['Choroba', 'Karantenne opatrenie', 'Uraz',
  'Choroba z povolania', 'Pracovny uraz', 'Uraz zav. inou osobou',
  'Pozitie alkoholu alebo zneuzitie inych navykovych latok'];

  @ViewChild('pnFormDirective') private formDirective: NgForm;

  constructor(pnService: PnFormService, private formBuilder: FormBuilder, ) {
    this.pnFormServ = pnService;
  }

  ngOnInit(): void {
    this.patient = history.state.data;
    console.log(this.patient);

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
