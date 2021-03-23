import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { RequestService } from 'src/app/services/request/request.service';

interface Roles {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requestService: RequestService;
  requestList: User[];
  roles: Roles[] = [
    {value: 0, viewValue: 'Admin'},
    {value: 1, viewValue: 'Doctor'},
    {value: 3, viewValue: 'PSP'}
  ];
  selected: string;

  constructor(requestServ: RequestService) {
    this.requestService = requestServ;

  }

  ngOnInit(): void {
    this.requestService.getRequest().subscribe(response => {
      this.requestList = response;
    });
  }

  onAccept(user: User, role: number): void{
    this.requestService.approveRequest(user.username, role).subscribe(response => {
      const ans = response;
      this.ngOnInit();
    });
  }

  onDelete(user: User): void{
    this.requestService.declineRequest(user.username).subscribe(response => {
      const ans = response;
      this.ngOnInit();
    });
  }



}
