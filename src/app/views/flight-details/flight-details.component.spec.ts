import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightDetailsComponent } from './flight-details.component';

describe('FlightDetailsComponent', () => {
  let component: FlightDetailsComponent;
  let fixture: ComponentFixture<FlightDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FlightDetailsComponent]
    });
    fixture = TestBed.createComponent(FlightDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
