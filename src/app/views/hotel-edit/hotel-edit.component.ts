// hotel-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-edit',
  templateUrl: './hotel-edit.component.html',
  styleUrls: ['./hotel-edit.component.css']
})
export class HotelEditComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      rating: ['', Validators.required],
      imageUrl: [''],
      country: ['', Validators.required],       // Add country field
      location: ['', Validators.required],      // Add location field
      checkIn: ['', Validators.required],        // Add checkIn field
      checkOut: ['', Validators.required],       // Add checkOut field
      duration: ['', Validators.required],       // Add duration field
      members: ['', Validators.required]         // Add members field
    });
  }

  ngOnInit() {
    // Load existing hotel data based on the ID from the URL
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      this.hotelService.getHotelById(+hotelId).subscribe(
        (hotel) => {
          this.form.patchValue(hotel);
        },
        (error) => {
          console.error('Error loading hotel for edit:', error);
        }
      );
    }
  }

  onSubmit() {
    const hotelId = this.route.snapshot.paramMap.get('id');
    if (hotelId) {
      const numericHotelId = +hotelId; // Convert hotelId to number
      this.hotelService.updateHotel(numericHotelId, this.form.value).subscribe(
        () => {
          console.log('Hotel updated successfully.');
          this.router.navigate(['/hotels', numericHotelId]);
        },
        (error) => {
          console.error('Error updating hotel:', error);
        }
      );
    }
  }
}
