import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { ResultadoComponent } from './resultado/resultado.component';

@NgModule({
  declarations: [
    PreguntasComponent,
    ResultadoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PreguntasComponent,
    ResultadoComponent
  ]
})
export class AptoSangreModule { }
