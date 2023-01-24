import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { StickyTopDirective } from './directivas/sticky-top.directive';


@NgModule({
  declarations: [
    FooterComponent,
    MenuComponent,
    StickyTopDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FooterComponent,
    MenuComponent
  ]
})
export class SharedModule { }
