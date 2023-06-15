import { NgForm } from '@angular/forms';
import { LaHermandadService } from '../services/la-hermandad.service';
import { Cargo, MensajeInf } from '../interfaces/la-hermandad.interface';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-config-cargos',
  templateUrl: './config-cargos.component.html',
  styleUrls: ['./config-cargos.component.scss']
})
export class ConfigCargosComponent implements OnInit {

  @ViewChild('closeModalCargo') closeModalCargo!: ElementRef;
  @Output() mensaje: EventEmitter<MensajeInf> = new EventEmitter<MensajeInf>();

  cargos: Cargo[] = [];
  infoCargo!: Cargo;
  accion: string = '';
  acciones = ['añadir', 'editar', 'eliminar'];


  constructor(private hermandadService: LaHermandadService) {
    this.limpiarCargo();
  }


  ngOnInit() {
    this.hermandadService.getCargosJunta()
      .subscribe(resp => {
        if (resp.success) this.cargos = resp.data;
      });
  }


  insertCargo(form: NgForm) {
    this.hermandadService.insertCargo(this.infoCargo)
      .subscribe(resp => {

        if (resp.success) {

          this.cargos.push(resp.data);
          this.mensaje.emit({ exito: true, msg: `Éxito al ${this.accion} el cargo`});

        } else this.mensaje.emit({ exito: false, msg: `Error al ${this.accion} el cargo`});

        this.closeModalCargo.nativeElement.click();
        form.resetForm();
      })
  }


  deleteCargo(index: number) {
    const cargo = this.cargos[index];

    if (cargo) {
      this.hermandadService.deleteCargo(cargo.id)
      .subscribe(resp => {

        if (resp.success) {
          this.cargos.splice(this.cargos.findIndex(c => c.id == resp.data), 1);
          this.mensaje.emit({ exito: true, msg: `Éxito al ${this.accion} el cargo`});

        } else this.mensaje.emit({ exito: false, msg: `Error al ${this.accion} el cargo`});
      });
    }
  }


  limpiarCargo() {
    this.infoCargo = { id: -1, nombre: '' };
  }
}
