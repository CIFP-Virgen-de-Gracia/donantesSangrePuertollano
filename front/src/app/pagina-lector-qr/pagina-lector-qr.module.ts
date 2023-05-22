import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';
import { LectorComponent } from './lector/lector.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from './services/lector-routing.module';



@NgModule({
  declarations: [
    PrincipalComponent,
    LectorComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    PrincipalComponent,
    LectorComponent
  ]
})
export class PaginaLectorQrModule { }
