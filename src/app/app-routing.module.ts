import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightListComponent } from './views/flight-list/flight-list.component';
import { FlightDetailsComponent } from './views/flight-details/flight-details.component';
import { FlightAddComponent } from './views/flight-add/flight-add.component';
import { HomeComponent } from './views/home/home.component';
import { FlightUpdateComponent } from './views/flight-update/flight-update.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'flights',component:FlightListComponent},
  {path:'flightDetails',component:FlightDetailsComponent},
  {path:'flightAdd',component:FlightAddComponent},
  {path:'flightUpdate',component:FlightUpdateComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
