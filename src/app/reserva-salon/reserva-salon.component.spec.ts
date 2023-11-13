import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaSalonComponent } from './reserva-salon.component';

describe('ReservaSalonComponent', () => {
  let component: ReservaSalonComponent;
  let fixture: ComponentFixture<ReservaSalonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaSalonComponent]
    });
    fixture = TestBed.createComponent(ReservaSalonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
