// hotel-list.component.ts
import { Component, OnInit } from '@angular/core';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {
  private apiUrl = 'http://localhost:8081/hotels'; // Remplacez cette URL par l'URL de votre backend Spring Boot

  hotels: Hotel[] | null = null;

  constructor(private hotelService: HotelService) { }

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
}
