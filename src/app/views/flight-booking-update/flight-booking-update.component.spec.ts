import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightBookingUpdateComponent } from './flight-booking-update.component';

describe('FlightBookingUpdateComponent', () => {
  let component: FlightBookingUpdateComponent;
  let fixture: ComponentFixture<FlightBookingUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightBookingUpdateComponent]
    });
    fixture = TestBed.createComponent(FlightBookingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
