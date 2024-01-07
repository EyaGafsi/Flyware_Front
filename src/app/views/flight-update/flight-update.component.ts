import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-flight-update',
  templateUrl: './flight-update.component.html',
  styleUrls: ['./flight-update.component.css']
})
export class FlightUpdateComponent implements OnInit {

  form: FormGroup;
  imageData: String;
  file: any;
  flight:any;
  tripType:boolean;
  showSuccessAlert = false;
  showFailedAlert=false;
  message:any;
  constructor(private router: Router,private formBuilder: FormBuilder, private flightService: FlightService) {
      this.form = this.formBuilder.group({
        duration: ['', Validators.required],
        date: ['', Validators.required],
        returnDate: [null],
        destination: ['', [Validators.required]],
        departure: ['', Validators.required],
        price: ['', Validators.required],
        nbBuisPlaces: ['', Validators.required],
        nbEcoPlaces: ['', Validators.required],
        image: [null]
      });
      this.imageData = '';
      this.tripType=false;

  }

  ngOnInit(): void {
    const selectedFlight = this.flightService.getSelectedFlight();
    this.flightService.getFlightById(selectedFlight).subscribe(
      response => {
        this.flight=response;
        this.form = this.formBuilder.group({
          duration: [this.flight.duration, Validators.required],
          date: [this.flight.date, Validators.required],
          returnDate: [this.flight.returnDate],
          destination: [this.flight.destination, [Validators.required, Validators.email]],
          departure: [this.flight.departure, Validators.required],
          price: [this.flight.price, Validators.required],
          nbBuisPlaces: [this.flight.nbBuisPlaces, Validators.required],
          nbEcoPlaces: [this.flight.nbEcoPlaces, Validators.required],
          image: []
        });
        this.tripType=this.flight.returnDate!=null;
        this.imageData = this.flight.imagePath;
        var flightDate = new Date(this.flight.date);
        var formattedDate = flightDate.toISOString().split('T')[0];
        this.form.patchValue({ date: formattedDate });
         flightDate = new Date(this.flight.returnDate);
         formattedDate = flightDate.toISOString().split('T')[0];
        this.form.patchValue({ returnDate: formattedDate });
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
      formData.append('duration', this.form.get('duration')?.value);
      formData.append('date', this.form.get('date')?.value);
      if (this.tripType==false){
        this.form.patchValue({
          returnDate: null
        });}else{
      formData.append('returnDate', this.form.get('returnDate')?.value);}
      formData.append('destination', this.form.get('destination')?.value);
      formData.append('departure', this.form.get('departure')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('nbBuisPlaces', this.form.get('nbBuisPlaces')?.value);
      formData.append('nbEcoPlaces', this.form.get('nbEcoPlaces')?.value);
      var newFile = this.form.get('image')?.value;
      if (newFile) {
        formData.append('image', newFile);
      }
          this.flightService.update(this.flightService.getSelectedFlight(),formData).subscribe(
        response => {
          console.log(response);
          this.message = 'Flight updated successfully';

          this.showSuccessMessage();

           },
        error => {
          console.log(error);
          this.message = 'Error while updating the flight';

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
