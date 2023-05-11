import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Alta, AltaMostrar, Donacion, DonacionMostrar } from '../interfaces/stats.interface';
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
  donacionesMostrar: DonacionMostrar[] = [];
  altasResp: Alta[] = [];
  altasMostrar: AltaMostrar[] = [];
  meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  aniosAltas: string[] = [];
  aniosDonaciones: string[] = [];
  tiposDonacion: string[] = [];
  generos: string[] = [];
  gSanguineos: (string | undefined)[] = [];
  datasetsMensDonTipos: { anio: string, datos: ChartDataset<"bar">[] }[] = [];
  datasetsAnualDonTipos: ChartDataset<"bar">[] = [];
  datasetsMensNumAltas: { anio: string, datos: number[] }[] = [];
  datasetsAnualNumAltas: number[] = [];
  datasetAnualGrpSang: { anio: string, datos: number[] }[] = [];
  datasetAnualGenero: { anio: string, datos: number[] }[] = [];
  activoDonTipos: number = 0;
  activoNumAltas: number = 0;
  activoGrupSang: number = 0;
  activoGeneros: number = 0;
  grafDonTipos?: Chart;
  grafNumAltas?: Chart;
  grafDonGrpSang?: Chart<"pie">;
  grafDonGenero?: Chart<"pie">;


  constructor(private StatsService: StatsService) {
    Chart.register(...registerables);
  }


  ngOnInit() {
    this.StatsService.getAltas().subscribe(resp => {
      if (resp.success) {
        this.altasResp = resp.data;
        this.crearAltasMostrar();

        this.aniosAltas = this.getAnios(this.altasMostrar);
        this.crearGrafNumAltas();
      }
    });

    this.StatsService.getDonaciones().subscribe(resp => {
      if (resp.success) {

        this.donacionesResp = resp.data;
        this.crearDonacionesMostrar();

        this.tiposDonacion = this.getDonaciones();
        this.generos = this.getGeneros();
        this.gSanguineos = this.getGrpSanguineos();
        this.aniosDonaciones = this.getAnios(this.donacionesMostrar);

        this.crearGrafDonTipos();
        this.crearGrafDonGrpSang();
        this.crearGrafDonGenero();
      }
    });
  }


  crearGrafDonTipos() {
    const dataset = this.crearDatasetsMensDonTipos(this.aniosDonaciones[0]);

    this.grafDonTipos = new Chart('grafDonTipos', {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: dataset.datos
      }
    });
  }


  crearGrafNumAltas() {
    const dataset = this.crearDatasetsMensNumAltas(this.aniosAltas[0]);

    this.grafNumAltas = new Chart('grafNumAltas', {
      type: 'line',
      data: {
        labels: this.meses,
        datasets: [{
          label: 'Altas',
          data: dataset!.datos
        }]
      },
      options: {
        plugins: {
          legend: { display: false }
        }
      }
    })
  }


  crearGrafDonGrpSang() {
    const dataset = this.crearDatasetAnualGrpSang(this.aniosDonaciones[0]);

    this.grafDonGrpSang = new Chart('grafDonGrpSang', {
      type: 'pie',
      data: {
        labels: this.gSanguineos,
        datasets: [{
          label: 'Número de donaciones',
          data: dataset.datos,
          hoverOffset: 4
        }]
      }
    });
  }


  crearGrafDonGenero() {
    const dataset = this.crearDatasetAnualGenero(this.aniosDonaciones[0]);

    this.grafDonGenero = new Chart('grafDonGenero', {
      type: 'pie',
      data: {
        labels: this.generos,
        datasets: [{
          label: 'Número de donaciones',
          data: dataset.datos,
          hoverOffset: 4
        }]
      }
    });
  }


  crearDatasetAnualGrpSang(anio: string) {
    const dataset: { anio: string, datos: number[] } = { anio: anio, datos: [] };
    const donAnio = this.donacionesMostrar.filter(stat => stat.anio == anio);

    this.gSanguineos.forEach(grupo => {
      dataset.datos.push(donAnio.filter(stat => stat.gSanguineo == grupo).length);
    });

    this.datasetAnualGrpSang.push(dataset);

    return dataset;
  }


  crearDatasetAnualGenero(anio: string) {
    const dataset: { anio: string, datos: number[] } = { anio: anio, datos: [] };
    const donAnio = this.donacionesMostrar.filter(stat => stat.anio == anio);

    this.generos.forEach(genero => {
      dataset.datos.push(donAnio.filter(stat => stat.genero == genero).length);
    });

    this.datasetAnualGenero.push(dataset);

    return dataset;
  }


  crearDatasetsMensDonTipos(anio: string) {
    const dataset: { anio: string, datos: ChartDataset<"bar">[] } = { anio: anio, datos: [] };
    const donacionesAnioSelecc = this.donacionesMostrar.filter(stat => stat.anio == anio);

    this.tiposDonacion.forEach(tipoDonacion => {
      const numDonacionesMes: number[] = [];
      const donaciones = donacionesAnioSelecc.filter(stat => stat.donacion == tipoDonacion);

      this.meses.forEach(mes => numDonacionesMes.push(donaciones.filter(s => s.mes == mes).length));
      dataset.datos.push({ label: tipoDonacion, data: numDonacionesMes });
    });

    this.datasetsMensDonTipos.push(dataset);

    return dataset;
  }


  crearDatasetsMensNumAltas(anio: string) {
    const dataset: { anio: string, datos: number[] } = { anio: anio, datos: [] };
    const altasAnioSelecc = this.altasMostrar.filter(alta => alta.anio == anio);

    this.meses.forEach(mes => {
      dataset.datos.push(altasAnioSelecc.filter(alta => alta.mes == mes).length);
    });

    this.datasetsMensNumAltas.push(dataset);

    return dataset;
  }


  crearDatasetsAnualNumAltas() {
    this.aniosAltas.forEach(anio => {
      this.datasetsAnualNumAltas.push(this.altasMostrar.filter(alta => alta.anio == anio).length);
    });
  }


  crearDatasetsAnualDonTipos() {
    this.tiposDonacion.forEach(tipoDonacion => {
      const numDonacionesAnio: number[] = [];
      const donaciones = this.donacionesMostrar.filter(stat => stat.donacion == tipoDonacion);

      this.aniosDonaciones.forEach(anio => numDonacionesAnio.push(donaciones.filter(s => s.anio == anio).length));
      this.datasetsAnualDonTipos.push({ label: tipoDonacion, data: numDonacionesAnio });
    });
  }


  crearAltasMostrar() {
    this.altasResp.forEach(alta => {
      const fechaCompleta = "YYYY-MM-DD HH:mm:ss";

      const altaMostrar: AltaMostrar = {
        anio: moment(alta.fecha, fechaCompleta).format('YYYY'),
        mes: moment(alta.fecha, fechaCompleta).format('MMMM')
      };

      this.altasMostrar.push(altaMostrar);
    });
  }


  crearDonacionesMostrar() {
    this.donacionesResp.forEach(don => {
      const fechaCompleta = "YYYY-MM-DD HH:mm:ss";

      const donacion: DonacionMostrar = {
        donacion: don.donacion,
        anio: moment(don.fecha, fechaCompleta).format('YYYY'),
        mes: moment(don.fecha, fechaCompleta).format('MMMM'),
        genero: don.genero
      };

      if (don.gSanguineo) donacion.gSanguineo = don.gSanguineo;

      this.donacionesMostrar.push(donacion);
    });
  }


  activarDatosMensDonTipos(anio: string) {
    if (this.grafDonTipos) {
      let dataset = this.datasetsMensDonTipos.find(ds => ds.anio == anio);

      if (!dataset) dataset = this.crearDatasetsMensDonTipos(anio);

      this.grafDonTipos.data.labels = this.meses;
      this.grafDonTipos.data.datasets = dataset.datos;

      this.grafDonTipos.update();
    }
  }


  activarDatosAnualesDonTipos() {
    if (this.grafDonTipos) {
      if (this.datasetsAnualDonTipos.length == 0) this.crearDatasetsAnualDonTipos();

      this.grafDonTipos.data.labels = this.aniosDonaciones;
      this.grafDonTipos.data.datasets = this.datasetsAnualDonTipos;

      this.grafDonTipos.update();
    }
  }


  activarDatosMensNumAltas(anio: string) {
    if (this.grafNumAltas) {
      let dataset = this.datasetsMensNumAltas.find(ds => ds.anio == anio);

      if (!dataset) dataset = this.crearDatasetsMensNumAltas(anio);

      this.grafNumAltas.data.labels = this.meses;
      this.grafNumAltas.data.datasets[0].data = dataset.datos;

      this.grafNumAltas.update();
    }
  }


  activarDatosAnualesNumAltas() {
    if (this.grafNumAltas) {
      if (this.datasetsAnualNumAltas.length == 0) this.crearDatasetsAnualNumAltas();

      this.grafNumAltas.data.labels = this.aniosAltas;
      this.grafNumAltas.data.datasets[0].data = this.datasetsAnualNumAltas;

      this.grafNumAltas.update();
    }
  }


  cambiarAnioGrupSang(index: number) {
    if (this.grafDonGrpSang) {
      const anio = this.aniosDonaciones[index];
      let dataset = this.datasetAnualGrpSang.find(d => d.anio == anio);

      if (!dataset) dataset = this.crearDatasetAnualGrpSang(anio);

      this.grafDonGrpSang.data.datasets[0].data = dataset.datos;
      this.grafDonGrpSang.update();
    }
  }


  cambiarAnioGeneros(index: number) {
    if (this.grafDonGenero) {
      const anio = this.aniosDonaciones[index];
      let dataset = this.datasetAnualGenero.find(d => d.anio == anio);

      if (!dataset) dataset = this.crearDatasetAnualGenero(anio);

      this.grafDonGenero.data.datasets[0].data = dataset.datos;
      this.grafDonGenero.update();
    }
  }


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
