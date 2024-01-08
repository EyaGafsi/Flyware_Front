import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './views/flight-list/flight-list.component';
import { FlightDetailsComponent } from './views/flight-details/flight-details.component';
import { FlightAddComponent } from './views/flight-add/flight-add.component';
import { HomeComponent } from './views/home/home.component';
import { FlightUpdateComponent } from './views/flight-update/flight-update.component';
import { HotelListComponent } from './views/hotel-list/hotel-list.component';
import { HotelCreateComponent } from './views/hotel-create/hotel-create.component';
import { HotelEditComponent } from './views/hotel-edit/hotel-edit.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './views/_auth/auth.guard';
import { AccessDeniedComponent } from './views/access-denied/access-denied.component';
import { FlightBookingListComponent } from './views/flight-booking-list/flight-booking-list.component';
import { UserFlightBookingListComponent } from './views/user-flight-booking-list/user-flight-booking-list.component';
import { FlightBookingUpdateComponent } from './views/flight-booking-update/flight-booking-update.component';
import { HotelBookingListComponent } from './views/hotel-booking-list/hotel-booking-list.component';
import { HotelBookingUpdateComponent } from './views/hotel-booking-update/hotel-booking-update.component';
import { UserHotelBookingListComponent } from './views/user-hotel-booking-list/user-hotel-booking-list.component';
import { HotelBookingComponent } from './views/hotel-booking/hotel-booking.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'flights',component:FlightListComponent, canActivate: [AuthGuard],data: { roles: ['admin'] }, },
  {path:'flightDetails',component:FlightDetailsComponent, canActivate: [AuthGuard], data: { 'roles': ['client'] }},
  {path:'flightAdd',component:FlightAddComponent, canActivate: [AuthGuard], data:{ 'roles': ['admin'] }},
  {path:'flightUpdate',component:FlightUpdateComponent, canActivate: [AuthGuard], data: { 'roles': ['admin'] }},
  { path: 'hotels', component: HotelListComponent, canActivate: [AuthGuard], data:{ 'roles': ['admin'] } },
  { path: 'create', component: HotelCreateComponent , canActivate: [AuthGuard], data: { 'roles': ['admin'] }},
  { path: 'edit', component: HotelEditComponent , canActivate: [AuthGuard], data: { 'roles': ['admin'] }},
  { path: 'accessDenied', component: AccessDeniedComponent},
  { path: 'flightBookings', component: FlightBookingListComponent , canActivate: [AuthGuard], data: { 'roles': ['admin'] }},
  { path: 'userFlightBookings', component: UserFlightBookingListComponent , canActivate: [AuthGuard], data: { 'roles': ['client'] }},
  { path: 'updateFlightBookings', component: FlightBookingUpdateComponent , canActivate: [AuthGuard], data: { 'roles': ['client'] }},
  { path: 'hotelBookings', component: HotelBookingListComponent , canActivate: [AuthGuard], data: { 'roles': ['admin'] }},
  { path: 'updateHotelBookings', component: HotelBookingUpdateComponent , canActivate: [AuthGuard], data: { 'roles': ['client'] }},
  { path: 'userHotelBookings', component: UserHotelBookingListComponent , canActivate: [AuthGuard], data: { 'roles': ['client'] }},
  {path:'hotelBooking',component:HotelBookingComponent, canActivate: [AuthGuard], data: { 'roles': ['client'] }},

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
