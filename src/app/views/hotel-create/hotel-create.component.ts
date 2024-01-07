/* The HotelCreateComponent class is responsible for creating a new hotel by submitting a form with
hotel details and an image. */
// hotel-create.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-create',
  templateUrl: './hotel-create.component.html',
  styleUrls: ['./hotel-create.component.css']
})
export class HotelCreateComponent implements OnInit {
  form: FormGroup;
  imageData: string;
  showSuccessAlert = false;
  showFailedAlert=false;
  message:any;
  file: any;
  constructor(private fb: FormBuilder, private hotelService: HotelService, private router: Router) {
    this.form = this.fb.group({
      name: ['',Validators.required],
      address: ['',Validators.required],
      starNumber: [null,Validators.required],
      price:[null,Validators.required],
      country: ['',Validators.required],
      location: ['',Validators.required],
      nbSuites: [null,Validators.required],
      nbRooms: [null,Validators.required],
    });
    this.imageData = "";

  }


  ngOnInit(): void {
  }

  onSubmit() {
    if (this.file) {

    const formData = new FormData();
    formData.append('hotel', JSON.stringify(this.form.value));
    formData.append('image', this.file);

    this.hotelService.createHotel(formData).subscribe(
      (data) => {
        console.log('Hotel created successfully:', data);
        this.form.reset();
        this.message = 'Hotel added successfully';
        this.imageData = "";
        this.showSuccessMessage();
      },
      error => {
        console.log(error);
        this.message = 'Error while adding the hotel';

        this.showFailedMessage();
      }
    );
  }}

  onFileSelect(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.file = target.files[0];
      if (this.file) {
        this.form.patchValue({image:this.file});
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];
        if (allowedMimeTypes.includes(this.file.type)) {
          const reader = new FileReader();
          reader.onload = () => {
            this.imageData = reader.result as string;
          };
          reader.readAsDataURL(this.file);
        }
      }
    }
  }
  showSuccessMessage() {
    this.showSuccessAlert = true;

    setTimeout(() => {
      this.showSuccessAlert = false;
    }, 5000);
  }
  showFailedMessage() {
    this.showFailedAlert = true;
    setTimeout(() => {
      this.showFailedAlert = false;
    }, 5000);
  }

  closeAlert() {
    this.showSuccessAlert = false;
    this.showFailedAlert = false;

  }
}
