import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    MainPageComponent
  ]
})
export class UsuariosModule { }
