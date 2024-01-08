import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransportService } from '../services/transport.service';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-transport-details',
  templateUrl: './transport-details.component.html',
  styleUrls: ['./transport-details.component.css']
})
export class TransportDetailsComponent implements OnInit {
  message:any;
  form: FormGroup;
  file: any;
  transport:any;
  showSuccessAlert = false;
  showFailedAlert=false;
  showWarningAlert=false;

  constructor(private keycloakService: KeycloakService,private formBuilder: FormBuilder, private transportService: TransportService) {
      this.form = this.formBuilder.group({
        transportId: [''],
        userId: [''],
        date: ["",Validators.required],
        duration: ["",Validators.required],
        nbPerson: ["",Validators.required],
        luggage: ["",Validators.required]
      });

  }
  ngOnInit(): void {
    const selectedTransport = this.transportService.getSelectedTransport();
    this.transportService.getTransportById(selectedTransport).subscribe(
      response => {
        this.transport=response;
       console.log(this.transport);

      },
      error => {
        console.log(error);
      }
    );
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
  this.form.patchValue({ transportId: this.transportService.getSelectedTransport() });
  this.form.patchValue({ userId:this.keycloakService.getKeycloakInstance().tokenParsed!!.sub });

  if (this.form.valid) {
    this.transportService.bookTransport(this.form.value).subscribe(
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
