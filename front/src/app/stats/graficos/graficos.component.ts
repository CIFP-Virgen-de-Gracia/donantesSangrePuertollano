import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Alta, AltaMostrar, Donacion, DonacionMostrar } from '../interfaces/stats.interface';
import { Chart, ChartDataset, registerables } from 'chart.js';
import * as moment from 'moment';
import { WebsocketService } from 'src/app/shared/services/websocket.service';
moment.locale('es');

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.scss']
})
export class GraficosComponent implements OnInit {

  donacionesResp: Donacion[] = [];
  donacionesMostrar: DonacionMostrar[] = [];
  altasResp: Alta[] = [];
  altasMostrar: AltaMostrar[] = [];
  meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  aniosAltas: string[] = [];
  aniosDonaciones: string[] = [];
  tiposDonacion: string[] = [];
  generos: string[] = [];
  gSanguineos: (string | undefined)[] = [];
  datasetMensDonTipos: { anio: string, datos: ChartDataset<"bar">[] }[] = [];
  datasetAnualDonTipos: ChartDataset<"bar">[] = [];
  datasetMensNumAltas: { anio: string, datos: number[] }[] = [];
  datasetAnualNumAltas: number[] = [];
  datasetAnualGrpSang: { anio: string, datos: number[] }[] = [];
  datasetAnualGenero: { anio: string, datos: number[] }[] = [];
  activoDonTipos: number = 0;
  activoNumAltas: number = 0;
  grafDonTipos?: Chart;
  grafNumAltas?: Chart;
  grafDonGrpSang?: Chart<"pie">;
  grafDonGenero?: Chart<"pie">;
  anioActivoDonTipos: number = 0;
  anioActivoAltas: number = 0;
  anioActivoGeneros: number = 0;
  anioActivoGrpSang: number = 0;


  constructor(private StatsService: StatsService, private SocketService: WebsocketService) {
    Chart.register(...registerables);

    SocketService.insertarDonacion.subscribe(resp => {
      const donacion = this.crearDonacionMostrar(resp.data);
      this.donacionesMostrar.push(donacion);
      this.actualizarDonaciones(donacion);
    })

    SocketService.insertarAltas.subscribe(resp => {
      const altas: Alta[] = resp.data;
      const altasMostrar: AltaMostrar[] = [];

      altas.forEach(alta => {
        const altaMostrar = this.crearAltaMostrar(alta);
        this.altasMostrar.push(altaMostrar);
        altasMostrar.push(altaMostrar)
      });

      this.actualizarAltas(altasMostrar);
    })
  }


  get aniosDonacionesDesc() {
    return this.aniosDonaciones.slice().reverse();
  }


  get aniosAltasDesc() {
    return this.aniosAltas.slice().reverse();
  }


  get donacionesSangre() {
    return this.donacionesMostrar.filter(d => d.donacion == 'sangre');
  }


  ngOnInit() {
    // Altas
    this.StatsService.getAltas().subscribe(resp => {
      if (resp.success) {

        this.altasResp = resp.data;
        this.altasResp.forEach(alta => this.altasMostrar.push(this.crearAltaMostrar(alta)));

        this.aniosAltas = this.getAnios(this.altasMostrar);

        const anio = this.aniosAltas[0];

        const datasetAltas = this.crearDatasetMensNumAltas(anio);
        this.datasetMensNumAltas.push(datasetAltas);
        this.crearGrafNumAltas(this.meses, datasetAltas.datos);
      }
    });

    // Donaciones
    this.StatsService.getDonaciones().subscribe(resp => {
      if (resp.success) {

        this.donacionesResp = resp.data;
        this.donacionesResp.forEach(don => this.donacionesMostrar.push(this.crearDonacionMostrar(don)));

        this.tiposDonacion = this.getDonaciones();
        this.generos = this.getGeneros();
        this.gSanguineos = this.getGrpSanguineos();
        this.aniosDonaciones = this.getAnios(this.donacionesMostrar);

        const anio = this.aniosDonaciones[0];

        if (anio) {
          const datasetDonTipos = this.crearDatasetMensDonTipos(anio);
          this.datasetMensDonTipos.push(datasetDonTipos);
          this.crearGrafDonTipos(this.meses, datasetDonTipos.datos);

          const datasetGrpSang = this.crearDatasetAnualGrpSang(anio);
          this.datasetAnualGrpSang.push(datasetGrpSang);
          this.crearGrafDonGrpSang(datasetGrpSang.datos);

          const datasetGeneros = this.crearDatasetAnualGenero(anio);
          this.datasetAnualGenero.push(datasetGeneros);
          this.crearGrafDonGenero(datasetGeneros.datos);
        }
      }
    });
  }


  crearGrafDonTipos(labels: string[], datos: ChartDataset<"bar">[]) {
    this.grafDonTipos = new Chart('grafDonTipos', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datos
      }
    });
  }


  crearGrafNumAltas(labels: string[], datos: number[]) {
    this.grafNumAltas = new Chart('grafNumAltas', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Altas',
          data: datos
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        }
      }
    })
  }


  crearGrafDonGrpSang(datos: number[]) {
    this.grafDonGrpSang = new Chart('grafDonGrpSang', {
      type: 'pie',
      data: {
        labels: this.gSanguineos,
        datasets: [{
          label: 'Número de donaciones',
          data: datos,
          hoverOffset: 4
        }]
      }
    });
  }


  crearGrafDonGenero(datos: number[]) {
    this.grafDonGenero = new Chart('grafDonGenero', {
      type: 'pie',
      data: {
        labels: this.generos,
        datasets: [{
          label: 'Número de donaciones',
          data: datos,
          hoverOffset: 4
        }]
      }
    });
  }


  crearDatasetAnualGrpSang(anio: string) {
    const dataset: { anio: string, datos: number[] } = { anio: anio, datos: [] };
    const donAnio = this.donacionesSangre.filter(d => d.anio == anio);

    this.gSanguineos.forEach(grupo => {
      dataset.datos.push(donAnio.filter(d => d.gSanguineo == grupo).length);
    });

    return dataset;
  }


  crearDatasetAnualGenero(anio: string) {
    const dataset: { anio: string, datos: number[] } = { anio: anio, datos: [] };
    const donAnio = this.donacionesSangre.filter(d => d.anio == anio);

    this.generos.forEach(genero => {
      dataset.datos.push(donAnio.filter(d => d.genero == genero).length);
    });

    return dataset;
  }


  crearDatasetMensDonTipos(anio: string) {
    const dataset: { anio: string, datos: ChartDataset<"bar">[] } = { anio: anio, datos: [] };
    const donacionesAnioSelecc = this.donacionesMostrar.filter(stat => stat.anio == anio);

    this.tiposDonacion.forEach(tipoDonacion => {
      const numDonacionesMes: number[] = [];
      const donaciones = donacionesAnioSelecc.filter(stat => stat.donacion == tipoDonacion);

      this.meses.forEach(mes => numDonacionesMes.push(donaciones.filter(s => s.mes == mes).length));
      dataset.datos.push({ label: tipoDonacion, data: numDonacionesMes });
    });

    return dataset;
  }


  crearDatasetMensNumAltas(anio: string) {
    const dataset: { anio: string, datos: number[] } = { anio: anio, datos: [] };
    const altasAnioSelecc = this.altasMostrar.filter(alta => alta.anio == anio);

    this.meses.forEach(mes => {
      dataset.datos.push(altasAnioSelecc.filter(alta => alta.mes == mes).length);
    });

    return dataset;
  }


  crearDatasetAnualNumAltas() {
    this.aniosAltasDesc.forEach(anio => {

      this.datasetAnualNumAltas.push(this.altasMostrar.filter(alta => alta.anio == anio).length);
    });
  }


  crearDatasetAnualDonTipos(tipoDonacion: string) {
    const numDonacionesAnio: number[] = [];
    const donaciones = this.donacionesMostrar.filter(stat => stat.donacion == tipoDonacion);

    this.aniosDonacionesDesc.forEach(anio => numDonacionesAnio.push(donaciones.filter(s => s.anio == anio).length));

    return { label: tipoDonacion, data: numDonacionesAnio };
  }


  crearAltaMostrar(alta: Alta) {
    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    const altaMostrar: AltaMostrar = {
      anio: moment(alta.fecha, fechaCompleta).format('YYYY'),
      mes: moment(alta.fecha, fechaCompleta).format('MMMM')
    };

    return altaMostrar;
  }


  crearDonacionMostrar(don: Donacion) {
    const fechaCompleta = "YYYY-MM-DD HH:mm:ss";
    const donacion: DonacionMostrar = {
      donacion: don.donacion,
      anio: moment(don.fecha, fechaCompleta).format('YYYY'),
      mes: moment(don.fecha, fechaCompleta).format('MMMM'),
      genero: don.genero
    };

    if (don.gSanguineo) donacion.gSanguineo = don.gSanguineo;

    return donacion;
  }


  activarDatosMensDonTipos(anio: string) {
    if (this.grafDonTipos) {
      let dataset = this.datasetMensDonTipos.find(ds => ds.anio == anio);

      if (!dataset) {
        dataset = this.crearDatasetMensDonTipos(anio);
        this.datasetMensDonTipos.push(dataset);
        this.datasetMensDonTipos.sort((a, b) => (a.anio > b.anio ? 1 : -1)).reverse();
      }

      if (anio) this.anioActivoDonTipos = this.aniosDonaciones.findIndex(a => a == anio);
      this.grafDonTipos.data.labels = this.meses;
      this.grafDonTipos.data.datasets = dataset.datos;
      this.grafDonTipos.update();
    }
  }


  activarDatosAnualesDonTipos() {
    if (this.grafDonTipos) {
      if (this.datasetAnualDonTipos.length == 0) {

        this.tiposDonacion.forEach(tipoDonacion => {
          const dataset = this.crearDatasetAnualDonTipos(tipoDonacion);

          this.datasetAnualDonTipos.push(dataset);
          this.datasetAnualDonTipos.sort();
        });
      };

      this.grafDonTipos.data.labels = this.aniosDonacionesDesc;
      this.grafDonTipos.data.datasets = this.datasetAnualDonTipos;
      this.grafDonTipos.update();
    }
  }


  activarDatosMensNumAltas(anio: string) {
    if (this.grafNumAltas) {
      let dataset = this.datasetMensNumAltas.find(ds => ds.anio == anio);

      if (!dataset) {
        dataset = this.crearDatasetMensNumAltas(anio);
        this.datasetMensNumAltas.push(dataset);
        this.datasetMensNumAltas.sort((a, b) => (a.anio > b.anio ? 1 : -1)).reverse();
      }

      if (anio) this.anioActivoAltas = this.aniosAltas.findIndex(a => a == anio);
      this.grafNumAltas.data.labels = this.meses;
      this.grafNumAltas.data.datasets[0].data = dataset.datos;
      this.grafNumAltas.update();
    }
  }


  activarDatosAnualesNumAltas() {
    if (this.grafNumAltas) {
      if (this.datasetAnualNumAltas.length == 0) this.crearDatasetAnualNumAltas();

      this.grafNumAltas.data.labels = this.aniosAltasDesc;
      this.grafNumAltas.data.datasets[0].data = this.datasetAnualNumAltas;
      this.grafNumAltas.update();
    }
  }


  cambiarAnioGrupSang(index: number) {
    if (this.grafDonGrpSang) {
      const anio = this.aniosDonaciones[index];
      let dataset = this.datasetAnualGrpSang.find(d => d.anio == anio);

      if (!dataset) {
        dataset = this.crearDatasetAnualGrpSang(anio);
        this.datasetAnualGrpSang.push(dataset);
        this.datasetAnualGrpSang.sort((a, b) => (a.anio > b.anio ? 1 : -1)).reverse();
      }

      this.anioActivoGrpSang = index;
      this.grafDonGrpSang.data.datasets[0].data = dataset.datos;
      this.grafDonGrpSang.update();
    }
  }


  cambiarAnioGeneros(index: number) {
    if (this.grafDonGenero) {
      const anio = this.aniosDonaciones[index];
      let dataset = this.datasetAnualGenero.find(d => d.anio == anio);

      if (!dataset) {
        dataset = this.crearDatasetAnualGenero(anio);
        this.datasetAnualGenero.push(dataset);
        this.datasetAnualGenero.sort((a, b) => (a.anio > b.anio ? 1 : -1)).reverse();
      }

      this.anioActivoGeneros = index;
      this.grafDonGenero.data.datasets[0].data = dataset.datos;
      this.grafDonGenero.update();
    }
  }


  actualizarAltas(altas: AltaMostrar[]) {
    const anioAltas = altas[0].anio;
    const iAnio = this.aniosAltas.findIndex(d => d == anioAltas);

    if (iAnio < 0) {
      if (this.aniosAltas[this.anioActivoAltas] < anioAltas) this.anioActivoAltas++;

      this.aniosAltas.push(anioAltas);
      this.aniosAltas.sort().reverse();
    }

    this.datasetAnualNumAltas = [];
    this.crearDatasetAnualNumAltas(); //Creamos el nuevo dataset anual
    const datasetMensNumAltas = this.crearDatasetMensNumAltas(anioAltas); // Creamos el nuevo dataset mensual
    const iDatasetAnio = this.datasetMensNumAltas.findIndex(d => d.anio == anioAltas);

    // Lo sustituimos si ya existe para ese año
    if (iDatasetAnio >= 0) this.datasetMensNumAltas[iDatasetAnio] = datasetMensNumAltas;

    // Activa opción mensual
    if (this.activoNumAltas == 0 && anioAltas == this.aniosAltas[this.anioActivoAltas]) {
      if (this.grafNumAltas) this.grafNumAltas.destroy();
      this.crearGrafNumAltas(this.meses, datasetMensNumAltas.datos);

      // Activa opción anual
    } else if (this.activoNumAltas == 1) {
      if (this.grafNumAltas) this.grafNumAltas.destroy();
      this.crearGrafNumAltas(this.aniosAltasDesc, this.datasetAnualNumAltas);
    }
  }


  actualizarGrpSang(donacion: DonacionMostrar) {
    if (!this.gSanguineos.includes(donacion.gSanguineo)) this.gSanguineos.push(donacion.gSanguineo);

    const iDataset = this.datasetAnualGrpSang.findIndex(d => d.anio == donacion.anio);

    if (iDataset >= 0 || this.datasetAnualGrpSang.length == 0) {
      const dataset = this.crearDatasetAnualGrpSang(donacion.anio);

      if (iDataset >= 0) this.datasetAnualGrpSang[iDataset] = dataset;
      else this.datasetAnualGrpSang.push(dataset);

      if (donacion.anio == this.aniosDonaciones[this.anioActivoGrpSang]) {
        if (this.grafDonGrpSang) this.grafDonGrpSang.destroy();
        this.crearGrafDonGrpSang(dataset.datos);
      }
    }
  }


  actualizarGeneros(donacion: DonacionMostrar) {
    if (!this.generos.includes(donacion.genero)) this.generos.push(donacion.genero);

    const iDataset = this.datasetAnualGenero.findIndex(d => d.anio == donacion.anio);

    if (iDataset >= 0 || this.datasetAnualGenero.length == 0) {
      const dataset = this.crearDatasetAnualGenero(donacion.anio);

      if (iDataset >= 0) this.datasetAnualGenero[iDataset] = dataset;
      else this.datasetAnualGenero.push(dataset);

      if (donacion.anio == this.aniosDonaciones[this.anioActivoGeneros]) {
        if (this.grafDonGenero) this.grafDonGenero.destroy();
        this.crearGrafDonGenero(dataset.datos);
      }
    }
  }


  actualizarDonTipos(donacion: DonacionMostrar) {
    if (!this.tiposDonacion.includes(donacion.donacion)) this.tiposDonacion.push(donacion.donacion);

    // Dataset mensual
    const datasetDonTiposMens = this.crearDatasetMensDonTipos(donacion.anio);
    const iDatasetMens = this.datasetMensDonTipos.findIndex(d => d.anio == donacion.anio);

    if (iDatasetMens >= 0) this.datasetMensDonTipos[iDatasetMens] = datasetDonTiposMens;
    else this.datasetMensDonTipos.push(datasetDonTiposMens);

    // Dataset anual
    const datasetDonTiposAnual = this.crearDatasetAnualDonTipos(donacion.donacion);
    const iDatasetAnual = this.datasetAnualDonTipos.findIndex(d => d.label == donacion.donacion);

    if (iDatasetAnual >= 0) this.datasetAnualDonTipos[iDatasetAnual] = datasetDonTiposAnual;
    else this.datasetAnualDonTipos.push(datasetDonTiposAnual);

    // Actualizar gráfico
    // Activa opción mensual
    if (this.activoDonTipos == 0 && donacion.anio == this.aniosDonaciones[this.anioActivoDonTipos]) {
      if (this.grafDonTipos) this.grafDonTipos.destroy();
      this.crearGrafDonTipos(this.meses, datasetDonTiposMens.datos);

    // Activa opción anual
    } else if (this.activoDonTipos == 1) {

      if (this.grafDonTipos) this.grafDonTipos.destroy();
      this.crearGrafDonTipos(this.aniosDonacionesDesc, this.datasetAnualDonTipos);
    }
  }


  actualizarDonaciones(donacion: DonacionMostrar) {
    const iAnio = this.aniosDonaciones.findIndex(d => d == donacion.anio);

    if (iAnio < 0) {
      if (this.aniosDonaciones[this.anioActivoGeneros] < donacion.anio) this.anioActivoGeneros++;
      if (this.aniosDonaciones[this.anioActivoGrpSang] < donacion.anio) this.anioActivoGrpSang++;
      if (this.aniosDonaciones[this.anioActivoDonTipos] < donacion.anio) this.anioActivoDonTipos++;

      this.aniosDonaciones.push(donacion.anio);
      this.aniosDonaciones.sort().reverse();
    }

    // Géneros y grupos sanguíneos
    if (donacion.donacion == 'sangre') {
      this.actualizarGrpSang(donacion);
      this.actualizarGeneros(donacion);
    }

    // Tipos de donación
    this.actualizarDonTipos(donacion);
  }

  /*
    actualizarDonaciones(donacion: DonacionMostrar) {
      const iAnio = this.aniosDonaciones.findIndex(d => d == donacion.anio);
      let iDataset = -1;

      if (iAnio >= 0) {
        if (donacion.donacion == 'sangre') {

          // Grupos sanguíneos
          if (!this.gSanguineos.includes(donacion.gSanguineo)) this.gSanguineos.push(donacion.gSanguineo);

          iDataset = this.datasetAnualGrpSang.findIndex(d => d.anio == donacion.anio);
          if (iDataset >= 0) {
            const datasetGrpSang = this.crearDatasetAnualGrpSang(donacion.anio);
            this.datasetAnualGrpSang[iDataset] = datasetGrpSang;

            if (donacion.anio == this.aniosDonaciones[this.anioActivoGrpSang]) {
              this.grafDonGrpSang?.destroy();
              this.crearGrafDonGrpSang(datasetGrpSang.datos);
            }
          }

          // Géneros
          if (!this.generos.includes(donacion.genero)) this.generos.push(donacion.genero);

          iDataset = this.datasetAnualGenero.findIndex(d => d.anio == donacion.anio);
          if (iDataset >= 0) {
            const datasetGeneros = this.crearDatasetAnualGenero(donacion.anio);
            this.datasetAnualGenero[iDataset] = datasetGeneros;

            if (donacion.anio == this.aniosDonaciones[this.anioActivoGeneros]) {
              this.grafDonGenero?.destroy();
              this.crearGrafDonGenero(datasetGeneros.datos);
            }
          }
        }

        // Tipos de donación
        if (!this.tiposDonacion.includes(donacion.donacion)) this.tiposDonacion.push(donacion.donacion);

        const iDatasetMens = this.datasetMensDonTipos.findIndex(d => d.anio == donacion.anio);
        if (iDatasetMens >= 0) {
          const datasetDonTiposMens = this.crearDatasetMensDonTipos(donacion.anio);
          this.datasetMensDonTipos[iDatasetMens] = datasetDonTiposMens;
        }

        const iDatasetAnual = this.datasetAnualDonTipos.findIndex(d => d.label == donacion.donacion);
        const datasetDonTiposAnual = this.crearDatasetAnualDonTipos(donacion.donacion);

        if (iDatasetAnual >= 0) this.datasetAnualDonTipos[iDatasetAnual] = datasetDonTiposAnual;
        else if (this.datasetAnualDonTipos.length != 0) {
          this.datasetAnualDonTipos.push(datasetDonTiposAnual);
          this.datasetAnualDonTipos.sort();
        }

        if (this.grafDonTipos) {
          const grafLabels = this.grafDonTipos.data.labels

          if (grafLabels?.toString() == this.meses.toString()) { // Activa opción mensual

            if (donacion.anio == this.aniosDonaciones[this.anioActivoDonTipos]) {
              this.grafDonTipos.destroy();
              this.crearGrafDonTipos(this.meses, this.datasetMensDonTipos[iDatasetMens].datos);
            }

          } else { // Activa opción anual
            this.grafDonTipos.destroy();
            this.crearGrafDonTipos(this.aniosDonacionesDesc, this.datasetAnualDonTipos);
          }
        }
      } else {
        if (this.aniosDonaciones[this.anioActivoGeneros] < donacion.anio) this.anioActivoGeneros++;
        if (this.aniosDonaciones[this.anioActivoGrpSang] < donacion.anio) this.anioActivoGrpSang++;

        this.aniosDonaciones.push(donacion.anio);
        this.aniosDonaciones.sort().reverse();

        if (this.grafDonTipos!.data.labels?.toString() != this.meses.toString()) {
          this.datasetAnualDonTipos = [];
          this.tiposDonacion.forEach(tipoDonacion => {
            const dataset = this.crearDatasetAnualDonTipos(tipoDonacion);
            this.datasetAnualDonTipos.push(dataset);
            this.datasetAnualDonTipos.sort();
          });

          this.grafDonTipos?.destroy();
          this.crearGrafDonTipos(this.aniosDonacionesDesc, this.datasetAnualDonTipos);
        }
      }
    } */


  getDonaciones() {
    return [...new Set(this.donacionesMostrar.map(stat => stat.donacion))];
  }


  getGeneros() {
    const generos = [...new Set(this.donacionesMostrar.map(stat => stat.genero))];
    return generos.filter(gen => gen != undefined);
  }


  getGrpSanguineos() {
    const grupos = [...new Set(this.donacionesMostrar.map(stat => stat.gSanguineo))].sort();
    return grupos.filter(grp => grp != undefined);
  }


  getAnios(datos: any[]) {
    return [...new Set(datos.map(d => d.anio))];
  }
}
