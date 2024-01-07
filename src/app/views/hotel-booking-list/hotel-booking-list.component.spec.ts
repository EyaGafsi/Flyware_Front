import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelBookingListComponent } from './hotel-booking-list.component';

describe('HotelBookingListComponent', () => {
  let component: HotelBookingListComponent;
  let fixture: ComponentFixture<HotelBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelBookingListComponent]
    });
    fixture = TestBed.createComponent(HotelBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
