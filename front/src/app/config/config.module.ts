import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ConfigRoutingModule } from './config-routing.module';
import { MainConfigComponent } from './main-config/main-config.component';
import { HermandadConfigComponent } from './hermandad-config/hermandad-config.component';
import { ContactoConfigComponent } from './contacto-config/contacto-config.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [
    MainConfigComponent,
    HermandadConfigComponent,
    ContactoConfigComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    FormsModule
  ],
  exports: [
    MainConfigComponent
  ]
})
export class ConfigModule { }
