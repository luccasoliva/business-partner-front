import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {MaterialModule} from "../material/material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { NavComponent } from './nav/nav.component';


@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        NavComponent
    ],
    exports: [
        NavComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class AuthModule { }
