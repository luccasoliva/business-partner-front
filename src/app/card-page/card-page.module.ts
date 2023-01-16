import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardPageRoutingModule } from './card-page-routing.module';
import {CardComponent} from "./card/card.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {ToolBarComponent} from "./components/tool-bar/tool-bar.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material/material.module";


@NgModule({
  declarations: [
    CardComponent,
    LoaderComponent,
    ToolBarComponent
  ],
  exports: [
    ToolBarComponent
  ],
  imports: [
    CommonModule,
    CardPageRoutingModule,
    ReactiveFormsModule,
    MaterialModule,

  ]
})
export class CardPageModule { }
