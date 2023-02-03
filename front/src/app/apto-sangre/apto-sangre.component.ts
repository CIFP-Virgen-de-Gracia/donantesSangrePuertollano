import { Component, ViewChild, ElementRef, Renderer2, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { Pregunta } from './interface/pregunta';
import { ServicioService } from './servicio/servicio.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-apto-sangre',
  templateUrl: './apto-sangre.component.html',
  styleUrls: ['./apto-sangre.component.scss']
})
export class AptoSangreComponent implements OnInit, AfterViewInit{
  hayHueco : boolean = true;
  contador : number = 0;
  respuestas : any[] = [];
  constructor(private servicio: ServicioService, private renderer2: Renderer2, private router: Router){}
  preguntas: Pregunta[] = [];
  preguntas_respuestas: any[] = [];
  @ViewChild('siguiente') boton_siguiente!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
      this.servicio.getPreguntas().subscribe( pregunta => {this.preguntas = pregunta});
  }

  ngAfterViewInit(): void {
    const boton = this.boton_siguiente.nativeElement;
    this.renderer2.setStyle(boton, 'visibility','hidden');

  }

  mostrarBoton(event: string): void{
    const boton = this.boton_siguiente.nativeElement;
    this.renderer2.setStyle(boton, 'visibility','unset');
    if(this.hayHueco){
      this.respuestas.push(event)
      this.hayHueco = false;
    }
    else{
      this.respuestas[this.respuestas.length - 1] = event;
    }
    console.log(this.respuestas);
  }

  evaluarRespuesta(): void{

    if(this.respuestas[this.respuestas.length - 1] == this.preguntas[this.contador].respuesta){
      if(this.contador < this.preguntas.length - 1){
        this.contador++;
        this.hayHueco = true;
        const boton = this.boton_siguiente.nativeElement;
        this.renderer2.setStyle(boton, 'visibility','hidden');
      }
      else{
        console.log("Ha superado la maxima cantidad de preguntas");
        this.preguntas_respuestas = [this.preguntas.slice(0, this.contador + 1), (this.respuestas)]
        this.servicio.preguntasEnviadas = this.preguntas_respuestas;
        this.router.navigate(['/resultado'], {skipLocationChange: true});
      }
    }
    else{

      this.preguntas_respuestas = [this.preguntas.slice(0, this.contador + 1), (this.respuestas)]
      this.servicio.preguntasEnviadas = this.preguntas_respuestas;
      this.router.navigate(['/resultado'], {skipLocationChange: true});
    }


  }
}
