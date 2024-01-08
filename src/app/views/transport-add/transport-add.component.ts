import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { TransportService } from '../services/transport.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transport-add',
  templateUrl: './transport-add.component.html',
  styleUrls: ['./transport-add.component.css']
})
export class TransportAddComponent {
  showSuccessAlert = false;
  showFailedAlert=false;
  message:any;
  form: FormGroup;
  imageData: String;
  file: any;
  constructor(private formBuilder: FormBuilder, private transportService: TransportService,private datePipe: DatePipe) {
    this.form = this.formBuilder.group({
      duration: ['', Validators.required],
      date: ['', Validators.required],
      returnDate: [null],
      departure: ['', Validators.required],
      destination: ['', Validators.required],
      price: ['', Validators.required],
      imagePath: []
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
console.log(this.form);

      const formData = new FormData();
      formData.append('duration', this.form.get('duration')?.value);
      formData.append('date',  this.datePipe.transform(this.form.get('date')?.value, 'yyyy-MM-dd') || '');
      formData.append('returnDate',  this.datePipe.transform(this.form.get('returnDate')?.value, 'yyyy-MM-dd') || '');
      formData.append('destination', this.form.get('destination')?.value);
      formData.append('departure', this.form.get('departure')?.value);
      formData.append('price', this.form.get('price')?.value);
      formData.append('imagePath', this.form.get('imagePath')?.value);

          this.transportService.addTransport(formData).subscribe(
        response => {
          console.log(response);
          this.form.reset();
          this.message = 'Transport added successfully';
          this.imageData = "";

          this.showSuccessMessage();
        },
        error => {
          console.log(error);
          this.message = 'Error while adding the transport';

          this.showSuccessMessage();
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
