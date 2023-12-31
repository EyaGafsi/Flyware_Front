import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-flight-booking-list',
  templateUrl: './user-flight-booking-list.component.html',
  styleUrls: ['./user-flight-booking-list.component.css']
})
export class UserFlightBookingListComponent implements OnInit {
  flights: any[] = [];


  constructor(private keycloakService: KeycloakService,private router: Router, private flightService: FlightService) {
    this.afficher();
  }
  ngOnInit(): void {
  }

  afficher() {
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed!!.sub;

    this.flightService.getFlightBookingByUserId(userId).subscribe(
      (response: any) => {
        console.log(response);
        this.flights = response;
      },
      error => {
        console.log(error);

      }
    );
  }
  navigateToUpdatePage(flight: any) {
    this.flightService.setSelectedFlight(flight);
    this.router.navigate(['/updateFlightBookings']);
  }
  cancel(id:any) {
    const confirmation = window.confirm('Are you sure you want to cancel your booking?');
    if (confirmation) {

    this.flightService.cancelFlightBooking(id).subscribe(
      (response: any) => {
        console.log(response);
        this.afficher() ;
      },
      error => {
        console.log(error);

      }
    );
  }}
}
