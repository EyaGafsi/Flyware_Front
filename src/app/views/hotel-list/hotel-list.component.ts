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
  private apiUrl = 'http://localhost:8081/hotels';

  hotels: Hotel[] | null = null;

  constructor(private hotelService: HotelService, private router: Router) { }

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getHotels().subscribe(
      (data: Hotel[]) => {
        this.hotels = data;
      },
      error => {
        console.error('Error loading hotels:', error);
      }
    );
  }
  editHotel(id: number) {
    // Rediriger vers la page d'édition pour l'hôtel avec l'ID spécifié
    // Remplacez 'edit/:id' par le chemin réel de votre route d'édition
    this.router.navigate(['/edit', id]);
  }
  deleteHotel(id: number) {
    this.hotelService.deleteHotel(id).subscribe(
      () => {
        console.log('Hotel deleted successfully.');
        this.loadHotels();
      },
      error => {
        console.error('Error deleting hotel:', error);
      }
    );
  }
}
