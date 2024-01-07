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
  imageData: String;
  file: any;
  hotel: any;
  showSuccessAlert = false;
  showFailedAlert=false;
  message:any;
  originalImageUrl:any
  constructor(
    private formBuilder: FormBuilder,
    private hotelService: HotelService,

  ) {
    this.form = this.formBuilder.group({
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

  ngOnInit() {
    const selectedHotel = this.hotelService.getSelectedHotel();
    this.hotelService.getHotelById(selectedHotel).subscribe(
      response => {
        this.hotel=response;
        this.form = this.formBuilder.group({
          name: [this.hotel.name,Validators.required],
          address: [this.hotel.address,Validators.required],
          starNumber: [this.hotel.starNumber,Validators.required],
          price:[this.hotel.price,Validators.required],
          country: [this.hotel.country,Validators.required],
          location: [this.hotel.location,Validators.required],
          nbSuites: [this.hotel.nbSuites,Validators.required],
          nbRooms: [this.hotel.nbRooms,Validators.required],
        });
        this.imageData = this.hotel.imageUrl;
        this.originalImageUrl = this.hotel.imageUrl;

      },
      error => {
        console.log(error);
      }
    );

  }

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
  onSubmit() {
    const formData = new FormData();
    formData.append('hotel',JSON.stringify(this.form.value));
    if (this.imageData !== this.originalImageUrl) {

      formData.append('image', this.file);
    }else{
      formData.append('image', new Blob(), 'empty-file.txt');

    }
    console.log( JSON.stringify(this.form.value));

      this.hotelService.updateHotel(this.hotelService.getSelectedHotel(), formData).subscribe(
        response => {
          console.log(response);
          this.message = 'Hotel updated successfully';
          this.showSuccessMessage();

           },
        error => {
          console.log(error);
          this.message = 'Error while updating the hotel';
          this.showFailedMessage();

        }
      );

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
