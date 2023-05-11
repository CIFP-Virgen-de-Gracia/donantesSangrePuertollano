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
  datasetsMensDonTipos: ChartDataset<"bar">[] = [];
  datasetsAnualDonTipos: ChartDataset<"bar">[] = [];
  datasetsMensNumAltas: number[] = [];
  datasetsAnualNumAltas: number[] = [];
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
  }


  crearGrafDonTipos() {
    this.crearDatasetsMensDonTipos(this.aniosDonaciones[0]);

    this.grafDonTipos = new Chart('grafDonTipos', {
      type: 'bar',
      data: {
        labels: this.meses,
        datasets: this.datasetsMensDonTipos
      }
    });
  }


  crearGrafNumAltas() {
    this.crearDatasetsMensNumAltas(this.aniosAltas[0]);

    this.grafNumAltas = new Chart('grafNumAltas', {
      type: 'line',
      data: {
        labels: this.meses,
        datasets: [{
          label: 'Altas',
          data: this.datasetsMensNumAltas
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
    this.grafDonGrpSang = new Chart('grafDonGrpSang', {
      type: 'pie',
      data: {
        labels: this.gSanguineos,
        datasets: [{
          label: 'Número de donaciones',
          data: this.crearDatasetAnualGrpSang(this.aniosDonaciones[0]),
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
          data: this.crearDatasetAnualGenero(this.aniosDonaciones[0]),
          hoverOffset: 4
        }]
      }
    });
  }


  crearDatasetAnualGrpSang(anio: string) {
    let dataset = this.datasetAnualGrpSang.find(d => d.anio == anio)?.datos;

    if (!dataset) {
      dataset = [];
      const donAnio = this.donacionesMostrar.filter(stat => stat.anio == anio);

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
      const donAnio = this.donacionesMostrar.filter(stat => stat.anio == anio);

      this.generos.forEach(genero => {
        dataset!.push(donAnio.filter(stat => stat.genero == genero).length);
      });

      this.datasetAnualGenero.push({ anio: anio, datos: dataset });
    }

    return dataset;
  }


  crearDatasetsMensDonTipos(anio: string) {
    this.datasetsMensDonTipos = [];
    const donacionesAnioSelecc = this.donacionesMostrar.filter(stat => stat.anio == anio);

    this.tiposDonacion.forEach(tipoDonacion => {
      const numDonacionesMes: number[] = [];
      const donaciones = donacionesAnioSelecc.filter(stat => stat.donacion == tipoDonacion);

      this.meses.forEach(mes => numDonacionesMes.push(donaciones.filter(s => s.mes == mes).length));
      this.datasetsMensDonTipos.push({ label: tipoDonacion, data: numDonacionesMes });
    });
  }


  crearDatasetsMensNumAltas(anio: string) {
    this.datasetsMensNumAltas = [];
    const altasAnioSelecc = this.altasMostrar.filter(alta => alta.anio == anio);

    this.meses.forEach(mes => {
      this.datasetsMensNumAltas.push(altasAnioSelecc.filter(alta => alta.mes == mes).length);
    });
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


  activarDatosMensDonTipos() {
    if (this.grafDonTipos) {
      this.grafDonTipos.data.labels = this.meses;
      this.grafDonTipos.data.datasets = this.datasetsMensDonTipos;

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


  activarDatosMensNumAltas() {
    if (this.grafNumAltas) {
      this.grafNumAltas.data.labels = this.meses;
      this.grafNumAltas.data.datasets[0].data = this.datasetsMensNumAltas;

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
      this.grafDonGrpSang.data.datasets[0].data = this.crearDatasetAnualGrpSang(this.aniosDonaciones[index]);
      this.grafDonGrpSang.update();
    }
  }


  cambiarAnioGeneros(index: number) {
    if (this.grafDonGenero) {
      this.grafDonGenero.data.datasets[0].data = this.crearDatasetAnualGenero(this.aniosDonaciones[index]);
      this.grafDonGenero.update();
    }
  }


  getDonaciones() {
    return [...new Set(this.donacionesMostrar.map(stat => stat.donacion))];
  }


  getGeneros() {
    return [...new Set(this.donacionesMostrar.map(stat => stat.genero))];
  }


  getGrpSanguineos() {
    let grupos = [...new Set(this.donacionesMostrar.map(stat => stat.gSanguineo))].sort();

    return grupos.filter(grp => grp != undefined);
  }


  getAnios(datos: any[]) {
    return [...new Set(datos.map(d => d.anio))];
  }
}
