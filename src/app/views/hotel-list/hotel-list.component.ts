// hotel-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  hotels: any[] = [];
  currentPage = 0;
  itemsPerPage = 10;
  numberOfPages = 0;


  constructor(private hotelService: HotelService, private router: Router) {   this.afficher(this.currentPage, this.itemsPerPage);
  }

  ngOnInit() {
  }

  afficher(page:any, size:any) {
    this.hotelService.afficherHotel(null,page, size).subscribe(
      (response: any) => {
        console.log(response);
        this.hotels = response.content;
        this.numberOfPages = response.totalPages ;
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
  navigateToUpdatePage(hotel: any) {
    this.hotelService.setSelectedHotel(hotel);
    this.hotelService.setCurrentPage(this.currentPage);
    this.router.navigate(['/edit']);
  }
  navigateToAddPage() {
    this.router.navigate(['/create']);
  }


  delete(hotel: any) {
    const confirmation = window.confirm('Are you sure you want to delete this hotel?');
 if(confirmation){
  this.hotelService.deleteHotel(hotel).subscribe(
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

}

