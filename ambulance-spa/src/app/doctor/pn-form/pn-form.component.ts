import { PnForm } from 'src/app/model/pnForm';
import { Employer } from 'src/app/model/employer';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployerService } from './../../services/employer/employer.service';
import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';
import { Patient } from './../../model/patient';
import { PnFormService } from './../../services/pn-form/pn-form.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PnFormDataService } from 'src/app/services/pn-form-data/pn-form-data.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-pn-form',
  templateUrl: './pn-form.component.html',
  styleUrls: ['./pn-form.component.scss']
})
export class PnFormComponent implements OnInit {

  declare require: any;
  patient: Patient;
  pnFormServ: PnFormService;
  private pnFormDataService: PnFormDataService;
  dateBeginnig: Date;
  dateEnding: Date;
  diagnoseMark: number;
  endDiagnoseMark: number;
  pnForm: FormGroup;
  diagnoseCategory = '--Vyberte jednu z moznosti--';
  isChecked = false;
  patientEmployer: Employer;

  diagnoses = [{ code: 1, name: 'Choroba' }, { code: 2 , name: 'Karantenne opatrenie' }, { code: 3, name: 'Uraz' }, { code: 4, name: 'Choroba z povolania' },
  { code: 5, name: 'Pracovny uraz' }, { code: 6, name: 'Uraz zav. inou osobou' }, { code: 7, name: 'Pozitie alkoholu alebo zneuzitie inych navykovych latok' }];

  @ViewChild('pnFormDirective') private formDirective: NgForm;

  constructor(pnService: PnFormService,
              private formBuilder: FormBuilder,
              pnFormDataService: PnFormDataService,
              private patientService: WaitingListService,
              private employerService: EmployerService) {
    this.pnFormServ = pnService;
    this.pnFormDataService = pnFormDataService;
  }

  ngOnInit(): void {
    this.setForm();
    this.pnFormDataService.currentData.subscribe(data => {
      if (data != null) {
        this.patient = data;
        localStorage.setItem('patient-id', data.id);
        this.findEmployer();
      } else {
        const patientId = localStorage.getItem('patient-id');
        if (patientId != null) {
          this.patientService.getPatient(patientId).subscribe(response => {
            this.patient = response;
            this.findEmployer();
          });
        }
      }
    });
  }

  private findEmployer(): void {
    if (this.patient != null) {
      this.employerService.getEmployer(this.patient.idEmployer).subscribe(response => {
        this.patientEmployer = response;
        this.patchForm();
      },
      (err: HttpErrorResponse) => {
        console.error(err.message);
      });
    }
  }

  private setForm(): void {
    this.pnForm = this.formBuilder.group({
      patientName: ['', Validators.required],
      patientBirthNumber: '',
      adresa: '',
      prechAdresa: '',
      temp_address_street: '',
      temp_address_number: '',
      temp_address_psc: '',
      zamestnavatel: '',
      poistnyVztah: '',
      kod: '',
      diagnoseCat: '',
      dateBegValue: null,
      dateEndValue: null,
      diagnoseNum: '',
      sameAdress: false
    });
  }

  private patchForm(): void {
    this.pnForm.patchValue({
      patientName: this.patient.firstname + ' ' + this.patient.lastname,
      patientBirthNumber: this.patient.id,
      adresa: this.patient.streetName + ', ' + this.patient.streetNumber + ', Slovensko',
      prechAdresa: '',
      temp_address_street: '',
      temp_address_number: '',
      temp_address_psc: '',
      zamestnavatel: this.patientEmployer.name + ', ' + this.patientEmployer.adressStreet + ' '
                        + this.patientEmployer.adressNumber + ', ' + this.patientEmployer.psc,
      poistnyVztah: this.patient.insuranceRelationship,
      kod: this.patient.insuranceNumber,
      diagnoseCat: this.diagnoseCategory,
      dateBegValue: null,
      dateEndValue: null,
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

  public get tempAddressCheckbox(): any {
    return  this.pnForm.get('sameAdress').value;
  }

  public get tempStreet(): any {
    return  this.pnForm.get('temp_address_street').value;
  }

  public get tempNumber(): any {
    return  this.pnForm.get('temp_address_number').value;
  }

  public get tempPsc(): any {
    return  this.pnForm.get('temp_address_psc').value;
  }

  uploadPdf() {
    this.pnFormServ.uploadDataToPdf(this.createPnForm()).subscribe(response => {
      console.log(response);
      this.savePdf();
    },
    (err: HttpErrorResponse) => {
      console.error(err.message);
    });
  }


  savePdf() {
    this.pnFormServ.downloadPnForm().subscribe((data) => {
      let pdfFile = new Blob([data], {type: 'application/pdf'});
      let downloadURL = URL.createObjectURL(pdfFile);
      let link = document.createElement('a');
      link.href = downloadURL;
      link.download = 'pn_form.pdf';
      link.click();
      URL.revokeObjectURL(downloadURL);
    });
  }


  saveForm(): any{
    this.pnFormServ.postPnForm(this.createPnForm()).subscribe(response => {
      console.log(response);
      this.resetForm();
    },
    (err: HttpErrorResponse) => {
      console.error(err.message);
    });
  }

  onCheckboxChange(data: any): void {
    console.log(this.tempAddressCheckbox);
    if (this.tempAddressCheckbox) {
      this.pnForm.controls.prechAdresa.setValue(this.adress);
    } else {
      this.pnForm.controls.prechAdresa.setValue(null);
    }
    console.log(this.tempAdress);
  }

  createPnForm(): PnForm {
    const entry = {
      id: Guid.create().toString(),
      streetName: null,
      streetNumber: null,
      tempAddressPSC: null,
      beginningDate: this.dateBeg,
      endDate: this.dateEnd,
      diagnoseCategory: this.digCategory,
      diagnoseNumber: this.digNum,
      endDiagnose: null,
      patientBirthNumber: this.patient.id,
      doctorId: 4,
      status: 0
    };

    if (!this.tempAddressCheckbox) {
       entry.streetName = this.tempStreet;
       entry.streetNumber = this.tempNumber;
       entry.tempAddressPSC = this.tempPsc;
    } else {
      entry.streetName = this.patient.streetName;
      entry.streetNumber = this.patient.streetNumber;
      entry.tempAddressPSC = this.patient.psc;
    }
    return entry;
  }

  // private splitTempAdress(i: number): any {
  //   if (!this.tempAddressCheckbox) {
  //     const splits = this.tempAdress.split(',', 2);
  //     return splits[i].trim();
  //   }
  //   return null;
  // }

  private resetForm(): void {
    this.formDirective.resetForm();
    this.pnForm.reset();
    this.ngOnInit();
  }

}
