import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-hotel-booking-list',
  templateUrl: './hotel-booking-list.component.html',
  styleUrls: ['./hotel-booking-list.component.css']
})
export class HotelBookingListComponent implements OnInit {
  hotels: any[] = [];
  user:any;
  currentPage = 0;
  itemsPerPage = 10;
  numberOfPages = 0;
  hotel: any;
  hotelUpdate:any;
  nbEcoPlaces:any
  constructor(private hotelService: HotelService,private flightService: FlightService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  ngOnInit(): void {
  }

  afficher(page:any, size:any) {

    this.hotelService.getBookings(page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.hotels = response.content;
        this.numberOfPages = response.totalPages ;
        this.hotels.forEach(hotel => {
          this.flightService.getUserById(hotel.userId).subscribe(
            (userResponse: any) => {
              hotel.username = userResponse.username;
            },
            error => {
              console.log(error);
            }
          );

          this.hotelService.getHotelById(hotel.hotelId).subscribe(
            (response: any) => {
              this.hotelUpdate=response;


              if (new Date(this.hotelUpdate.checkIn)>=new Date()){

                this.hotelService.setHotelBookingStatus(hotel._id,"expired").subscribe(
                  (response: any) => {
                    console.log(response);
                    this.afficher(this.currentPage, this.itemsPerPage) ;
                  },
                  error => {
                    console.log(error);

                  }
                );

              }
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
  accepter(hotel:any) {
    const confirmation = window.confirm('Are you sure you want to accept this booking?');

    if (confirmation) {
      this.hotelService.getHotelById(hotel.hotelId).subscribe(
        (response: any) => {
          this.hotel=response;


  this.hotelService.setHotelBookingStatus(hotel._id,"accepted").subscribe(
    (response: any) => {
      console.log(response);
      this.afficher(this.currentPage, this.itemsPerPage) ;

    },
    error => {
      console.log(error);

    }
  );

  this.flightService.getUserById(hotel.userId).subscribe(
    (userResponse: any) => {
      this.user = userResponse;
      this.hotelService.sendHotelEmail(this.hotel,hotel,this.user).subscribe(
        (response: any) => {
          console.log(response);

        },
        error => {
          console.log(error);
          console.log(this.hotel,hotel,this.user);

        }
      );
    },
    error => {
      console.log(error);
    }
  );


    },
    error => {
      console.log(error);

    }
  );

  }
  }
  refuser(id:any) {
    const confirmation = window.confirm('Are you sure you want to refuse this booking?');
    if (confirmation) {

    this.hotelService.setHotelBookingStatus(id,"refused").subscribe(
      (response: any) => {
        console.log(response);
        this.afficher(this.currentPage, this.itemsPerPage) ;
      },
      error => {
        console.log(error);

      }
    );
  }}
}
