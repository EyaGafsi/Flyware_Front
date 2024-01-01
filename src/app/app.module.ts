import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightListComponent } from './views/flight-list/flight-list.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlightAddComponent } from './views/flight-add/flight-add.component';
import { DatePipe } from '@angular/common';
import { FlightUpdateComponent } from './views/flight-update/flight-update.component';
import { ClientLayoutComponent } from './views/client-layout/client-layout.component';
import { HomeComponent } from './views/home/home.component';

import { HotelListComponent } from  './views/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './views/hotel-details/hotel-details.component';
import { HotelCreateComponent } from './views/hotel-create/hotel-create.component';
import { HotelEditComponent } from './views/hotel-edit/hotel-edit.component';


import {HotelService} from './views/services/hotel.service';
import { Hotel } from './views/models/hotel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightListComponent,
    FlightAddComponent,
    FlightUpdateComponent,
    ClientLayoutComponent,
    HotelListComponent,
    HotelDetailsComponent,
    HotelCreateComponent,
    HotelEditComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
