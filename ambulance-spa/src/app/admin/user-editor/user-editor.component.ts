import { LoginService } from '../../services/login/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Patient } from 'src/app/model/patient';
import { WaitingListService } from 'src/app/services/waiting-list/waiting-list.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  public userList: User[];

  constructor(private userService: LoginService, private snackBar: MatSnackBar) {
    this.userService.getAllUsers().subscribe((result) => {
      this.userList = result;
      this.userList.sort((a, b) => {
        const dateA = a.id;
        const dateB = b.id;
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

  saveEntry(value): any {
    console.log(value);
  }

  onDelete(data: User): void {
    // this.waitingList = this.waitingList.filter((e) => e.email !== data.email);
    this.userService.deleteUser(data.id).subscribe((response) => {
      this.userList = this.userList.filter((e) => e.id !== data.id);
      this.snackBar.open('Užívateľ bol odstránený', 'Hide', {
        duration: 3000,
      });
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
      this.snackBar.open("Užívateľa nebolo možné odstrániť", 'Hide', {
        duration: 3000,
      });
    });
  }

  // onUpdate(data: Patient): void {
  //   this.service.updateEntry(data).subscribe((response) => {
  //     this.snackBar.open('Selected appointment is updated!', 'Hide', {
  //       duration: 3000,
  //     });
  //   });
  // }

  // deleteAllRecords(): void {
  //   this.service.deleteAll().subscribe((resonse) => {
  //     this.waitingList = [];
  //     this.snackBar.open('All appointments were removed!', 'Hide', {
  //       duration: 3000,
  //     });
  //   }, (error: HttpErrorResponse) => {
  //     if (error.status === 202) {
  //       this.waitingList = [];
  //       this.snackBar.open('All appointments will be removed!', 'Hide', {
  //       duration: 3000,
  //     });
  //     } else
  //     {
  //       console.log(error.message);
  //     }
  //   });
  // }

}
