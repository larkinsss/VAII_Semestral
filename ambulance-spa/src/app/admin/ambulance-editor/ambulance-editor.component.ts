import { LoginService } from './../../services/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WaitingListEntry } from 'src/app/model/waiting-list-entry';
import { WaitingListService } from 'src/app/services/waiting-list.service';

@Component({
  selector: 'app-ambulance-editor',
  templateUrl: './ambulance-editor.component.html',
  styleUrls: ['./ambulance-editor.component.scss']
})
export class AmbulanceEditorComponent implements OnInit {
  public waitingList: WaitingListEntry[];

  constructor(private service: WaitingListService, private snackBar: MatSnackBar) {
    this.service.getWaitingList().subscribe((result) => {
      this.waitingList = result;
      this.waitingList.sort((a, b) => {
        const dateA = a.dateOfArrival;
        const dateB = b.dateOfArrival;
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

  saveEntry(value) {
    console.log(value);
  }

  onDelete(data: WaitingListEntry): void {
    // this.waitingList = this.waitingList.filter((e) => e.email !== data.email);
    this.service.deleteFromList(data.id).subscribe((response) => {
      this.waitingList = this.waitingList.filter((e) => e.id !== data.id);
      this.snackBar.open('Selected appointed is removed!', 'Hide', {
        duration: 3000,
      });
    });
  }

  onUpdate(data: WaitingListEntry): void {
    this.service.updateEntry(data).subscribe((response) => {
      this.snackBar.open('Selected appointment is updated!', 'Hide', {
        duration: 3000,
      });
    });
  }

  deleteAllRecords(): void {
    this.service.deleteAll().subscribe((resonse) => {
      this.waitingList = [];
      this.snackBar.open('All appointments were removed!', 'Hide', {
        duration: 3000,
      });
    }, (error: HttpErrorResponse) => {
      if (error.status === 202) {
        this.waitingList = [];
        this.snackBar.open('All appointments will be removed!', 'Hide', {
        duration: 3000,
      });
      } else
      {
        console.log(error.message);
      }
    });
  }

}
