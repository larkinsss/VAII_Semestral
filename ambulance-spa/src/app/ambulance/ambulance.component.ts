import { WaitingListService } from './../services/waiting-list.service';
import { Component, OnInit } from '@angular/core';
import { WaitingListEntry } from 'src/app/model/waiting-list-entry';

@Component({
  selector: 'app-ambulance',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.scss']
})
export class AmbulanceComponent implements OnInit {

  constructor(private service: WaitingListService) { }

  ngOnInit(): void {
  }

}
