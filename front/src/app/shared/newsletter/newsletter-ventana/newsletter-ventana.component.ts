import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations'

export const fadeInOutTimeout = 250;

@Component({
  selector: 'app-newsletter-ventana',
  templateUrl: './newsletter-ventana.component.html',
  styleUrls: ['./newsletter-ventana.component.scss'],
  animations: [
    trigger('entradaTexto', [
      transition('void => *', [style({ opacity: '0', transform: 'translateX(-10%)' }), animate(fadeInOutTimeout)]),
      transition('* => void', [animate(fadeInOutTimeout, style({ opacity: '0' }))]),
      transition('* => *', [
        style({ opacity: '0', transform: 'translateX(-10%)' }),
        animate(fadeInOutTimeout, style({ opacity: '1', transform: 'translateX(0%)' })),
      ]),
    ])
  ]
})
export class NewsletterVentanaComponent {

  @ViewChild('newsletter') newsletter!: ElementRef<HTMLDivElement>;

  estaSuscrito: boolean = true;
  titulo: string = '¡No te pierdas nada!';
  texto: string = 'Suscríbete a nuestra newsletter para estar al tanto de noticias y eventos.';
  icono: string = 'fa-paper-plane';

  cerrar() {
    this.newsletter.nativeElement.remove();
  }

  cambiarMensaje(event: boolean) {
    this.estaSuscrito = false;
    this.titulo = '¡Gracias por apuntarte!';
    this.texto = 'Recibirás un correo cada vez que publiquemos una noticia.';
    this.icono = 'fa-envelope-circle-check';
  }
}
