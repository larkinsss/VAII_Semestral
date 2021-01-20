import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmbulanceEditorComponent } from './ambulance-editor.component';

describe('AmbulanceEditorComponent', () => {
  let component: AmbulanceEditorComponent;
  let fixture: ComponentFixture<AmbulanceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmbulanceEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmbulanceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
