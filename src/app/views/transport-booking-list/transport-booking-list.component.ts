import { Component, OnInit } from '@angular/core';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-transport-booking-list',
  templateUrl: './transport-booking-list.component.html',
  styleUrls: ['./transport-booking-list.component.css']
})
export class TransportBookingListComponent implements OnInit {
  transports: any[] = [];
  user: any;
  currentPage = 1;
  itemsPerPage = 10;
  numberOfPages = 1;
  transportUpdate: any;
transport: any;
  constructor(private transportService: TransportService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }

  ngOnInit(): void {}

  afficher(page: any, size: any) {
    this.transportService.getBookingsTransport(page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.transports = response.docs;
        this.numberOfPages = response.pages;
        this.transports.forEach((transport) => {
          this.transportService.getUserById(transport.userId).subscribe(
            (userResponse: any) => {
              transport.username = userResponse.username;
            },
            (error) => {
              console.log(error);
            }
          );

          this.transportService.getTransportById(transport.transportId).subscribe(
            (response: any) => {
              this.transportUpdate = response;

              if (new Date(this.transportUpdate.date) <= new Date()) {
                this.transportService.setTransportBookingStatus(transport._id, 'expired').subscribe(
                  (statusResponse: any) => {
                    console.log(statusResponse);
                    this.afficher(this.currentPage, this.itemsPerPage);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
              }
            },
            (error) => {
              console.log(error);
            }
          );
        });
      },
      (error) => {
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

  accepterTransport(transport: any) {
    const confirmation = window.confirm('Are you sure you want to accept this booking?');

    if (confirmation) {
      this.transportService.getTransportById(transport.transportId).subscribe(
        (response: any) => {
          this.transport=response;

      this.transportService.setTransportBookingStatus(transport._id, 'accepted').subscribe(
        (response: any) => {
          console.log(response);
          this.afficher(this.currentPage, this.itemsPerPage);
        },
        (error) => {
          console.log(error);
        }
      );

      this.transportService.getUserById(transport.userId).subscribe(
        (userResponse: any) => {
          this.user = userResponse;
          this.transportService.sendTransportEmail(this.transport,transport,this.user).subscribe(
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
    }
    );

  }
  }

  refuserTransport(id: any) {
    const confirmation = window.confirm('Are you sure you want to refuse this booking?');
    if (confirmation) {
      this.transportService.setTransportBookingStatus(id, 'refused').subscribe(
        (response: any) => {
          console.log(response);
          this.afficher(this.currentPage, this.itemsPerPage);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
