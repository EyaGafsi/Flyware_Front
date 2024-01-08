import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-transport-list',
  templateUrl: './transport-list.component.html',
  styleUrls: ['./transport-list.component.css']
})
export class TransportListComponent {
  transports: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  numberOfPages = 1;

  constructor(private router: Router,private transportService: TransportService) {
    this.afficher(this.currentPage, this.itemsPerPage);
  }
  ngOnInit(): void {
  }

  afficher(page:any, size:any) {
    this.transportService.getTransport(null,page, size).subscribe(
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

  navigateToUpdatePageTransport(transport: any) {
    this.transportService.setSelectedTransport(transport);
    this.transportService.setCurrentPage(this.currentPage);
    this.router.navigate(['/transportUpdate']);
  }
  deleteTransport(transport: any) {
    const confirmation = window.confirm('Are you sure you want to delete this transport?');
 if(confirmation){
    this.transportService.deleteTransport(transport).subscribe(
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

