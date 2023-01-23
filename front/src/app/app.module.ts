import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { UsuariosModule } from './usuarios/usuarios.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
      AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UsuariosModule,
    FormsModule
  ]
})
export class AppModule {}