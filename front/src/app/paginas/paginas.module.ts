import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { LaHermandadComponent } from './la-hermandad/la-hermandad/la-hermandad.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    InicioComponent,
    LaHermandadComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaginasRoutingModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class PaginasModule { }
