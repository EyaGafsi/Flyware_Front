import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ClientLayoutComponent } from './client-layout/client-layout.component';



@NgModule({
  declarations: [
    AdminLayoutComponent,
    ClientLayoutComponent
  ],
  imports: [
    CommonModule
  ]
})
export class LayoutModule { }
