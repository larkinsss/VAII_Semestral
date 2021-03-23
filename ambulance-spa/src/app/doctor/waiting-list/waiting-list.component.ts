import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { WaitingListEntry } from 'src/app/model/patient';
import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';

@Component({
  selector: 'app-waiting-list',
  templateUrl: './waiting-list.component.html',
  styleUrls: ['./waiting-list.component.scss']
})
export class WaitingListComponent implements OnInit {
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
}
