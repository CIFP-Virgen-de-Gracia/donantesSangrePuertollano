import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LaHermandadComponent } from './la-hermandad/la-hermandad.component';
import { HimnoComponent } from './himno/himno.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';

@NgModule({
  declarations: [
    InicioComponent,
    MainPageComponent,
    LaHermandadComponent,
    HimnoComponent,
    PreguntasFrecuentesComponent
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
