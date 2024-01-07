import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserHotelBookingListComponent } from './user-hotel-booking-list.component';

describe('UserHotelBookingListComponent', () => {
  let component: UserHotelBookingListComponent;
  let fixture: ComponentFixture<UserHotelBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserHotelBookingListComponent]
    });
    fixture = TestBed.createComponent(UserHotelBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
