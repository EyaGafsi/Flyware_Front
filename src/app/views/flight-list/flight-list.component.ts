import { Component, OnInit } from '@angular/core';
import { FlightService } from '../services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {
  flights: any[] = [];
  currentPage = 0;
  itemsPerPage = 10;
  numberOfPages = 0;
  constructor(private router: Router,private flightService: FlightService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  ngOnInit(): void {
  }

  afficher(page:any, size:any) {
    this.flightService.afficher(page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.flights = response.docs;
        this.numberOfPages = response.pages - 1;
      },
      error => {
        console.log(error);

      }
    );
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


}
