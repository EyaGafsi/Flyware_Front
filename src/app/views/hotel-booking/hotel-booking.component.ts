import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-hotel-booking',
  templateUrl: './hotel-booking.component.html',
  styleUrls: ['./hotel-booking.component.css']
})
export class HotelBookingComponent implements OnInit {
  message:any;
  form: FormGroup;
  file: any;
  hotel:any;
  showSuccessAlert = false;
  showFailedAlert=false;
  showWarningAlert=false;

  constructor(private keycloakService: KeycloakService,private formBuilder: FormBuilder, private hotelService: HotelService) {
      this.form = this.formBuilder.group({
        hotelId: [''],
        userId: [''],
        checkIn: [null,Validators.required],
        checkOut: [null,Validators.required],
        roomType: [null,Validators.required],
        nbBeds: [null,Validators.required],
        nbRooms: [null,Validators.required]
      });

  }
  ngOnInit(): void {
    const selectedHotel = this.hotelService.getSelectedHotel();
       console.log(selectedHotel);

    this.hotelService.getHotelById(selectedHotel).subscribe(
      response => {
        this.hotel=response;
        console.log(response);

              },
      error => {
        console.log(error);
      }
    );
      }

onSubmit() {
  this.form.patchValue({ hotelId: this.hotelService.getSelectedHotel() });
  this.form.patchValue({ userId:this.keycloakService.getKeycloakInstance().tokenParsed!!.sub });

  if (this.form.valid) {
    this.hotelService.bookHotel(this.form.value).subscribe(
      response => {
        console.log(response);
        this.message = 'Booking request sent successfully';
        this.showSuccessMessage();


      },
      error => {
        this.message = 'You already booked in this hotel';
         this.showWarningMessage();

        console.log(error);

      }
    );
  } else {
    this.message = 'Veuillez corriger les erreurs dans le formulaire.';
    this.showFailedMessage();

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
showWarningMessage() {
  this.showWarningAlert = true;
  setTimeout(() => {
    this.showWarningAlert = false;
  }, 5000);
}
closeAlert() {
  this.showSuccessAlert = false;
  this.showFailedAlert = false;
  this.showWarningAlert = false;

}
}
