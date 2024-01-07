import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportBookingListComponent } from './transport-booking-list.component';

describe('TransportBookingListComponent', () => {
  let component: TransportBookingListComponent;
  let fixture: ComponentFixture<TransportBookingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportBookingListComponent]
    });
    fixture = TestBed.createComponent(TransportBookingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
