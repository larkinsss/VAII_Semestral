import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsWorkerComponent } from './ins-worker.component';

describe('InsWorkerComponent', () => {
  let component: InsWorkerComponent;
  let fixture: ComponentFixture<InsWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
