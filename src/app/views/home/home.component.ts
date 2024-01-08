import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { HotelService } from '../services/hotel.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { TransportService } from '../services/transport.service';

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

  transports: any[] = [];
  currentPageTransport = 1;
  itemsPerPageTransport = 2;
  numberOfPagesTransport = 1;

  tripType=false;
  searchForm: FormGroup;
  hotelSearchForm: FormGroup;
  transportSearchForm: FormGroup;

  displayHome=true;
  displayHotel=false;
  displayFlight=false;
  displayTransport=false;

  destinations:any;
  departures:any;
  countries: any;
  locations: any;

  locationsTransport:any;
  markTransport:any;
  role: string[] = []

  constructor(private keycloakService: KeycloakService,private formBuilder: FormBuilder,private router: Router,private flightService: FlightService,private hotelService: HotelService,private transportService :TransportService) {


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

    this.transportSearchForm = this.formBuilder.group({
      address: [''],
      mark: [''],
      minPriceTransport: [0],
      maxPriceTransport: [0],
      nbPerson: [0],
      nbLuggage: [0]
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
      (response: any) => {
        this.countries = response;
      },
      error => {
        console.log(error);
      }
    );

    this.hotelService.getLocations().subscribe(
      (response: any)  => {
        this.locations = response;
      },
      error => {
        console.log(error);
      }
    );
    this.transportService.getLocationTransport().subscribe(
      (response: any) => {
        this.locationsTransport = response;
      },
      error => {
        console.log(error);
      }
    );
    this.transportService.getMarkTransport().subscribe(
      (response: any) => {
        this.markTransport = response;
      },
      error => {
        console.log(error);
      }
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
        this.displayTransport=false;

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
        this.displayTransport=false;
        this.displayHotel=true;      },
      error => {
        console.log(error);

      }
    );
  }
  afficherTransport(page:any, size:any) {
    this.transportService.getTransport(null,page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.transports = response.docs;
        this.numberOfPagesTransport = response.pages ;
        this.displayHome=false;
        this.displayFlight=false;
        this.displayTransport=true;
        this.displayHotel=false;       },
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



goToNextPageTransport() {
  if (this.currentPageTransport <this.numberOfPagesTransport-1) {
  this.currentPageTransport++;
  this.afficherTransport(this.currentPageTransport,this.itemsPerPageTransport);}
}

goToPreviousPageTransport() {
  if (this.currentPageTransport > 0) {
    this.currentPageTransport--;
    this.afficherTransport(this.currentPageTransport,this.itemsPerPageTransport);
  }
}

generatePageNumbersTransport(totalPages: number): number[] {
  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i );
  }
  return pageNumbers;
}

changePageTransport(page: number): void {
if (page >= 1 && page <= this.numberOfPagesTransport) {
  this.currentPageTransport = page - 1;
  this.afficherTransport(this.currentPageTransport, this.itemsPerPageTransport);
}
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
  navigateToTransportBookingPage(transport: any) {
    this.transportService.setSelectedTransport(transport);
    this.transportService.setCurrentPage(this.currentPageTransport);
    this.router.navigate(['/transportBooking']);
  }
  getRole(){this.role = this.keycloakService.getUserRoles();console.log(this.role);
  }
}
