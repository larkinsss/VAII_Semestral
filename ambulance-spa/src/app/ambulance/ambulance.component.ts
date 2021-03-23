
import { Component, OnInit } from '@angular/core';
import { WaitingListEntry } from 'src/app/model/patient';
import { WaitingListService } from '../services/waiting-list/waiting-list.service';

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
