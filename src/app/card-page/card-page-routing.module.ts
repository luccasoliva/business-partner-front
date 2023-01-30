import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedGuard } from '../_guard/authorized.guard';
import {CardComponent} from "./card/card.component";

const routes: Routes = [
  {
    path: '',
    component: CardComponent,
    canActivate: [AuthorizedGuard],
    title: 'Cards de parceiros',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardPageRoutingModule { }
