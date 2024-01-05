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
  currentPage = 1;
  itemsPerPage = 10;
  numberOfPages = 1;

  constructor(private keycloakService: KeycloakService,private router: Router, private flightService: FlightService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  ngOnInit(): void {
  }

  afficher(page:any, size:any) {
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed!!.sub;

    this.flightService.getFlightBookingByUserId(userId,page,size).subscribe(
      (response: any) => {
        console.log(response);
        this.flights = response.docs;
        this.numberOfPages = response.pages ;
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
        this.afficher(this.currentPage, this.itemsPerPage) ;
      },
      error => {
        console.log(error);

      }
    );
  }}
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.afficher(this.currentPage, this.itemsPerPage);
    }
  }
  goToNextPage() {
    if (this.currentPage < this.numberOfPages) {
      this.currentPage++;
      this.afficher(this.currentPage, this.itemsPerPage);
    }
  }
  generatePageNumbers(totalPages: number): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.afficher(this.currentPage, this.itemsPerPage);
  }

}
