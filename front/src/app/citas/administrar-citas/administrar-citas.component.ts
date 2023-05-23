import { CitaAdmin, CitaAdminMostrar, CitaAdminPendienteMostrar } from '../interfaces/citas.interface';
import { zip } from 'rxjs';
import { CitasService } from '../services/citas.service';
import { Component } from '@angular/core';
import * as moment from 'moment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAplazarCitaComponent } from '../modal-aplazar-cita/modal-aplazar-cita.component';


@Component({
  selector: 'app-administrar-citas',
  templateUrl: './administrar-citas.component.html',
  styleUrls: ['./administrar-citas.component.scss']
})
export class AdministrarCitasComponent {

  citasPendientes: CitaAdminMostrar[] = [];
  citasPasadas: CitaAdminMostrar[] = [];
  mostrarBotonAsistida: boolean[]  = [];
  errorTraerCitas: boolean = false;
  noHayCitasPendientes: boolean = false;
  noHayCitasPasadas: boolean = false;

  constructor(
    private modal: NgbModal,
    private citasService: CitasService
  ) {}

  ngOnInit() {

    this.traerCitasAdmin();
  }


  traerCitasAdmin() {
    zip([this.citasService.fetchCitasPendientes(), this.citasService.fetchCitasPasadas()])
      .subscribe(([citasPendientesResp, citasPasadasResp]) => {

        if (citasPendientesResp.success && citasPasadasResp.success) {
          citasPasadasResp.citas.forEach(cita => {
            this.mostrarBotonAsistida.push(cita.asistida == 0);
          });

          this.colocarCitas(citasPendientesResp.citas, this.citasPendientes);
          this.colocarCitas(citasPasadasResp.citas, this.citasPasadas);


          if (this.citasPendientes.length == 0) this.noHayCitasPendientes = true;
          if (this.citasPasadas.length == 0) this.noHayCitasPasadas = true;
        }
        else {

          this.errorTraerCitas = true;
        }
      });
  }


  colocarCitas(citas: CitaAdmin[], array: CitaAdminMostrar[]) {
    let citaAsistida = '';

    array.length = 0;
    citas.forEach(cita => {
      const fechaCompletaPas = moment(cita.fecha, 'YYYY-MM-DD HH:mm:ss');
      array.push({
        id: cita.id,
        dia: fechaCompletaPas.format('DD/MM/YYYY'),
        hora: fechaCompletaPas.format('HH:mm'),
        donacion: cita.donacion,
        cancelada: cita.cancelada,
        asistida: cita.asistida,
        user: {
          id: cita.user.id,
          nombre: cita.user.nombre
        }
      });
    });
  }


  abrirModal(event: any) {

    const liElement = event.target.closest('li');
    const listItems = Array.from(liElement.parentElement.children);
    const index = listItems.indexOf(liElement);
    
    setTimeout(() => {  
      this.citasService.idCita.next(this.citasPendientes[index].id);
      this.citasService.diaCita.next(this.citasPendientes[index].dia);
      this.citasService.horaCita.next(this.citasPendientes[index].hora);
    }, 1500);
    
    
    this.modal.open(ModalAplazarCitaComponent).result.then(resultado => {
      
    }, reason => {
      this.traerCitasAdmin();
    });
    
  }


  cancelarCita(event: any) {
    const liElement = event.target.closest('li');
    const listItems = Array.from(liElement.parentElement.children);
    const index = listItems.indexOf(liElement);

    const id = this.citasPendientes[index].id;

    // const confirm = await getConfirmacion();

    this.citasService.cancelarCita(id).subscribe(resp => {
      if (resp.success) {
        
        this.citasPendientes[index].cancelada = true;
      }
      else {

        // TODO: cartelito de fallo
      }
    });
  }


  onAsistidaChange(value: number, index: number): void {
    
    this.citasPasadas[index].asistida = value;
    this.citasService.confirmarAsistencia(this.citasPasadas[index].id, value).subscribe(resp => {});
  }
}
