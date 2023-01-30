import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivasModule } from './directivas/directivas.module';


@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    DirectivasModule
  ],
  exports: [
    MenuComponent,
    FooterComponent
  ]
})

export class SharedModule {}
