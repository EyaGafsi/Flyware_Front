import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotel-booking-update',
  templateUrl: './hotel-booking-update.component.html',
  styleUrls: ['./hotel-booking-update.component.css']
})
export class HotelBookingUpdateComponent implements OnInit {
  message:any;
  form: FormGroup;
  file: any;
  hotel:any;
  showSuccessAlert = false;
  showFailedAlert=false;
  showWarningAlert=false;

  constructor(private formBuilder: FormBuilder, private hotelService: HotelService) {
      this.form = this.formBuilder.group({
        _id: [''],
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

    this.hotelService.getHotelById(selectedHotel?.hotelId).subscribe(
      response => {
        this.hotel=response;
        console.log(response);

              },
      error => {
        console.log(error);
      }
    );
    console.log(selectedHotel);

    this.form = this.formBuilder.group({
      _id: [selectedHotel?._id, Validators.required],
      hotelId: [selectedHotel?.hotelId, Validators.required],
      userId: [selectedHotel?.userId, Validators.required],
      checkIn: [selectedHotel?.checkIn, Validators.required],
      checkOut: [selectedHotel?.checkOut, Validators.required],
      roomType: [selectedHotel?.roomType, Validators.required],
      nbBeds: [selectedHotel?.nbBeds, Validators.required],
      nbRooms: [selectedHotel?.nbRooms, Validators.required],

    });
    var checkInDate = new Date(selectedHotel?.checkIn);
        var formattedDate = checkInDate.toISOString().split('T')[0];
        this.form.patchValue({ checkIn: formattedDate });
        var checkOutDate = new Date(selectedHotel?.checkOut);
         formattedDate = checkOutDate.toISOString().split('T')[0];
        this.form.patchValue({ checkOut: formattedDate });

      }

onSubmit() {

  if (this.form.valid) {
    this.hotelService.editHotelBooking(this.form.value).subscribe(
      response => {
        console.log(response);
        this.message = 'Booking updated successfully';
        this.showSuccessMessage();
      },
      error => {
        this.message = 'error while updating';
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
