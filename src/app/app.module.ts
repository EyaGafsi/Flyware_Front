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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlightListComponent,
    FlightAddComponent,
    FlightUpdateComponent,
    ClientLayoutComponent
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
