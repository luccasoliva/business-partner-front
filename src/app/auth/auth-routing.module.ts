import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {IsLoggedGuard} from "../_guard/is-logged.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedGuard],
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [IsLoggedGuard],
    title: 'Registrar'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
