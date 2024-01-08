import { Component, OnInit } from '@angular/core';
import { TransportService } from '../services/transport.service';
import { KeycloakService } from 'keycloak-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-transport-booking-list',
  templateUrl: './user-transport-booking-list.component.html',
  styleUrls: ['./user-transport-booking-list.component.css']
})
export class UserTransportBookingListComponent {

  transports: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  numberOfPages = 1;

  constructor(private keycloakService: KeycloakService,private router: Router, private transportService: TransportService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  ngOnInit(): void {
  }

  afficher(page:any, size:any) {
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed!!.sub;

    this.transportService.getTransportBookingByUserId(userId,page,size).subscribe(
      (response: any) => {
        console.log(response);
        this.transports = response.docs;
        this.numberOfPages = response.pages ;
      },
      error => {
        console.log(error);

      }
    );
  }
  navigateToUpdatePage(transport: any) {
    this.transportService.setSelectedTransport(transport);
    this.router.navigate(['/updateTransportBookings']);
  }
  cancel(id:any) {
    const confirmation = window.confirm('Are you sure you want to cancel your booking?');
    if (confirmation) {

    this.transportService.cancelTransportBooking(id).subscribe(
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

