import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaginasRoutingModule,
  ],
  exports: [
  ]
})
export class PaginasModule { }
