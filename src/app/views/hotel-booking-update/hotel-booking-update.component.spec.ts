import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingUpdateComponent } from './hotel-booking-update.component';

describe('HotelBookingUpdateComponent', () => {
  let component: HotelBookingUpdateComponent;
  let fixture: ComponentFixture<HotelBookingUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelBookingUpdateComponent]
    });
    fixture = TestBed.createComponent(HotelBookingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
