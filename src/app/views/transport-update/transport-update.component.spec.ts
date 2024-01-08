import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportUpdateComponent } from './transport-update.component';

describe('TransportUpdateComponent', () => {
  let component: TransportUpdateComponent;
  let fixture: ComponentFixture<TransportUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransportUpdateComponent]
    });
    fixture = TestBed.createComponent(TransportUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
