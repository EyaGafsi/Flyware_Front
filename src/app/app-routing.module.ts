import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './views/flight-list/flight-list.component';
import { FlightDetailsComponent } from './views/flight-details/flight-details.component';
import { FlightAddComponent } from './views/flight-add/flight-add.component';
import { HomeComponent } from './views/home/home.component';
import { FlightUpdateComponent } from './views/flight-update/flight-update.component';
import { HotelListComponent } from './views/hotel-list/hotel-list.component';
import { HotelDetailsComponent } from './views/hotel-details/hotel-details.component';
import { HotelCreateComponent } from './views/hotel-create/hotel-create.component';
import { HotelEditComponent } from './views/hotel-edit/hotel-edit.component';
import { HttpClientModule } from '@angular/common/http';
const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'flights',component:FlightListComponent},
  {path:'flightDetails',component:FlightDetailsComponent},
  {path:'flightAdd',component:FlightAddComponent},
  {path:'flightUpdate',component:FlightUpdateComponent},
  { path: 'hotels', component: HotelListComponent },
  { path: 'hotels/:id', component: HotelDetailsComponent },
  { path: 'create', component: HotelCreateComponent },
  { path: 'edit/:id', component: HotelEditComponent },
  { path: '', redirectTo: '/hotels', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
