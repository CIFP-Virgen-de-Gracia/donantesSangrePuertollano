import { NgForm } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { LaHermandadService } from '../services/la-hermandad.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Cargo, Integrante } from '../interfaces/la-hermandad.interface';
import { entradaSalidaVentana } from 'src/app/shared/animaciones/animaciones';

@Component({
  selector: 'app-config-junta',
  templateUrl: './config-junta.component.html',
  styleUrls: ['./config-junta.component.scss'],
  animations: [ entradaSalidaVentana ]
})
export class ConfigJuntaComponent {

  @ViewChild('closeModal') closeModal!: ElementRef;

  timer: NodeJS.Timeout | undefined;
  mensaje: String = '';
  cargos: Cargo[] = [];
  infoInt!: Integrante;
  junta: Integrante[] = [];
  codAccion: number = -1;
  accion: string = '';
  acciones = ['añadir', 'editar', 'borrar'];


  constructor(
    private SharedService: SharedService,
    private HermandadService: LaHermandadService
  ) {
    this.limpiarIntegrante();
  }


  ngOnInit() {
    this.SharedService.getIntegrantesCargo()
      .subscribe(resp => {
        if (resp.success) this.junta = resp.data;
      });

    this.HermandadService.getCargosJunta()
      .subscribe(resp => {
        if (resp.success) this.cargos = resp.data;
      });
  }


  setInfoIntegrante(index: number) {
    this.limpiarMensaje()
    const integrante = this.junta[index];

    this.infoInt = {
      id: integrante.id,
      nombre: integrante.nombre,
      cargo: integrante.cargo,
      idCargo: integrante.idCargo
    }
  }


  updateIntegrante(form: NgForm) {
    const idCargo = this.cargos.find(c => c.nombre == this.infoInt.cargo);
    if (idCargo) this.infoInt.idCargo = idCargo.id;

    this.HermandadService.updateIntegranteJunta(this.infoInt)
      .subscribe(resp => {

        if (resp.success && resp.intJunta) {

          this.infoInt = resp.intJunta;
          const indexInt = this.junta.findIndex(i => i.id == this.infoInt.id);

          if (indexInt == -1) this.junta.push(this.infoInt);
          else this.junta[indexInt] = this.infoInt;

          this.codAccion = 0;

        } else this.codAccion = 1;

        this.setTimer(4000);
        this.closeModal.nativeElement.click();
        form.resetForm();
      })
  }


  deleteIntegrante(index: number) {
    this.limpiarMensaje();

    this.HermandadService.deleteIntegranteJunta(this.junta[index].id)
      .subscribe(resp => {

        if (resp.success) {
          this.junta.splice(this.junta.findIndex(i => i.id == resp.idInt), 1);
          this.codAccion = 0;

        } else this.codAccion = 1;

        this.setTimer(4000);
      });
  }


  limpiarIntegrante() {
    this.infoInt = { id: -1, nombre: '', cargo: '', idCargo: -1 };
  }


  limpiarMensaje() {
    clearTimeout(this.timer);
    this.codAccion = -1;
  }


  setTimer(tiempo: number) {
    this.timer = setTimeout(() => this.codAccion = -1, tiempo);
  }
}
