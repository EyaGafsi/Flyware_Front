import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelEditComponent } from './hotel-edit.component';

describe('HotelEditComponent', () => {
  let component: HotelEditComponent;
  let fixture: ComponentFixture<HotelEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelEditComponent]
    });
    fixture = TestBed.createComponent(HotelEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
