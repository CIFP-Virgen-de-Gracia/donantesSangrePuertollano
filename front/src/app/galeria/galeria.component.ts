import { Component, ViewChild, ElementRef, Renderer2, OnInit, SimpleChanges } from '@angular/core';
import { GaleriaService } from './service/galeria.service';
import { Galeria } from './interface/galeria';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit{
  p: number = 1;
  imagenesSeleccionadas: any[] = [];
  galeria_imagenes: Galeria[] = [];
  constructor(public galeriaServicio: GaleriaService) { }

  ngOnInit(): void {
    this.galeriaServicio.getGaleria_Imagenes().subscribe( imagen => {this.galeria_imagenes = imagen});

  }




  eliminandoFotos(): void{

    console.log(this.imagenesSeleccionadas);
    this.imagenesSeleccionadas.forEach(id => {
      this.galeriaServicio.borrarImagenes(id).subscribe((res) => {
        console.log('Respuesta del servidor', res);
        this.mostrarImagenes();
      })
    })

  }

  mostrarImagenes(): void{
    this.galeriaServicio.getGaleria_Imagenes().subscribe( imagen => {this.galeria_imagenes = imagen});
  }

  fotoSeleccionada(event: any): void{
    if(event.target.type == 'checkbox'){
      if(event.target.checked){
        this.imagenesSeleccionadas.push(event.target.id);
      }
      else{
        let i = this.imagenesSeleccionadas.indexOf(event.target.id);
        this.imagenesSeleccionadas.splice(i, 1);
      }
    }
  }
}
