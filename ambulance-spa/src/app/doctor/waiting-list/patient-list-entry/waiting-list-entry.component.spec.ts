import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingListEntryComponent } from './waiting-list-entry.component';

describe('WaitingListEntryComponent', () => {
  let component: WaitingListEntryComponent;
  let fixture: ComponentFixture<WaitingListEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingListEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingListEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
