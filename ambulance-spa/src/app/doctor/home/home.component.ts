import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  entriesOfProcedures = [{procedureName:"prehlidka", procedureRestriction:"do 18 rokov", procedurePrice:19.99}]

  constructor() {}

  ngOnInit(): void {
  }
}
