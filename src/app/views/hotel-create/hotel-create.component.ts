// hotel-create.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css']
})
export class HotelCreateComponent implements OnInit {
  form: FormGroup;
  imageData: string = ''; // Ensure imageData is initialized

  constructor(private fb: FormBuilder, private hotelService: HotelService, private router: Router) {
    this.form = this.fb.group({
      name: [''],
      address: [''],
      rating: [null],
      imageUrl: [''], // Use imageUrl instead of image
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const formData = this.form.value;

    this.hotelService.createHotel(formData).subscribe(
      (data) => {
        console.log('Hotel created successfully:', data);
        this.router.navigate(['/hotel-list']);
      },
      (error) => {
        console.error('Error creating hotel:', error);
      }
    );
  }

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      const file = target.files[0];
      if (file) {
        this.form.patchValue({ imageUrl: file.name }); // Set the imageUrl field
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (allowedMimeTypes.includes(file.type)) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageData = reader.result as string;
          };
          reader.readAsDataURL(file);
        }
      }
    }
  }
}
