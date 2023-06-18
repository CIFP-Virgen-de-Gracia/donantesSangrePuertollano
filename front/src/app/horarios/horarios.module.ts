import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HorariosRoutingModule } from './horarios-routing.module';
import { HorariosConfigComponent } from './horarios-config/horarios-config.component';

@NgModule({
  declarations: [
    HorariosConfigComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HorariosRoutingModule
  ]
})
export class HorariosModule { }
