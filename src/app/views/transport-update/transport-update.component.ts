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
      mark: ['', Validators.required],
      location: ['', Validators.required],
      nbPerson: ['', Validators.required],
      nbLuggage: ['', Validators.required],
      price: ['', Validators.required],
      imagePath: []
    });
    this.imageData = '';
  }

  ngOnInit(): void {
    const selectedTransport = this.transportService.getSelectedTransport();
    console.log(this.transportService.getSelectedTransport());

    this.transportService.getTransportById(selectedTransport).subscribe(
      response => {
        this.transport = response;
        this.form = this.formBuilder.group({

          mark: [this.transport.mark, Validators.required],
          location: [this.transport.location, Validators.required],
          nbPerson: [this.transport.nbPerson, Validators.required],
          nbLuggage: [this.transport.nbLuggage, Validators.required],
          price: [this.transport.price, Validators.required],
          imagePath: []
         });
        this.imageData = this.transport.imagePath;
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
        this.form.patchValue({ imagePath: this.file });
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
    formData.append('mark', this.form.get('mark')?.value);
    formData.append('location',  this.form.get('location')?.value);
    formData.append('nbPerson', this.form.get('nbPerson')?.value);
    formData.append('nbLuggage', this.form.get('nbLuggage')?.value);
    formData.append('price', this.form.get('price')?.value);
    var newFile = this.form.get('imagePath')?.value;
    if (newFile) {
      formData.append('imagePath', newFile);
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
