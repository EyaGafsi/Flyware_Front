import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {
  message:any;
  form: FormGroup;
  file: any;
  flight:any;
  showSuccessAlert = false;
  showFailedAlert=false;
  showWarningAlert=false;

  constructor(private keycloakService: KeycloakService,private formBuilder: FormBuilder, private flightService: FlightService) {
      this.form = this.formBuilder.group({
        flightId: [''],
        userId: [''],
        nbAdults: [0,Validators.required],
        nbChildren: [0,Validators.required],
        type: [null,Validators.required]
      });

  }
  ngOnInit(): void {
    const selectedFlight = this.flightService.getSelectedFlight();
    this.flightService.getFlightById(selectedFlight).subscribe(
      response => {
        this.flight=response;
        var flightDate = new Date(this.flight.date);
        this.flight.date= flightDate.toISOString().split('T')[0];
        if (this.flight.returnDate!==null){
         flightDate = new Date(this.flight.returnDate);
         this.flight.returnDate= flightDate.toISOString().split('T')[0]; }       console.log(this.flight);

      },
      error => {
        console.log(error);
      }
    );
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
  this.form.patchValue({ flightId: this.flightService.getSelectedFlight() });
  this.form.patchValue({ userId:this.keycloakService.getKeycloakInstance().tokenParsed!!.sub });

  if (this.form.valid) {
    this.flightService.bookFlight(this.form.value).subscribe(
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
 maxAdult(){
  if( this.form.get('type')?.value=="business")
  return this.flight.nbBuisPlaces-this.form.get('nbChildren')?.value
   else if( this.form.get('type')?.value=="economic")
  return this.flight.nbEcoPlaces-this.form.get('nbChildren')?.value
else return 0;
  }
  maxChildren(){
    if( this.form.get('type')?.value=="business")
    return this.flight.nbBuisPlaces-this.form.get('nbAdults')?.value
     else if( this.form.get('type')?.value=="economic")
    return this.flight.nbEcoPlaces-this.form.get('nbAdults')?.value
  else return 0;
    }

 }


