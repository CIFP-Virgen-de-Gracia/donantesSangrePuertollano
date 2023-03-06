import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ConfigRoutingModule } from './config-routing.module';
import { MainConfigComponent } from './main-config/main-config.component';
import { HermandadConfigComponent } from './hermandad-config/hermandad-config.component';
import { ContactoConfigComponent } from './contacto-config/contacto-config.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SharedModule } from '../shared/shared.module';
import { HimnoConfigComponent } from './himno-config/himno-config.component';
import { AddHimnoComponent } from './auxiliarHimno/add-himno/add-himno.component';
import { EditHimnoComponent } from './auxiliarHimno/edit-himno/edit-himno.component';
import { DeleteHimnoComponent } from './auxiliarHimno/delete-himno/delete-himno.component';
import { TestConfigComponent } from './test-config/test-config.component';
import { AniadirPreguntaComponent } from './test-config/aniadir-pregunta/aniadir-pregunta.component';
import { ModificarPreguntaComponent } from './test-config/modificar-pregunta/modificar-pregunta.component';
import { BorrarPreguntaComponent } from './test-config/borrar-pregunta/borrar-pregunta.component';

@NgModule({
  declarations: [
    MainConfigComponent,
    HermandadConfigComponent,
    ContactoConfigComponent,
    HimnoConfigComponent,
    AddHimnoComponent,
    EditHimnoComponent,
    DeleteHimnoComponent,,
    TestConfigComponent,
    AniadirPreguntaComponent,
    ModificarPreguntaComponent,
    BorrarPreguntaComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    ConfigRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  exports: [
    MainConfigComponent
  ]
})
export class ConfigModule { }
