import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigRoutingModule } from './config-routing.module';
import { MainConfigComponent } from './main-config/main-config.component';
import { HermandadConfigComponent } from './hermandad-config/hermandad-config.component';
import { ContactoConfigComponent } from './contacto-config/contacto-config.component';


@NgModule({
  declarations: [
    MainConfigComponent,
    HermandadConfigComponent,
    ContactoConfigComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ],
  exports: [
    MainConfigComponent
  ]
})
export class ConfigModule { }
