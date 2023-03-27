import { Time } from '@angular/common';
import { Component } from '@angular/core';
import { Dia, Direccion, Horario, HorarioMostrar, Telefono, Hora, HorarioGuardar } from '../interfaces/config.interface';
import { ConfigService } from '../services/config.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { diaSeleccionado, mismaHora } from '../validators/valores-horas.validator';

@Component({
  selector: 'app-contacto-config',
  templateUrl: './contacto-config.component.html',
  styleUrls: ['./contacto-config.component.scss']
})
export class ContactoConfigComponent { //Todo hecho por Alicia

  /* dias!: FormArray; */
  contactoForm!: FormGroup;
  mensaje: String = '';
  actualizado!: boolean;
  telefonosData: Telefono[] = [];
  tBorrar: number[] = [];
  direccionesData: Direccion[] = [];
  horariosData: Horario[] = [];
  hMostrar: HorarioMostrar[] = [];
  hBorrar: number[] = [];
  dSemana = [{ nombre: "Lunes", letra: "L" }, { nombre: "Martes", letra: "M" }, { nombre: "Miércoles", letra: "X" },
  { nombre: "Jueves", letra: "J" }, { nombre: "Viernes", letra: "V" }, { nombre: "Sábado", letra: "S" }];

  constructor(
    private fb: FormBuilder,
    private ConfigService: ConfigService,
    private SharedService: SharedService
  ) { }


  get horarios() {
    return this.contactoForm.controls["horarios"] as FormArray;
  }


  getDiasHorario(index: number) {
    return this.horarios.at(index).get("dias") as FormArray;
  }


  get telefonos() {
    return this.contactoForm.controls["telefonos"] as FormArray;
  }


  get direcciones() {
    return this.contactoForm.controls["direcciones"] as FormArray;
  }


  ngOnInit() {
    this.contactoForm = this.fb.group({
      horarios: this.fb.array([], mismaHora()),
      telefonos: this.fb.array([]),
      direcciones: this.fb.array([])
    });

    this.getHorarios();
    this.getTlfns();
    this.getDirs();
  }


  guardar() {
    if (this.contactoForm.valid) {

      const datos = this.contactoForm.value;
      const tlfns = { guardar: datos.telefonos, borrar: this.tBorrar };
      const horarios = this.crearHorarioGuardar(datos.horarios);

      this.ConfigService.updateContacto(datos.direcciones, tlfns, horarios)
        .subscribe(resp => {

          this.mensaje = resp.msg;
          this.actualizado = (resp.success) ? true : false;
         /*  window.location.reload() */
          setTimeout(() => this.mensaje = '', 4000);
        });

    } else {

      this.actualizado = false;
      this.mensaje = 'Datos no válidos';
    }
  }


  //HORARIOS
  addHorario() {
    const listaDias = this.crearSemana();

    this.horarios.push(this.crearHorario(listaDias));
  }


  crearSemana() {
    let listaDias: FormArray = this.fb.array([], diaSeleccionado());

    this.dSemana.forEach(dia => {
      listaDias.push(this.crearDia(dia.nombre, dia.letra, false));
    });

    return listaDias;
  }


  deleteHorario(index: number) {
    const horario = this.horarios.value[index];

    horario.dias.map((d: Dia) => { if (d.id != -1) this.hBorrar.push(d.id) });
    this.horarios.removeAt(horario.id);
  }


  crearHorarioGuardar(horarios: HorarioMostrar[]) {
    let hGuardar: Horario[] = [];

    horarios.forEach(horario => {
      horario.dias.forEach(d => {

        if (d.seleccionado) {
          hGuardar.push({
            id: d.id,
            dia: d.nombre,
            hEntrada: horario.hEntrada,
            hSalida: horario.hSalida,
          });

        } else if (d.id != -1) this.hBorrar.push(d.id);
      })
    });

    return { guardar: hGuardar, borrar: this.hBorrar };
  }


  crearHorarioMostrar() {
    let horas: Hora[] = []; // Horas de entrada y de salida de cada horario.
    let diasHora: Horario[] = [];
    let listaDias: Dia[]; //Días de un horario concreto.
    let idDia: number | undefined;
    let selecc: boolean;

    this.horariosData.forEach(horario => { // Recojo los distintos grupos de horas
      if (!horas.find(h => h.entrada == horario.hEntrada && h.salida == horario.hSalida))
        horas.push({ "entrada": horario.hEntrada, "salida": horario.hSalida });
    });

    horas.forEach(hora => { // Recojo los días que tienen ese grupo de horas
      listaDias = [];
      diasHora = this.horariosData.filter(h => h.hEntrada == hora.entrada && h.hSalida == hora.salida);

      this.dSemana.forEach(dia => {
        idDia = diasHora.find(d => d.dia == dia.nombre)?.id;
        selecc = (diasHora.find(d => d.dia == dia.nombre)) ? true : false;
        listaDias.push(this.crearDiaMostrar(dia.nombre, dia.letra, selecc, idDia));
      });

      this.addHorarioMostrar(listaDias, hora.entrada, hora.salida);
    });
  }


  addHorarioMostrar(listaDias: Dia[], entrada: Time = { hours: 0, minutes: 0 }, salida: Time = { hours: 0, minutes: 0 }) {
    this.hMostrar.push({
      dias: listaDias,
      hEntrada: entrada,
      hSalida: salida
    });
  }


  crearDiaMostrar(nombre: string, letra: string, selecc: boolean, id: number = -1) {
    return {
      id: id,
      nombre: nombre,
      letra: letra,
      seleccionado: selecc
    }
  }


  crearHorario(dias: FormArray, id: number = this.horarios.length) {
    return this.fb.group({
      id: id,
      dias: dias,
      hEntrada: ['00:00', Validators.required],
      hSalida: ['00:00', Validators.required],
    });
  }


  crearDia(nombre: String = '', letra: String = '', selecc: boolean = false) {
    return this.fb.group({
      id: [-1, Validators.required],
      nombre: [nombre],
      letra: [letra],
      seleccionado: [selecc]
    })
  }


  getHorarios() {
    let listaDias: FormArray;

    this.SharedService.getHorarios().subscribe(resp => {
      if (resp.success) {
        this.horariosData = resp.data;
        this.crearHorarioMostrar();

        for (let i = 0; i < this.hMostrar.length; i++) {
          listaDias = this.crearSemana();
          this.horarios.push(this.crearHorario(listaDias, i));
        }

        this.horarios.patchValue(this.hMostrar);
      }
    });
  }


  //TELÉFONOS
  addTelefono() {
    this.telefonos.push(this.crearTlfn());
  }


  deleteTelefono(index: number) {
    const id = this.telefonos.value[index].id;

    this.telefonos.removeAt(index);
    this.tBorrar.push(id);
  }


  crearTlfn() {
    return this.fb.group({
      id: [-1, Validators.required],
      numero: ['', Validators.compose([
        Validators.required,
        Validators.pattern("((\\(?\\+34|0034|34)\\)?[ -]?)?([0-9][ -]*){9}")
      ])],
      extension: ['', Validators.pattern("[0-9]*")],
    })
  }


  getTlfns() {
    this.SharedService.getTelefonos().subscribe(resp => {
      if (resp.success) {
        this.telefonosData = resp.data;

        for (let i = 0; i < this.telefonosData.length; i++) {
          this.addTelefono();
        }

        this.telefonos.patchValue(this.telefonosData);
      }
    });
  }


  //DIRECCIONES
  getDirs() {
    this.SharedService.getDirecciones().subscribe(resp => {
      if (resp.success) {
        this.direccionesData = resp.data;

        for (let i = 0; i < this.direccionesData.length; i++) {
          this.direcciones.push(this.fb.group({
            id: ['', Validators.required],
            lugar: ['', Validators.required],
            calle: ['', Validators.required],
            numero: ['', Validators.min(0)],
            ciudad: ['', Validators.required],
            provincia: ['', Validators.required],
            cp: ['', Validators.compose([
              Validators.required,
              Validators.pattern("[0-9]{5}")
            ])]
          }));
        }

        this.direcciones.patchValue(this.direccionesData);
      }
    });
  }
}

