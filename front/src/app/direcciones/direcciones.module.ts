import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DireccionesRoutingModule } from './direcciones-routing.module';
import { ConfigDireccionesComponent } from './config-direcciones/config-direcciones.component';
import { FooterDireccionesComponent } from './footer-direcciones/footer-direcciones.component';
import { InicioDireccionesComponent } from './inicio-direcciones/inicio-direcciones.component';


@NgModule({
  declarations: [
    ConfigDireccionesComponent,
    FooterDireccionesComponent,
    InicioDireccionesComponent
  ],
  imports: [
    CommonModule,
    DireccionesRoutingModule
  ],
  exports: [
    InicioDireccionesComponent,
    FooterDireccionesComponent
  ]
})
export class DireccionesModule { }
