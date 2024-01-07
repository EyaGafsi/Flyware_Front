import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportBookingUpdateComponent } from './transport-booking-update.component';

describe('TransportBookingUpdateComponent', () => {
  let component: TransportBookingUpdateComponent;
  let fixture: ComponentFixture<TransportBookingUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportBookingUpdateComponent]
    });
    fixture = TestBed.createComponent(TransportBookingUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
