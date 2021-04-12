import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerModalComponent } from './employer-modal.component';

describe('EmployerModalComponent', () => {
  let component: EmployerModalComponent;
  let fixture: ComponentFixture<EmployerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
