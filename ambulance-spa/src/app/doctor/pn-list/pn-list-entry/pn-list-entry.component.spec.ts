import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnListEntryComponent } from './pn-list-entry.component';

describe('PnListEntryComponent', () => {
  let component: PnListEntryComponent;
  let fixture: ComponentFixture<PnListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
