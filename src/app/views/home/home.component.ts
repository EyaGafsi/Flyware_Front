import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlightService } from '../services/flight.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  flights: any[] = [];
  currentPage = 0;
  itemsPerPage = 12;
  numberOfPages = 0;
  tripType=false;
  searchForm: FormGroup;
  displayHome=true;
  destinations:any;
  departures:any;

  constructor(private formBuilder: FormBuilder,private router: Router,private flightService: FlightService) {
    this.searchForm = this.formBuilder.group({
      from: [''],
      to: [''],
      departure: [''],
      return: [''],
      price: [''],

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

  // navigateToBookPage(flight: any) {
  //   this.flightService.setSelectedFlight(flight);
  //   this.flightService.setCurrentPage(this.currentPage);
  //   this.router.navigate(['/flightBooking']);
  // }



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


}
