import { Component, OnInit } from '@angular/core';

// tslint:disable-next-line: class-name
interface entryProcedure{
  name: string;
  restriction: string;
  cost: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public listOfProcedures: entryProcedure[] = [
    {
      name: 'Preventívna prehliadka',
      restriction: 'minimálny vek: 3 mesiace',
      cost: 19.99
    },
    {
      name: 'EKG',
      restriction: 'minimálny vek: 1 rok',
      cost: 5.0
    },
    {
      name: 'Preventívna stomatologická prehliadka',
      restriction: 'maximálny vek: 18 rokov',
      cost: 18.80
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
