import { PnFormService } from './../../services/pn-form/pn-form.service';
import { Component, OnInit } from '@angular/core';
import { PnForm } from 'src/app/model/pnForm';

@Component({
  selector: 'app-pn-list',
  templateUrl: './pn-list.component.html',
  styleUrls: ['./pn-list.component.scss']
})
export class PnListComponent implements OnInit {

  public pnFormList: PnForm[]

  constructor(private pnFormService: PnFormService) {
    this.pnFormService.getAllPnForms().subscribe((result) => {
      this.pnFormList = result;
      this.pnFormList.sort((a, b) => {
        const dateA = a.beginningDate;
        const dateB = b.beginningDate;
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
