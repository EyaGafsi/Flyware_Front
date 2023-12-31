import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-booking-list',
  templateUrl: './flight-booking-list.component.html',
  styleUrls: ['./flight-booking-list.component.css']
})
export class FlightBookingListComponent implements OnInit {
  flights: any[] = [];
  user:any;

  constructor(private flightService: FlightService) {
    this.afficher();
  }
  ngOnInit(): void {
  }

  afficher() {

    this.flightService.getBookings().subscribe(
      (response: any) => {
        console.log(response);
        this.flights = response;
        this.flights.forEach(flight => {
          this.flightService.getUserById(flight.userId).subscribe(
            (userResponse: any) => {
              flight.username = userResponse.username;
            },
            error => {
              console.log(error);
            }
          );
        });
      },
      error => {
        console.log(error);

      }
    );
  }

  accepter(id:any) {
    const confirmation = window.confirm('Are you sure you want to accept this booking?');

    if (confirmation) {
    this.flightService.acceptFlightBooking(id).subscribe(
      (response: any) => {
        console.log(response);
        this.afficher() ;
      },
      error => {
        console.log(error);

      }
    );}
  }
  refuser(id:any) {
    const confirmation = window.confirm('Are you sure you want to refuse this booking?');
    if (confirmation) {

    this.flightService.refuseFlightBooking(id).subscribe(
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
