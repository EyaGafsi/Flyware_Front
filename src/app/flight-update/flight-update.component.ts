import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FlightService } from '../views/services/flight.service';

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

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) {
      this.form = this.formBuilder.group({
        departureDate: ['', Validators.required],
        arrivingDate: ['', [Validators.required, Validators.email]],
        destination: ['', Validators.required],
        price: ['', Validators.required],
        image: [null]
      });
      this.imageData = '';

  }

  ngOnInit(): void {
    const selectedFlight = this.flightService.getSelectedFlight();
    this.flightService.getFlightById(selectedFlight).subscribe(
      response => {
        this.flight=response;
        this.form = this.formBuilder.group({
          departureDate: [this.flight.departureDate, Validators.required],
          arrivingDate: [this.flight.arrivingDate, [Validators.required, Validators.email]],
          destination: [this.flight.destination, Validators.required],
          price: [this.flight.price, Validators.required],
          image: []
        });
        this.imageData = this.flight.imagePath;

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
      formData.append('departureDate', this.form.get('departureDate')?.value);
      formData.append('arrivingDate', this.form.get('arrivingDate')?.value);
      formData.append('destination', this.form.get('destination')?.value);
      formData.append('price', this.form.get('price')?.value);
      var newFile = this.form.get('image')?.value;
      if (newFile) {
        formData.append('image', newFile);
      }
          this.flightService.update(this.flightService.getSelectedFlight(),formData).subscribe(
        response => {
          console.log(response);
           },
        error => {
          console.log(error);

          console.log('Error status:', error.status);
          console.log('Error message:', error.message);
        }
      );
    }

}
