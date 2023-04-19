import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { EmailFormularioComponent } from './newsletter/email-formulario/email-formulario.component';
import { NewsletterVentanaComponent } from './newsletter/newsletter-ventana/newsletter-ventana.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ModalPedirCitaComponent } from './modal-pedir-cita/modal-pedir-cita.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    ReactiveFormsModule,
    AngularEditorModule,
    NgbModule
  ],
  entryComponents: [
    ModalPedirCitaComponent
  ],
  exports: [
    MenuComponent,
    FooterComponent,
    NewsletterVentanaComponent,
  ]
})

export class SharedModule {}
