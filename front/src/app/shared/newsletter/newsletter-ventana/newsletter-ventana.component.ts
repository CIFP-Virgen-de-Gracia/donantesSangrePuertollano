import { Component, ViewChild, ElementRef } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations'

export const tiempoAnimacion = 250;

@Component({
  selector: 'app-newsletter-ventana',
  templateUrl: './newsletter-ventana.component.html',
  styleUrls: ['./newsletter-ventana.component.scss'],
  animations: [
    trigger('entradaSalidaVentana', [
      transition('void => *', [
        style({
          opacity: '0',
          transform: 'translateY(20%)'
        }),
        animate(tiempoAnimacion,
          style({
            opacity: '1',
            transform: 'translateY(0%)'
          })
        ),
      ]),
      transition('* => void', [
        style({
          opacity: '1',
          transform: 'translateY(0%)'
        }),
        animate(tiempoAnimacion,
          style({
            opacity: '0',
            transform: 'translateY(20%)'
          })
        ),
      ]),
      transition('* => *', [
        style({
          opacity: '0',
          transform: 'translateY(20%)'
        }),
        animate(tiempoAnimacion,
          style({
            opacity: '1',
            transform: 'translateY(0%)'
          })
        ),
      ])
    ])
  ]
})
export class NewsletterVentanaComponent {

  @ViewChild('newsletter') newsletter!: ElementRef<HTMLDivElement>;

  mostrar: boolean = true;
  suscrito: boolean = false;
  titulo: string = '¡No te pierdas nada!';
  texto: string = 'Suscríbete a nuestra newsletter para estar al tanto de noticias y eventos.';
  icono: string = 'fa-paper-plane';

  cerrar() {
    this.mostrar = false;
  }

  cambiarMensaje(event: boolean) {
    this.suscrito = true;

    this.titulo = '¡Gracias por apuntarte!';
    this.texto = 'Recibirás un correo cada vez que publiquemos una noticia.';
    this.icono = 'fa-envelope-circle-check';

    setTimeout(() => this.cerrar(), 4000);
  }
}
