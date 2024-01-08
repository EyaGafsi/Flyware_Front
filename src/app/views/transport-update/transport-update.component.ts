import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TransportService } from '../services/transport.service';

@Component({
  selector: 'app-transport-update',
  templateUrl: './transport-update.component.html',
  styleUrls: ['./transport-update.component.css']
})
export class TransportUpdateComponent implements OnInit {

  form: FormGroup;
  imageData: String;
  file: any;
  transport: any;
  showSuccessAlert = false;
  showFailedAlert = false;
  message: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private transportService: TransportService
  ) {
    this.form = this.formBuilder.group({
      duration: ['', Validators.required],
      date: ['', Validators.required],
      returnDate: [null],
      destination: ['', [Validators.required]],
      departure: ['', Validators.required],
      price: ['', Validators.required],
      image: [null]
    });
    this.imageData = '';
  }

  ngOnInit(): void {
    const selectedTransport = this.transportService.getSelectedTransport();
    this.transportService.getTransportById(selectedTransport).subscribe(
      response => {
        this.transport = response;
        this.form = this.formBuilder.group({
          duration: [this.transport.duration, Validators.required],
          date: [this.transport.date, Validators.required],
          returnDate: [this.transport.returnDate],
          destination: [this.transport.destination, [Validators.required]],
          departure: [this.transport.departure, Validators.required],
          price: [this.transport.price, Validators.required],
          image: []
        });
        this.imageData = this.transport.imagePath;
        var transportDate = new Date(this.transport.date);
        var formattedDate = transportDate.toISOString().split('T')[0];
        this.form.patchValue({ date: formattedDate });
        transportDate = new Date(this.transport.returnDate);
        formattedDate = transportDate.toISOString().split('T')[0];
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
        this.form.patchValue({ image: this.file });
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
      formData.append('returnDate', this.form.get('returnDate')?.value);
    formData.append('destination', this.form.get('destination')?.value);
    formData.append('departure', this.form.get('departure')?.value);
    formData.append('price', this.form.get('price')?.value);
    var newFile = this.form.get('image')?.value;
    if (newFile) {
      formData.append('image', newFile);
    }

    this.transportService.updateTransport(this.transportService.getSelectedTransport(), formData).subscribe(
      response => {
        console.log(response);
        this.message = 'Transport updated successfully';
        this.showSuccessMessage();
      },
      error => {
        console.log(error);
        this.message = 'Error while updating the transport. Please try again later.';
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
