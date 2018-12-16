import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomestayComponent } from './homestay/homestay.component';
import { AdminRoutes } from './admin-routing.module';
import {Router, RouterModule} from '@angular/router';

@NgModule({
  declarations: [HomestayComponent],
  imports: [
    CommonModule,
      RouterModule.forChild(AdminRoutes)
  ]
})
export class AdminModule { }
