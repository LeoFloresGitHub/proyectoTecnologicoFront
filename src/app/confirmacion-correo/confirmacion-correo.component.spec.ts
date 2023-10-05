import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmacionCorreoComponent } from './confirmacion-correo.component';

describe('ConfirmacionCorreoComponent', () => {
  let component: ConfirmacionCorreoComponent;
  let fixture: ComponentFixture<ConfirmacionCorreoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmacionCorreoComponent]
    });
    fixture = TestBed.createComponent(ConfirmacionCorreoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
