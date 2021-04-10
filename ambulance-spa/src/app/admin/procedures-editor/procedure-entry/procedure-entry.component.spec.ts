import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureEntryComponent } from './procedure-entry.component';

describe('ProcedureEntryComponent', () => {
  let component: ProcedureEntryComponent;
  let fixture: ComponentFixture<ProcedureEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcedureEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
