import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { HotelService } from '../services/hotel.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flights: any[] = [];
  currentPage = 1;
  itemsPerPage = 9;
  numberOfPages = 1;

  hotels: any[] = [];
  currentPageHotel = 0;
  itemsPerPageHotel = 9;
  numberOfPagesHotel = 0;

  tripType=false;
  searchForm: FormGroup;
  hotelSearchForm: FormGroup;
  displayHome=true;
  displayHotel=false;
  displayFlight=false;

  destinations:any;
  departures:any;
  countries: any;
  locations: any;


  constructor(private formBuilder: FormBuilder,private router: Router,private flightService: FlightService,private hotelService: HotelService,private keycloakService: KeycloakService) {


    this.searchForm = this.formBuilder.group({
      from: [''],
      to: [''],
      departure: [''],
      return: [''],
      minPrice: [0],
      maxPrice: [0],
      nbAdult: [0],
      nbChildren: [0],
      type: ['']

    });

    this.hotelSearchForm = this.formBuilder.group({
      country: [''],
      location: [''],
      minPrice: [0],
      maxPrice: [0],
      starNumber:[0],
    });
  }
  ngOnInit(): void {
    this.displayHome=true;

    this.flightService.getDestinations().subscribe(
      (response: any) => {
        this.destinations = response;
      },
      error => {
        console.log(error);
      }
    );
    this.flightService.getDepartures().subscribe(
      (response: any) => {
        this.departures = response;
      },
      error => {
        console.log(error);
      }
    );


    this.hotelService.getCountries().subscribe(
      countries => {
        console.log('Countries in component:', countries);
        this.countries = countries;
      },
      error => console.error('Error fetching countries in component:', error)
    );

    this.hotelService.getLocations().subscribe(
      locations => {
        console.log('Locations in component:', locations);
        this.locations = locations;
      },
      error => console.error('Error fetching locations in component:', error)
    );
  }

  afficher(page:any, size:any) {
    this.flightService.afficher(this.searchForm,page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.flights = response.docs;
        this.numberOfPages = response.pages ;
        this.displayHome=false;
        this.displayHotel=false;
        this.displayFlight=true;
      },
      error => {
        console.log(error);

      }
    );
  }
  afficherhotel(page:any, size:any) {
    this.hotelService.afficherHotel(this.hotelSearchForm,page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.hotels = response.content;
        this.numberOfPagesHotel = response.totalPages ;
        this.displayHome=false;
        this.displayFlight=false;
        this.displayHotel=true;      },
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


  goToNextPageHotel() {
    if (this.currentPageHotel <this.numberOfPagesHotel-1) {
    this.currentPageHotel++;
    this.afficherhotel(this.currentPageHotel,this.itemsPerPageHotel);}
  }

  goToPreviousPageHotel() {
    if (this.currentPageHotel > 0) {
      this.currentPageHotel--;
      this.afficherhotel(this.currentPageHotel,this.itemsPerPageHotel);
    }
  }

  generatePageNumbersHotel(totalPages: number): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i );
    }
    return pageNumbers;
  }

changePageHotel(page: number): void {
  if (page >= 1 && page <= this.numberOfPagesHotel) {
    this.currentPageHotel = page - 1;
    this.afficherhotel(this.currentPageHotel, this.itemsPerPageHotel);
  }
}
  navigateToUpdatePage(flight: any) {
    this.flightService.setSelectedFlight(flight);
    this.flightService.setCurrentPage(this.currentPage);
    this.router.navigate(['/flightUpdate']);
  }
  delete(flight: any) {
    this.flightService.delete(flight).subscribe(
      response => {
        console.log(response);
        this.afficher(this.currentPage, this.itemsPerPage);
         },
      error => {
        console.log(error);

      }
    );
  }
  navigateToBookingPage(flight: any) {
    this.flightService.setSelectedFlight(flight);
    this.flightService.setCurrentPage(this.currentPage);
    this.router.navigate(['/flightDetails']);
  }
  navigateToHotelBookingPage(hotel: any) {
    this.hotelService.setSelectedHotel(hotel);
    this.hotelService.setCurrentPage(this.currentPageHotel);
    this.router.navigate(['/hotelBooking']);
  }

}
