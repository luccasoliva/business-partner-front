import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPageRoutingModule } from './card-page-routing.module';
import {CardComponent} from "./card/card.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    CardComponent,
    LoaderComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,

  ]
})
export class CardPageModule { }
