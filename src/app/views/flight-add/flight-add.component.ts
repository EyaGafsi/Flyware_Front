import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FlightService } from '../services/flight.service';

@Component({
  selector: 'app-flight-add',
  templateUrl: './flight-add.component.html',
  styleUrls: ['./flight-add.component.css']
})
export class FlightAddComponent implements OnInit {

  form: FormGroup;
  imageData: String;
  file: any;

  constructor(private formBuilder: FormBuilder, private flightService: FlightService) {
    this.form = this.formBuilder.group({
      departureDate: ['', Validators.required],
      arrivingDate: ['', [Validators.required, Validators.email]],
      destination: ['', Validators.required],
      price: ['', Validators.required],
      image: []  // Use formControlName "image" to match your HTML template
    });
    this.imageData = "";
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

      formData.append('departureDate', this.form.get('departureDate')?.value);
      formData.append('arrivingDate', this.form.get('arrivingDate')?.value);
      formData.append('destination', this.form.get('destination')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('image', this.form.get('image')?.value);

          this.flightService.add(formData).subscribe(
        response => {
          console.log(response);
          this.form.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}
