import { Component, ViewChild, ElementRef, Renderer2, AfterViewInit, Input} from '@angular/core';
import { Pregunta } from './interface/pregunta';
@Component({
  selector: 'app-apto-sangre',
  templateUrl: './apto-sangre.component.html',
  styleUrls: ['./apto-sangre.component.scss']
})
export class AptoSangreComponent implements AfterViewInit {
  hayHueco : boolean = true;
  contador : number = 0;
  respuestas : string[] = []
  preguntas: Pregunta[] = [
    {
      id: 1,
      enunciado: "¿Tu pulso son entre 50 y 110 pulsaciones?",
      nombre_img: "pulsacion",
      respuesta: "Si",
      solucion_problema: "Mi recomendación: Deberías visitar al medico mas cercano, para que te den recomendaciones para sus latidos estén en ese rango."
    },
    {
      id: 2,
      enunciado: "¿Tienes entre 18 y 65 años?",
      nombre_img: "edad",
      respuesta: "Si",
      solucion_problema: "Mi recomendación: Si eres menor de edad, debes esperar hasta que cumplas 18 años y podrás donar sangre. Si eres mayor de edad, me temo que no hay solución para ese problema"
    },{
      id: 3,
      enunciado: "¿Pesas mas de 50 kg?",
      nombre_img: "peso",
      respuesta: "Si",
      solucion_problema: "Mi recomendación: Aliméntate de comida"
    },{
      id: 4,
      enunciado: "¿Has donado sangre durante estos ultimos dos meses?",
      nombre_img: "donar",
      respuesta: "No",
      solucion_problema: "Mi recomendación: Debes esperar de que pasen los dos meses desde su ultima donación"
    },{
      id: 5,
      enunciado: "¿Has sufrido alguna enfermedades infecciosas (Hepatitis, Paulotismo o HIV, etc...) estas ultimas dos semanas?",
      nombre_img: "enfermedad",
      respuesta: "No",
      solucion_problema: "Mi recomendación: Debes esperar una semana si no vuelves a sufrir esos síntomas"
    },
    {
      id: 6,
      enunciado: "¿Estas embarazada en estos momentos?",
      nombre_img: "embarazo",
      respuesta: "No",
      solucion_problema: "Mi recomendación: Esperar hasta que realice el parto y después del parto también debes esperar 6 meses"
    }
  ]
  @ViewChild('siguiente') boton_siguiente!: ElementRef<HTMLInputElement>;

  constructor(private renderer2: Renderer2){}

  ngAfterViewInit(): void {
    const boton = this.boton_siguiente.nativeElement;
    this.renderer2.setStyle(boton, 'display','none');

  }

  mostrarBoton(event: string): void{
    const boton = this.boton_siguiente.nativeElement;
    this.renderer2.setStyle(boton, 'display','unset');
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
      this.contador++;
      this.hayHueco = true;
      console.log("superado");
    }
    else{
      console.log(this.preguntas[this.contador].solucion_problema);
    }
  }

}
