import { FormGroup } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Direccion } from '../interfaces/direcciones.interfaces';
import { DireccionesService } from '../services/direcciones.service';

@Component({
  selector: 'app-config-direcciones',
  templateUrl: './config-direcciones.component.html',
  styleUrls: ['./config-direcciones.component.scss']
})
export class ConfigDireccionesComponent {

  @ViewChild('closeModal') closeModal!: ElementRef;

  timer: NodeJS.Timeout | undefined;
  dirsData: Direccion[] = [];
  dir!: Direccion;
  //modalForm: FormGroup;
  exito: boolean = false;
  mensaje: string = '';
  accion: string = '';
  acciones = ['añadir', 'editar', 'eliminar'];

  constructor(private DirsService: DireccionesService) {}


  ngOnInit() {
    this.DirsService.getDirecciones().subscribe(resp => {
      if (resp.success) this.dirsData = resp.data;
    });
  }
}
