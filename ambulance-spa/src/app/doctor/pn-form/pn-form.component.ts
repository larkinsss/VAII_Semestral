import { MatSnackBar } from '@angular/material/snack-bar';
import { PnForm } from 'src/app/model/pnForm';
import { Employer } from 'src/app/model/employer';
import { HttpErrorResponse } from '@angular/common/http';
import { EmployerService } from './../../services/employer/employer.service';
import { PatientService } from 'src/app/services/patient/patient.service';
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
  dateBeginnig: Date;
  dateEnding: Date;
  diagnoseMark: number;
  endDiagnoseMark: number;
  pnForm: FormGroup;
  diagnoseCategory = '--Vyberte jednu z moznosti--';
  isChecked = false;
  patientEmployer: Employer;
  now = new Date;

  diagnoses = [{ code: 1, name: 'Choroba' }, { code: 2 , name: 'Karantenne opatrenie' }, { code: 3, name: 'Uraz' }, { code: 4, name: 'Choroba z povolania' },
  { code: 5, name: 'Pracovny uraz' }, { code: 6, name: 'Uraz zav. inou osobou' }, { code: 7, name: 'Pozitie alkoholu alebo zneuzitie inych navykovych latok' }];

  @ViewChild('pnFormDirective') private formDirective: NgForm;

  constructor(private pnService: PnFormService,
              private formBuilder: FormBuilder,
              private pnFormDataService: PnFormDataService,
              private patientService: PatientService,
              private employerService: EmployerService,
              private snackBar: MatSnackBar) {
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

  /**
   * Getter for patient name
   */
  public get patientName(): any {
    return this.pnForm.get('patientName').value;
  }

  /**
   * Getter for patient birthnumber
   */
  public get patientBirthNumber(): any {
    return  this.pnForm.get('patientBirthNumber').value;
  }

  /**
   * Getter for patient address
   */
  public get adress(): any {
    return this.pnForm.get('adresa').value;
  }

  /**
   * Getter for patient temporary address during sickness leave
   */
  public get tempAdress(): string {
    return  this.pnForm.get('prechAdresa').value;
  }

  /**
   * Getter for patient employer
   */
  public get employer(): any {
    return this.pnForm.get('zamestnavatel').value;
  }

  /**
   * Getter for patient insurance relationship
   */
  public get insRel(): any {
    return  this.pnForm.get('poistnyVztah').value;
  }

  /**
   * Getter for patient insurance company code
   */
  public get insCode(): any {
    return  this.pnForm.get('kod').value;
  }

  /**
   * Getter for sickness leave beginning date
   */
  public get dateBeg(): Date {
    return  this.pnForm.get('dateBegValue').value;
  }

  /**
   * Getter for sickness leave beginning date
   */
  public get dateEnd(): Date {
    return  this.pnForm.get('dateEndValue').value;
  }

  /**
   * Getter for diagnose number
   */
  public get digNum(): any {
    return  this.pnForm.get('diagnoseNum').value;
  }

  /**
   * Getter for diagnose category
   */
  public get digCategory(): any {
    return  this.pnForm.get('diagnoseCat').value;
  }

  /**
   * Getter for temporary address checkbox value
   */
  public get tempAddressCheckbox(): any {
    return  this.pnForm.get('sameAdress').value;
  }

  /**
   * Getter for temporary address street name
   */
  public get tempStreet(): any {
    return  this.pnForm.get('temp_address_street').value;
  }

  /**
   * Getter for temporary address street number
   */
  public get tempNumber(): any {
    return  this.pnForm.get('temp_address_number').value;
  }

  /**
   * Getter for temporary address street postal code
   */
  public get tempPsc(): any {
    return  this.pnForm.get('temp_address_psc').value;
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  uploadPdf() {
    this.pnService.uploadDataToPdf(this.createPnForm()).subscribe(async response => {
      console.log(response);
      await this.delay(1000);
      this.savePdf();
    },
    (err: HttpErrorResponse) => {
      console.error(err.message);
    });
  }


  savePdf() {
    this.pnService.downloadPnForm().subscribe((data) => {
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
    this.pnService.postPnForm(this.createPnForm()).subscribe(response => {
      console.log(response);
      this.snackBar.open('Formulár bol uložený', 'Zatvoriť', {
        duration: 10000,
      });
      this.resetForm();
    },
    (err: HttpErrorResponse) => {
      console.error(err.message);
      this.snackBar.open(err.message, 'Zatvoriť', {
        duration: 10000,
      });
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
      doctorId: +localStorage.getItem('USER_ID'),
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

  onClick(target: HTMLElement) {
    let div = target.parentElement;
    div.style.opacity = "0";
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }

}
