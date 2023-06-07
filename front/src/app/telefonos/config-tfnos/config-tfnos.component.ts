import { Telefono } from '../interfaces/telefonos.interfaces';
import { TelefonosService } from '../services/telefonos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { entradaSalidaVentana } from 'src/app/shared/animaciones/animaciones';

@Component({
  selector: 'app-config-tfnos',
  templateUrl: './config-tfnos.component.html',
  styleUrls: ['./config-tfnos.component.scss'],
  animations: [entradaSalidaVentana]
})
export class ConfigTfnosComponent implements OnInit {

  @ViewChild('closeModal') closeModal!: ElementRef;

  timer: NodeJS.Timeout | undefined;
  tfnosData: Telefono[] = [];
  telefono!: Telefono;
  modalForm: FormGroup;
  exito: boolean = false;
  mensaje: string = '';
  accion: string = '';
  acciones = ['añadir', 'editar', 'eliminar'];


  constructor(private TfnsService: TelefonosService, private fb: FormBuilder) {
    this.modalForm = this.crearFormulario();
  }


  get formCtrls() {
    return this.modalForm.controls;
  }


  ngOnInit() {
    this.TfnsService.getTelefonos().subscribe(resp => {
      if (resp.success) this.tfnosData = resp.data;
    });
  }


  insertOrUpdateTfno() {
    /* Object.keys(this.modalForm.controls).forEach(key => { //Comprobar errores
      const controlErrors: ValidationErrors | null = this.modalForm.get(key)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    }); */

    const extension = this.formCtrls['extension'];

    if (this.modalForm.value.extension == '') { //Aunque no tiene Validator.required,
      extension.clearValidators();              //sigue saltando el error, así que le quito los Validators.
      extension.setValidators([Validators.pattern(/^[0-9]*$/)]);
      extension.updateValueAndValidity();
      this.modalForm.value.extension = null; // Lo pongo a null para evitar que envíe una cadena vacía.
    }

    if (this.modalForm.valid) {
      this.TfnsService.insertOrUpdateTfno(this.modalForm.value)
        .subscribe(resp => {

          if (resp.success) {
            this.telefono = resp.data;
            const indexTfno = this.tfnosData.findIndex(i => i.id == this.telefono.id);

            if (indexTfno == -1) this.tfnosData.push(this.telefono);
            else this.tfnosData[indexTfno] = this.telefono;

            this.setMensajeExito();

          } else this.setMensajeError();
        });

      this.setTimer(4000);
      this.closeModal.nativeElement.click();
      this.limpiarFormulario();
    }
  }


  setInfoTfn(index: number) {
    const tfno = this.tfnosData[index];
    this.modalForm.patchValue({ id: tfno.id, numero: tfno.numero, extension: tfno.extension });
  }


  deleteTfno(index: number) {
    const tfno = this.tfnosData[index];

    if (tfno) {
      this.TfnsService.deleteTfno(tfno.id)
        .subscribe(resp => {

          if (resp.success) {

            this.tfnosData.splice(this.tfnosData.findIndex(i => i.id == resp.data), 1);
            this.setMensajeExito();

          } else this.setMensajeError();

          this.setTimer(4000);
        });
    }
  }


  crearFormulario() {
    return this.fb.group({
      id: [null],
      numero: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(\(?(\+34|0034|34)\)?[ -]+)?([0-9][ -]*){9}/)
      ])],
      extension: [null, [Validators.pattern(/^[0-9]*$/)]]
    });
  }


  limpiarFormulario() {
    this.modalForm.reset();
  }


  setTimer(tiempo: number) {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.limpiarMensaje(), tiempo);
  }


  limpiarMensaje() {
    this.exito = false;
    this.mensaje = '';
  }


  setMensajeExito() {
    this.exito = true;
    this.mensaje = `Éxito al ${this.accion} el teléfono`;
  }


  setMensajeError() {
    this.exito = false;
    this.mensaje = `Error al ${this.accion} el teléfono`;
  }
}
