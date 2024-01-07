import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { HotelService } from '../services/hotel.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-user-hotel-booking-list',
  templateUrl: './user-hotel-booking-list.component.html',
  styleUrls: ['./user-hotel-booking-list.component.css']
})
export class UserHotelBookingListComponent  implements OnInit {
  hotels: any[] = [];
  currentPage = 0;
  itemsPerPage = 10;
  numberOfPages = 0;

  constructor(private keycloakService: KeycloakService,private router: Router, private hotelService: HotelService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  ngOnInit(): void {
  }

  afficher(page:any, size:any) {
    const userId = this.keycloakService.getKeycloakInstance().tokenParsed!!.sub;

    this.hotelService.getHotelBookingByUserId(userId,page,size).subscribe(
      (response: any) => {
        console.log(response);
        this.hotels = response.content;
        this.numberOfPages = response.totalPages ;
        this.hotels.forEach(hotel => {
          this.hotelService.getHotelById(hotel.hotelId).subscribe(
            (hotelResponse: any) => {
              hotel.name = hotelResponse.name;
            },
            error => {
              console.log(error);
            }
          );})

      },
      error => {
        console.log(error);

      }
    );
  }
  navigateToUpdatePage(hotel: any) {
    this.hotelService.setSelectedHotel(hotel);
    this.router.navigate(['/updateHotelBookings']);
  }
  cancel(id:any) {
    const confirmation = window.confirm('Are you sure you want to cancel your booking?');
    if (confirmation) {

    this.hotelService.cancelHotelBooking(id).subscribe(
      (response: any) => {
        console.log(response);
        this.afficher(this.currentPage, this.itemsPerPage) ;
      },
      error => {
        console.log(error);

      }
    );
  }}

  goToNextPage() {
    if (this.currentPage <this.numberOfPages-1) {
    this.currentPage++;
    this.afficher(this.currentPage,this.itemsPerPage);}
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.afficher(this.currentPage,this.itemsPerPage);
    }
  }

  generatePageNumbers(totalPages: number): number[] {
    const pageNumbers: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i );
    }
    return pageNumbers;
  }

changePage(page: number): void {
  if (page >= 1 && page <= this.numberOfPages) {
    this.currentPage = page - 1;
    this.afficher(this.currentPage, this.itemsPerPage);
  }
}
}
