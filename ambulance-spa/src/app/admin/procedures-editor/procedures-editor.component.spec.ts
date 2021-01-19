import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresEditorComponent } from './procedures-editor.component';

describe('ProceduresEditorComponent', () => {
  let component: ProceduresEditorComponent;
  let fixture: ComponentFixture<ProceduresEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProceduresEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProceduresEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
