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
  currentPage = 1;
  itemsPerPage = 10;
  numberOfPages = 1;
  flight: any;
  flightUpdate:any;
  nbEcoPlaces:any
  constructor(private flightService: FlightService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  ngOnInit(): void {
  }

  afficher(page:any, size:any) {

    this.flightService.getBookings(page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.flights = response.docs;
        this.numberOfPages = response.pages ;
        this.flights.forEach(flight => {
          this.flightService.getUserById(flight.userId).subscribe(
            (userResponse: any) => {
              flight.username = userResponse.username;
            },
            error => {
              console.log(error);
            }
          );

          this.flightService.getFlightById(flight.flightId).subscribe(
            (response: any) => {
              this.flightUpdate=response;
              const nbAdults=Number(flight.nbAdults)
              const nbChildren=Number(flight.nbChildren)

              if ((this.flightUpdate.nbBuisPlaces<nbAdults+nbChildren && flight.type=="business")||(this.flightUpdate.nbEcoPlaces<nbAdults+nbChildren && flight.type=="economic")){
                this.flightService.setFlightBookingStatus(flight._id,"soldout").subscribe(
                  (response: any) => {
                    console.log(response);
                    this.afficher(this.currentPage, this.itemsPerPage) ;
                  },
                  error => {
                    console.log(error);

                  }
                );

              }

              if (new Date(this.flightUpdate.date)<=new Date()){

                this.flightService.setFlightBookingStatus(flight._id,"expired").subscribe(
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
  accepter(flight:any) {
    const confirmation = window.confirm('Are you sure you want to accept this booking?');

    if (confirmation) {
      this.flightService.getFlightById(flight.flightId).subscribe(
        (response: any) => {
          this.flight=response;
          if( flight.type=="business")
          { if (this.flight.nbBuisPlaces=this.flight.nbBuisPlaces-flight.nbAdults-flight.nbChildren)
          this.flight.nbBuisPlaces=this.flight.nbBuisPlaces-flight.nbAdults-flight.nbChildren}
          else
  {        this.flight.nbEcoPlaces=this.flight.nbEcoPlaces-flight.nbAdults-flight.nbChildren;

  }

  this.flightService.update(this.flight._id,this.flight).subscribe(
    response => {
      console.log(response);
    },
    error => {
      console.log(error);

    }
  );
  this.flightService.setFlightBookingStatus(flight._id,"accepted").subscribe(
    (response: any) => {
      console.log(response);
      this.afficher(this.currentPage, this.itemsPerPage) ;

    },
    error => {
      console.log(error);

    }
  );

  this.flightService.getUserById(flight.userId).subscribe(
    (userResponse: any) => {
      this.user = userResponse;
      this.flightService.sendFlightEmail(this.flight,flight,this.user).subscribe(
        (response: any) => {
          console.log(response);
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

    this.flightService.setFlightBookingStatus(id,"refused").subscribe(
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
