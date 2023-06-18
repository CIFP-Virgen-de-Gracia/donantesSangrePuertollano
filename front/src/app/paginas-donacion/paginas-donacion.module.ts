import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonacionSangreComponent } from './donacion-sangre/donacion-sangre.component';
import { SharedModule } from '../shared/shared.module';
import { MainPageComponent } from './main-page/main-page.component';
import { AppRoutingModule } from './services/donacion-routing.module';


@NgModule({
  declarations: [
    DonacionSangreComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    DonacionSangreComponent,
    MainPageComponent,
  ]
})
export class PaginasDonacionModule { }
