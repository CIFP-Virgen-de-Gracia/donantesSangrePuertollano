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
}) //Alicia
export class NewsletterVentanaComponent {

  mostrar: boolean = true;
  suscrito: boolean = false;
  titulo: string = '¡No te pierdas nada!';
  texto: string = 'Suscríbete a nuestra newsletter para estar al tanto de noticias y eventos.';

  //Alicia
  cerrar() {
    this.mostrar = false;
  }

  //Alicia
  cambiarMensaje(event: boolean) {
    this.suscrito = true;

    this.titulo = '¡Gracias por apuntarte!';
    this.texto = 'Hemos enviado un enlace de verificación a tu correo ¡No olvides visitarlo para empezar a recibir notificaciones!';

    setTimeout(() => this.cerrar(), 5000);
  }
}
