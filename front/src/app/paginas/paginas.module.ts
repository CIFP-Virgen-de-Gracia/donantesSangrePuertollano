import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginasRoutingModule } from './paginas-routing.module';
import { SharedModule } from '../shared/shared.module';
import { InicioComponent } from './inicio/inicio.component';
import { MainPageComponent } from './main-page/main-page.component';
import { LaHermandadComponent } from './la-hermandad/la-hermandad.component';
import { HimnoComponent } from './himno/himno.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
import { AvisoLegalComponent } from './aviso-legal/aviso-legal.component';
import { TerminosUsoComponent } from './terminos-uso/terminos-uso.component';
import { PoliticasCookiesComponent } from './politicas-cookies/politicas-cookies.component';
import { ChatComponent } from './chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InicioComponent,
    MainPageComponent,
    LaHermandadComponent,
    HimnoComponent,
    PreguntasFrecuentesComponent,
    AvisoLegalComponent,
    TerminosUsoComponent,
    PoliticasCookiesComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PaginasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    MainPageComponent
  ]
})
export class PaginasModule { }
