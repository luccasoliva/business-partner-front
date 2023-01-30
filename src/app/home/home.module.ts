import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import {CardPageModule} from "../card-page/card-page.module";
import {MaterialModule} from "../material/material.module";
import { AuthModule } from '../auth/auth.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardPageModule,
    MaterialModule,
    AuthModule
  ]
})
export class HomeModule { }
