import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivasModule } from './directivas/directivas.module';
import { NewsletterComponent } from './newsletter/newsletter.component';


@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    NewsletterComponent
  ],
  imports: [
    CommonModule,
    DirectivasModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    NewsletterComponent
  ]
})
export class SharedModule { }
