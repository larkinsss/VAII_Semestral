import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PnFormComponent } from './pn-form.component';

describe('PnFormComponent', () => {
  let component: PnFormComponent;
  let fixture: ComponentFixture<PnFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PnFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
