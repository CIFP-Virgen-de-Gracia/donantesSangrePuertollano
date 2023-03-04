import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivasModule } from './directivas/directivas.module';
import { EmailFormularioComponent } from './newsletter/email-formulario/email-formulario.component';
import { NewsletterVentanaComponent } from './newsletter/newsletter-ventana/newsletter-ventana.component';
import { StickyTopDirective } from './directivas/sticky-top.directive';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    EmailFormularioComponent,
    NewsletterVentanaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivasModule,
    ReactiveFormsModule
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    NewsletterVentanaComponent
  ]
})

export class SharedModule {}
