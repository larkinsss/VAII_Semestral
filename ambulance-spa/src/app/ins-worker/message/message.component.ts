import { MessageService } from './../../services/message/message.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PnForm } from 'src/app/model/pnForm';
import { PnFormService } from 'src/app/services/pn-form/pn-form.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  messageForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<MessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PnForm,
              private pnFormServ: PnFormService,
              private snackBar: MatSnackBar,
              private fb: FormBuilder,
              private messageServ: MessageService
  ) {

    this.messageForm = this.fb.group({
      message: ['', [
        Validators.required,
        Validators.maxLength(350),
        Validators.minLength(2),
        Validators.pattern('^[ a-zA-ZÀ-ÿÀ-ʯ\u00f1\u00d1]*$')
      ]],
    });
  }

  ngOnInit(): void {
  }

  public get message(): string {
    return this.messageForm.get('message').value;
  }

  postMessage(): void {
    const message = {
      id: null,
      text: this.message,
      pnForm: this.data.id
    };
    this.messageServ.postMessage(message).subscribe(response => {
      this.data.status = 1;
      this.pnFormServ.updatePnForm(this.data).subscribe(response => {
        window.location.reload();
        this.snackBar.open('Správa uložená', 'Zatvoriť', {
          duration: 10000,
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error.message);
      });
      
    },
    (error: HttpErrorResponse) => {
      this.snackBar.open(error.message, 'Zatvoriť', {
        duration: 10000,
      });
    });
  }

}
