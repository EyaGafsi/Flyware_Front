import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';
import { Hotel } from '../models/hotel';// Assurez-vous de l'importer correctement
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {


  //hotel!: Hotel;
  hotel: Hotel = new Hotel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) { }

  ngOnInit() {
    const hotelId = this.route.snapshot.params['id'];
    this.hotelService.getHotelById(hotelId).subscribe(data => {
      this.hotel = data;
    });
  }

  updateHotel() {
    this.hotelService.updateHotel(this.hotel).subscribe(() => {
      this.router.navigate(['/hotels']);
    });
  }
}
