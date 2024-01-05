import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-booking-update',
  templateUrl: './flight-booking-update.component.html',
  styleUrls: ['./flight-booking-update.component.css']
})
export class FlightBookingUpdateComponent implements OnInit {
  message:any;
  form: FormGroup;
  file: any;
  flight:any;
  showSuccessAlert = false;
  showFailedAlert=false;
  showWarningAlert=false;

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) {
      this.form = this.formBuilder.group({
        _id: [''],
        flightId: [''],
        userId: [''],
        nbAdults: [null,Validators.required],
        nbChildren: [null,Validators.required],
        type: [null,Validators.required]
      });

  }
  ngOnInit(): void {
    const selectedFlight = this.flightService.getSelectedFlight();

    this.flightService.getFlightById(selectedFlight?.flightId).subscribe(
      response => {
        this.flight=response;
        var flightDate = new Date(this.flight.date);
        this.flight.date= flightDate.toISOString().split('T')[0];
        if (this.flight.returnDate!==null){
         flightDate = new Date(this.flight.returnDate);
         this.flight.returnDate= flightDate.toISOString().split('T')[0]; }

      },
      error => {
        console.log(error);
      }
    );
    this.form = this.formBuilder.group({
      _id: [selectedFlight?._id, Validators.required],
      flightId: [selectedFlight?.flightId, Validators.required],
      userId: [selectedFlight?.userId, Validators.required],
      nbAdults: [selectedFlight?.nbAdults, Validators.required],
      nbChildren: [selectedFlight?.nbChildren, Validators.required],
      type: [selectedFlight?.type, Validators.required],
    });
  }
formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h > 0) {
    return `${h}h ${m}min`;
  } else {
    return `${m}min`;
  }
}

onSubmit() {

  if (this.form.valid) {
    this.flightService.editFlightBooking(this.form.value).subscribe(
      response => {
        console.log(response);
        this.message = 'Booking request sent successfully';
        this.showSuccessMessage();
      },
      error => {
        this.message = 'You already booked in this flight';
         this.showWarningMessage();

        console.log(error);

      }
    );
  } else {
    this.message = 'Veuillez corriger les erreurs dans le formulaire.';
    this.showFailedMessage();

  }
}

showSuccessMessage() {
  this.showSuccessAlert = true;

  setTimeout(() => {
    this.showSuccessAlert = false;
  }, 5000);
}
showFailedMessage() {
  this.showFailedAlert = true;
  setTimeout(() => {
    this.showFailedAlert = false;
  }, 5000);
}
showWarningMessage() {
  this.showWarningAlert = true;
  setTimeout(() => {
    this.showWarningAlert = false;
  }, 5000);
}
closeAlert() {
  this.showSuccessAlert = false;
  this.showFailedAlert = false;
  this.showWarningAlert = false;

}
}
