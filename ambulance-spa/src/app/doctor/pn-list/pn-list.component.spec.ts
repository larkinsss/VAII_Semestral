import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnListComponent } from './pn-list.component';

describe('PnListComponent', () => {
  let component: PnListComponent;
  let fixture: ComponentFixture<PnListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
