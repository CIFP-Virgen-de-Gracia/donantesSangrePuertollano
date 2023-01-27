import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreguntasComponent } from './preguntas/preguntas.component';



@NgModule({
  declarations: [

    PreguntasComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PreguntasComponent
  ]
})
export class AptoSangreModule { }
