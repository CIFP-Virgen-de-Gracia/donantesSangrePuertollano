import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Donacion, StatMostrar } from '../interfaces/stats.interface';
import { Chart, ChartDataset, registerables } from 'chart.js';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss']
})
export class MainStatsComponent implements OnInit {

  donacionesResp: Donacion[] = [];
  statsMostrar: StatMostrar[] = [];
  meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  anios: string[] = [];
  tiposDonacion: string[] = [];
  generos: string[] = [];
  gSanguineos: (string | undefined)[] = [];
  datasetsMensDonTipos: ChartDataset<"bar">[] = [];
  datasetsAnualDonTipos: ChartDataset<"bar">[] = [];
  datasetsMensNumAltas: ChartDataset<"bar">[] = [];
  datasetsAnualNumAltas: ChartDataset<"bar">[] = [];
  datasetAnualGrpSang: { anio: string, datos: number[] }[] = [];
  datasetAnualGenero: { anio: string, datos: number[] }[] = [];
  activoDonTipos: number = 0;
  activoNumAltas: number = 0;
  activoGrupSang: number = 0;
  activoGeneros: number = 0;
  /* graficos: { id: string, grafico: Chart<any> }[] = []; */
  grafDonTipos?: Chart;
  grafNumAltas?: Chart;
  grafDonGrpSang?: Chart<"pie">;
  grafDonGenero?: Chart<"pie">;


  constructor(private StatsService: StatsService) {
    Chart.register(...registerables);
  }


  /* get grafDonTipos() {
    return this.graficos.find(g => g.id == 'grafDonTipos');
  }


  get grafDonGrpSang() {
    return this.graficos.find(g => g.id == 'grafDonGrpSang');
  }


  get grafDonGenero() {
    return this.graficos.find(g => g.id == 'grafDonGenero');
  }


  get grafNumAltas() {
    return this.graficos.find(g => g.id == 'grafNumAltas');
  } */


  ngOnInit() {
    this.StatsService.getDonaciones().subscribe(resp => {
      if (resp.success) {

        this.donacionesResp = resp.data;
        this.crearStatsMostrar();

        this.tiposDonacion = this.getDonaciones();
        this.generos = this.getGeneros();
        this.gSanguineos = this.getGrpSanguineos();
        this.anios = this.getAnios();

        /* this.graficos.push (
          this.crearGrafDonTipos(),
          this.crearGrafDonGrpSang(),
          this.crearGrafDonGenero()
        ); */

        this.crearGrafDonTipos();
        this.crearGrafDonGrpSang();
        this.crearGrafDonGenero();
      }
    });

    this.StatsService.getNumAltas().subscribe(resp => {
      this.crearGrafNumAltas();
      /* this.graficos.push(this.crearGrafNumAltas()); */
    });
  }


  crearGrafDonTipos() {
    this.crearDatasetsMensDonTipos(this.anios[0]);

    this.grafDonTipos = new Chart('grafDonTipos', {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: this.datasetsMensDonTipos
      }
    });
  }


  crearGrafNumAltas() {
    return {
      id: 'grafNumAltas', grafico: new Chart('grafNumAltas', {
        type: 'line',
        data: {
          labels: this.meses,
          datasets: [{
            data: [2, 5, 35, 6, 1, 0, 25, 32, 1, 63, 12, 3]
          }]
        },
        options: {
          plugins: {
            legend: { display: false }
          }
        }
      })
    }
  }


  crearGrafDonGrpSang() {
    this.grafDonGrpSang = new Chart('grafDonGrpSang', {
      type: 'pie',
      data: {
        labels: this.gSanguineos,
        datasets: [{
          label: 'Número de donaciones',
          data: this.crearDatasetAnualGrpSang(this.anios[0]),
          hoverOffset: 4
        }]
      }
    });
  }


  crearGrafDonGenero() {
    this.grafDonGenero = new Chart('grafDonGenero', {
      type: 'pie',
      data: {
        labels: this.generos,
        datasets: [{
          label: 'Número de donaciones',
          data: this.crearDatasetAnualGenero(this.anios[0]),
          hoverOffset: 4
        }]
      }
    });
  }


  crearDatasetAnualGrpSang(anio: string) {
    let dataset = this.datasetAnualGrpSang.find(d => d.anio == anio)?.datos;

    if (!dataset) {
      dataset = [];
      const donAnio = this.statsMostrar.filter(stat => stat.anio == anio);

      this.gSanguineos.forEach(grupo => {
        dataset!.push(donAnio.filter(stat => stat.gSanguineo == grupo).length);
      });

      this.datasetAnualGrpSang.push({ anio: anio, datos: dataset });
    }

    return dataset;
  }


  crearDatasetAnualGenero(anio: string) {
    let dataset = this.datasetAnualGenero.find(d => d.anio == anio)?.datos;

    if (!dataset) {
      dataset = [];
      const donAnio = this.statsMostrar.filter(stat => stat.anio == anio);

      this.generos.forEach(genero => {
        dataset!.push(donAnio.filter(stat => stat.genero == genero).length);
      });

      this.datasetAnualGenero.push({ anio: anio, datos: dataset });
    }

    return dataset;
  }


  crearDatasetsMensDonTipos(anio: string) {
    this.datasetsMensDonTipos = [];
    const donacionesAnioSelecc = this.statsMostrar.filter(stat => stat.anio == anio);

    this.tiposDonacion.forEach(tipoDonacion => {
      const numDonacionesMes: number[] = [];
      const donaciones = donacionesAnioSelecc.filter(stat => stat.donacion == tipoDonacion);

      this.meses.forEach(mes => numDonacionesMes.push(donaciones.filter(s => s.mes == mes).length));
      this.datasetsMensDonTipos.push({ label: tipoDonacion, data: numDonacionesMes });
    });
  }


  crearDatasetsMensNumAltas(anio: string) {
  }


  crearDatasetsAnualDonTipos() {
    this.tiposDonacion.forEach(tipoDonacion => {
      const numDonacionesAnio: number[] = [];
      const donaciones = this.statsMostrar.filter(stat => stat.donacion == tipoDonacion);

      this.anios.forEach(anio => numDonacionesAnio.push(donaciones.filter(s => s.anio == anio).length));
      this.datasetsAnualDonTipos.push({ label: tipoDonacion, data: numDonacionesAnio });
    });
  }


  crearStatsMostrar() {
    this.donacionesResp.forEach(don => {
      const fechaCompleta = "YYYY-MM-DD HH:mm:ss";

      const donacion: StatMostrar = {
        donacion: don.donacion,
        anio: moment(don.fecha, fechaCompleta).format('YYYY'),
        mes: moment(don.fecha, fechaCompleta).format('MMMM'),
        genero: don.genero
      };

      if (don.gSanguineo) donacion.gSanguineo = don.gSanguineo;

      this.statsMostrar.push(donacion);
    });
  }


  activarDatosMensDonTipos() {
    console.log('mensuales')
    if (this.grafDonTipos) {
      this.grafDonTipos.data.labels = this.meses;
      this.grafDonTipos.data.datasets = this.datasetsMensDonTipos;

      this.grafDonTipos.update();
    }
  }


  activarDatosAnualesDonTipos() {
    if (this.grafDonTipos) {
      if (this.datasetsAnualDonTipos.length == 0) this.crearDatasetsAnualDonTipos();

      this.grafDonTipos.data.labels = this.anios;
      this.grafDonTipos.data.datasets = this.datasetsAnualDonTipos;

      this.grafDonTipos.update();
    }
  }


  activarDatosMensNumAltas() {

  }


  activarDatosAnualesNumAltas() {

  }


  cambiarAnioNumAltas(anio: string) {
    if (this.grafNumAltas) {
      this.crearDatasetsMensNumAltas(anio);
      this.activarDatosMensNumAltas();
    }
  }


  cambiarAnioDonTipos(anio: string) {
    console.log('cambiar anio')
    if (this.grafDonTipos) {
      this.crearDatasetsMensDonTipos(anio);
      this.activarDatosMensDonTipos();
    }
  }


  cambiarAnioGrupSang(index: number) {
    if (this.grafDonGrpSang) {
      this.grafDonGrpSang.data.datasets[0].data = this.crearDatasetAnualGrpSang(this.anios[index]);
      this.grafDonGrpSang.update();
    }
  }


  cambiarAnioGeneros(index: number) {
    if (this.grafDonGenero) {
      this.grafDonGenero.data.datasets[0].data = this.crearDatasetAnualGenero(this.anios[index]);
      this.grafDonGenero.update();
    }
  }


  getDonaciones() {
    return [...new Set(this.statsMostrar.map(stat => stat.donacion))];
  }


  getGeneros() {
    return [...new Set(this.statsMostrar.map(stat => stat.genero))];
  }


  getGrpSanguineos() {
    let grupos = [...new Set(this.statsMostrar.map(stat => stat.gSanguineo))].sort();

    return grupos.filter(grp => grp != undefined);
  }


  getAnios() {
    return [...new Set(this.statsMostrar.map(stat => stat.anio))];
  }
}
