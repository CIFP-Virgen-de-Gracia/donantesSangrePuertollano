import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MainPageContenidoComponent } from './main-page-contenido/main-page-contenido.component';
import { AddContenidoComponent } from './add-contenido/add-contenido.component';
import { NoticiasRoutingModule } from './noticias-routing.module';
import { ContenidoService } from './contenido.service';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    MainPageContenidoComponent,
    AddContenidoComponent
  ],
  imports: [
    CommonModule,
    NoticiasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    ContenidoService
  ],
  exports: [
    AddContenidoComponent,
    MainPageContenidoComponent
  ]
})
export class GestionContenidoModule { }
