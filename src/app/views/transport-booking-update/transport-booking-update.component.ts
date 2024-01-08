import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeycloakService } from 'keycloak-angular';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-transport-booking-update',
  templateUrl: './transport-booking-update.component.html',
  styleUrls: ['./transport-booking-update.component.css']
})
export class TransportBookingUpdateComponent {
  message:any;
  form: FormGroup;
  file: any;
  transport:any;
  showSuccessAlert = false;
  showFailedAlert=false;
  showWarningAlert=false;

  constructor(private formBuilder: FormBuilder, private transportService: TransportService) {
      this.form = this.formBuilder.group({
        _id: [''],
        transportId: [''],
        userId: [''],
        nbPerson: [null,Validators.required],
        luggage: [null,Validators.required]
      });

  }
  ngOnInit(): void {
    const selectedTransport = this.transportService.getSelectedTransport();

    this.transportService.getTransportById(selectedTransport?.transportId).subscribe(
      response => {
        this.transport=response;
        var transportDate = new Date(this.transport.date);
        this.transport.date= transportDate.toISOString().split('T')[0];
        if (this.transport.returnDate!==null){
         transportDate = new Date(this.transport.returnDate);
         this.transport.returnDate= transportDate.toISOString().split('T')[0]; }

      },
      error => {
        console.log(error);
      }
    );
    this.form = this.formBuilder.group({
      _id: [selectedTransport?._id, Validators.required],
      transportId: [selectedTransport?.transportId, Validators.required],
      userId: [selectedTransport?.userId, Validators.required],
      nbPerson: [selectedTransport?.nbPerson, Validators.required],
      luggage: [selectedTransport?.luggage, Validators.required]
    });
  }
formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  if (h > 0) {
    return `${h}h ${m}min`;
  } else {
    return `${m}min`;
  }
}

onSubmit() {

  if (this.form.valid) {
    this.transportService.editTransportBooking(this.form.value).subscribe(
      response => {
        console.log(response);
        this.message = 'Booking request sent successfully';
        this.showSuccessMessage();
      },
      error => {
        this.message = 'You already booked in this transport';
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
