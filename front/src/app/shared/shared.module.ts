import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { DirectivasModule } from './directivas/directivas.module';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    DirectivasModule
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule { }
