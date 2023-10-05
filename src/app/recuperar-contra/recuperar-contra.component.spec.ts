import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarContraComponent } from './recuperar-contra.component';

describe('RecuperarContraComponent', () => {
  let component: RecuperarContraComponent;
  let fixture: ComponentFixture<RecuperarContraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecuperarContraComponent]
    });
    fixture = TestBed.createComponent(RecuperarContraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
