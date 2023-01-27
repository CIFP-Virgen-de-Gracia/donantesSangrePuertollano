import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit, Input, Output, EventEmitter} from '@angular/core';
import { Pregunta } from '../interface/pregunta';
@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.component.html',
  styleUrls: ['./preguntas.component.scss']
})
export class PreguntasComponent implements AfterViewInit{
  contador_pregunta : number = 0;
  @Input() pregunta!: Pregunta;
  @Output() botonAparece = new EventEmitter();

  @ViewChild('{{pregunta.nombre_img}}_si') radio_si!: ElementRef;
  @ViewChild('{{pregunta.nombre_img}}_no') radio_no!: ElementRef;
  @ViewChild('siguiente') boton_siguiente!: ElementRef;


  constructor(private renderer2: Renderer2){}

  ngAfterViewInit(): void {
    // const boton = this.boton_siguiente.nativeElement;
    // this.renderer2.setStyle(boton, 'display','none');

  }

  onItemChange($event: any): void{
    const radio_si = this.radio_si.nativeElement;
    const radio_no = this.radio_no.nativeElement;
    console.log($event.target.value);
    this.botonAparece.emit($event.target.value);
    // const boton = this.boton_siguiente.nativeElement;
    // if($event.target.value == this.pregunta.respuesta){
    //   console.log(radio_si.value);
    //   console.log(radio_no.value);
    //   console.log($event.target.value);
    // }

  //   this.renderer2.setStyle(boton, 'display','unset');
  }


}
