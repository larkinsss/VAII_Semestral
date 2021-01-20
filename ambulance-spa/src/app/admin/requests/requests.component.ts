import { RequestService } from './../../services/request.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss']
})
export class RequestsComponent implements OnInit {

  requestService: RequestService;
  requestList: User[]

  constructor(requestServ:RequestService) { 
    this.requestService = requestServ;
    
  }

  ngOnInit(): void {
    this.requestService.getRequest().subscribe(response => {
      this.requestList = response;
    })
  }

  onAccept(user: User){
    this.requestService.approveRequest(user.username).subscribe(response => {
      let ans = response;
      this.ngOnInit();
    });
  }

  onDelete(user: User){
    this.requestService.declineRequest(user.username).subscribe(response => {
      let ans = response;
      this.ngOnInit();
    });
  }
  


}
