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
      mark: ['', Validators.required],
      location: ['', Validators.required],
      nbPerson: ['', Validators.required],
      nbLuggage: ['', Validators.required],
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
        this.form.patchValue({imagePath:this.file});
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
      formData.append('mark', this.form.get('mark')?.value);
      formData.append('location',  this.form.get('location')?.value);
      formData.append('nbPerson', this.form.get('nbPerson')?.value);
      formData.append('nbLuggage', this.form.get('nbLuggage')?.value);
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
