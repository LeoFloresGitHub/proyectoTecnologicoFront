import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPiscinaComponent } from './reserva-piscina.component';

describe('ReservaPiscinaComponent', () => {
  let component: ReservaPiscinaComponent;
  let fixture: ComponentFixture<ReservaPiscinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaPiscinaComponent]
    });
    fixture = TestBed.createComponent(ReservaPiscinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
