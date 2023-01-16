import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ToolBarComponent} from "./components/tool-bar/tool-bar.component";

const routes: Routes = [
  {
    path: '',
    component: ToolBarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPageRoutingModule { }
