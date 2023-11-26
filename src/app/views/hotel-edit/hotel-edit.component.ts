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
      imageUrl: ['']
    });
  }

  ngOnInit() {
    // Chargez les données de l'hôtel existant ici en fonction de l'ID de l'URL
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
      const numericHotelId = +hotelId; // Convertit hotelId en nombre
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
