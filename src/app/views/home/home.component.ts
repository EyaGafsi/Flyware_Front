import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { HotelService } from '../services/hotel.service';

import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flights: any[] = [];
  hotels: any[] = [];
  currentPage = 0;
  itemsPerPage = 12;
  numberOfPages = 0;
  tripType=false;
  searchForm: FormGroup;
  hotelSearchForm: FormGroup;
  displayHome=true;
  destinations:any;
  departures:any;
  countries: any;
  locations: any;


  constructor(private formBuilder: FormBuilder,private router: Router,private flightService: FlightService,private hotelService: HotelService) {
    this.searchForm = this.formBuilder.group({
      from: [''],
      to: [''],
      departure: [''],
      return: [''],
      price: [''],

    });

    this.hotelSearchForm = this.formBuilder.group({
      name:[''],
      address:[''],
      country: [''],
      location: [''],
      checkIn: [''],
      checkOut: [''],
      duration: [''],
      members: [''],
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
        this.numberOfPages = response.pages - 1;
        this.displayHome=false;
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
        this.hotels = response.docs;
        this.numberOfPages = response.pages - 1;
        this.displayHome=false;
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
  goToPreviousPage() {
    if (this.currentPage > 0) {
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
    for (let i = 0; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
  changePage(page: number): void {
    this.currentPage = page;
    this.afficher(this.currentPage, this.itemsPerPage);
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

  advancedSearchHotels() {
    // Récupérez les valeurs du formulaire
    const formData = this.hotelSearchForm.value;
    console.log('Valeurs du formulaire :', formData);
  console.log('Valeur de duration avant l\'appel :', formData.duration);
  console.log('Valeur de members avant l\'appel :', formData.members);

    // Appelez votre service pour effectuer la recherche avancée
    this.hotelService.advancedSearchHotels(
      formData.name,
      formData.address,
      formData.country,
      formData.location,
      formData.checkIn,
      formData.checkOut,
      formData.duration,
      formData.members
    ).subscribe(
      (response) => {
        // Traitez la réponse du serveur ici
        console.log('Réponse du serveur :', response);
      },
      (error) => {
        // Traitez les erreurs ici
        console.error('Erreur lors de la recherche avancée :', error);
      }
    );
  }


  navigateToUpdatePagehotel(hotel: any) {
    this.hotelService.setSelectedHotel(hotel);
    this.hotelService.setCurrentPage(this.currentPage);
    this.router.navigate(['/edit/:id']);
  }
}
