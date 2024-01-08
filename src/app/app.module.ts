import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClientModule } from '@angular/common/http';
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
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HotelListComponent } from  './views/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './views/hotel-details/hotel-details.component';
import { HotelCreateComponent } from './views/hotel-create/hotel-create.component';
import { HotelEditComponent } from './views/hotel-edit/hotel-edit.component';
import { AuthGuard } from './views/_auth/auth.guard';
import { AccessDeniedComponent } from './views/access-denied/access-denied.component';
import { FlightBookingListComponent } from './views/flight-booking-list/flight-booking-list.component';
import { UserFlightBookingListComponent } from './views/user-flight-booking-list/user-flight-booking-list.component';
import { FlightDetailsComponent } from './views/flight-details/flight-details.component';
import { FlightBookingUpdateComponent } from './views/flight-booking-update/flight-booking-update.component';
import { RxStompService } from './views/services/rx-stomp-service.service';
import { HotelBookingListComponent } from './views/hotel-booking-list/hotel-booking-list.component';
import { HotelBookingUpdateComponent } from './views/hotel-booking-update/hotel-booking-update.component';
import { UserHotelBookingListComponent } from './views/user-hotel-booking-list/user-hotel-booking-list.component';

export function kcFactory(kcService: KeycloakService) {
  return () => {
    console.log('Initializing Keycloak');
    return kcService.init({
      config: {
        realm: 'Flyware-Realm',
        clientId: 'flyware-client',
        url: 'http://localhost:8080'

      },
      initOptions: {
        onLoad: 'check-sso',
        enableLogging: true,
  checkLoginIframe: false,
  flow: 'standard'}    })
    .then((authenticated) => {
      console.log('Keycloak authenticated:', authenticated);
    })
    .catch((error) => {
      console.error('Error initializing Keycloak:', error);
    });
  };
}


@NgModule({
  declarations: [
    AppComponent,
    ClientLayoutComponent,
    HomeComponent,
    FlightListComponent,
    FlightAddComponent,
    FlightUpdateComponent,
    HotelListComponent,
    HotelDetailsComponent,
    HotelCreateComponent,
    HotelEditComponent,
    AccessDeniedComponent,
    FlightBookingListComponent,
    UserFlightBookingListComponent,
    FlightDetailsComponent,
    FlightBookingUpdateComponent,
    HotelEditComponent,
    HotelBookingListComponent,
    HotelBookingUpdateComponent,
    UserHotelBookingListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    ReactiveFormsModule,
    KeycloakAngularModule
    ],
  providers: [DatePipe ,
    AuthGuard,
  {
    provide: APP_INITIALIZER,
    deps: [KeycloakService],
    useFactory: kcFactory,
    multi: true,
  },
  RxStompService,],

  bootstrap: [AppComponent]
})
export class AppModule { }
