import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransportBookingListComponent } from './user-transport-booking-list.component';

describe('UserTransportBookingListComponent', () => {
  let component: UserTransportBookingListComponent;
  let fixture: ComponentFixture<UserTransportBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserTransportBookingListComponent]
    });
    fixture = TestBed.createComponent(UserTransportBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
