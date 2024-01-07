import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FlightService } from '../services/flight.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {
  showSuccessAlert = false;
  showFailedAlert=false;
  message:any;
  form: FormGroup;
  imageData: String;
  file: any;
  tripType:boolean;
  constructor(private formBuilder: FormBuilder, private flightService: FlightService,private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
      duration: ['', Validators.required],
      date: ['', Validators.required],
      returnDate: [null],
      destination: ['', [Validators.required]],
      departure: ['', Validators.required],
      price: ['', Validators.required],
      nbBuisPlaces: ['', Validators.required],
      nbEcoPlaces: ['', Validators.required],
      image: [],
    });
    this.imageData = "";
    this.tripType=false;

  }

  ngOnInit(): void {
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
    if (this.file) {
      const formData = new FormData();
      formData.append('duration', this.form.get('duration')?.value);
      formData.append('date',  this.datePipe.transform(this.form.get('date')?.value, 'yyyy-MM-dd') || '');
      if(this.tripType){
      formData.append('returnDate',  this.datePipe.transform(this.form.get('returnDate')?.value, 'yyyy-MM-dd') || '');}
      formData.append('destination', this.form.get('destination')?.value);
      formData.append('departure', this.form.get('departure')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('nbBuisPlaces', this.form.get('nbBuisPlaces')?.value);
      formData.append('nbEcoPlaces', this.form.get('nbEcoPlaces')?.value);
      formData.append('image', this.form.get('image')?.value);

          this.flightService.add(formData).subscribe(
        response => {
          console.log(response);
          this.form.reset();
          this.message = 'Flight added successfully';
          this.imageData = "";

          this.showSuccessMessage();
        },
        error => {
          console.log(error);
          this.message = 'Error while adding the flight';

          this.showFailedMessage();
        }
      );
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
