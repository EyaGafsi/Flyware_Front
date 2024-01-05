import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFlightBookingListComponent } from './user-flight-booking-list.component';

describe('UserFlightBookingListComponent', () => {
  let component: UserFlightBookingListComponent;
  let fixture: ComponentFixture<UserFlightBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFlightBookingListComponent]
    });
    fixture = TestBed.createComponent(UserFlightBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
