import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { Stat, StatMostrar } from '../interfaces/stats.interface';
import { Chart, ChartDataset, registerables } from 'chart.js';
import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-main-stats',
  templateUrl: './main-stats.component.html',
  styleUrls: ['./main-stats.component.scss']
})
export class MainStatsComponent implements OnInit {

  statsResp: Stat[] = [];
  statsMostrar: StatMostrar[] = [];
  grafico?: Chart;
  meses: string[] = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  anios: string [] = [];
  tiposDonacion: string[] = [];
  generos: string[] = [];
  gruposSang: string[] = [];
  datasetsMensuales: ChartDataset<"bar">[] = [];
  datasetsAnuales: ChartDataset<"bar">[] = [];

  constructor(private StatsService: StatsService) {
    Chart.register(...registerables);
  }


  ngOnInit() {
    console.time('Execution Time 1');
    this.StatsService.getDonaciones()
    .subscribe(resp => {
      if (resp.success) {

        this.statsResp = resp.data;

        this.crearStatsMostrar();

        this.tiposDonacion = this.getDonaciones();
        this.generos = this.getGeneros();
        this.gruposSang = this.getGruposSang();
        this.anios = this.getAnios();

        this.crearDatasets();
        this.grafico = new Chart('grafico', {
          type: 'bar',
          data: {
            labels: this.meses,
            datasets: this.datasetsMensuales
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      }
    });
    console.timeEnd('Execution Time 1');

    //~2-4ms más lento
   /*  console.time('Execution Time 2');
    this.StatsService.getDonaciones()
      .subscribe(resp => {
        if (resp.success) {

          this.statsResp = resp.data;
        }
      });

    this.StatsService.getTiposDonacion()
      .subscribe(resp => {
        if (resp.succes) console.log(resp.data)
      })
    console.timeEnd('Execution Time 2'); */
  }


  getDonaciones() {
    return [...new Set( this.statsMostrar.map(stat => stat.donacion)) ];
  }


  getGeneros() {
    return [...new Set( this.statsMostrar.map(stat => stat.genero)) ];
  }


  getGruposSang() {
    return [...new Set( this.statsMostrar.map(stat => stat.grupo)) ];
  }


  getAnios() {
    return [...new Set( this.statsMostrar.map(stat => stat.anio)) ];
  }


  crearStatsMostrar() {
    this.statsResp.forEach(stat => {
      const fechaCompleta = "YYYY-MM-DD HH:mm:ss";

      this.statsMostrar.push({
        donacion: stat.donacion,
        anio: moment(stat.fecha, fechaCompleta).format('YYYY'),
        mes: moment(stat.fecha, fechaCompleta).format('MMMM'),
        genero: stat.genero,
        grupo: stat.grupo,
      });
    });
  }


  crearDatasets() {
    this.tiposDonacion.forEach(tipoDonacion => {
      const numDonacionesMes: number[] = [];
      const numDonacionesAnio: number[] = [];

      const donaciones = this.statsMostrar.filter(stat => stat.donacion == tipoDonacion);

      this.meses.forEach(mes => numDonacionesMes.push(donaciones.filter(s => s.mes == mes).length));
      this.anios.forEach(anio => numDonacionesAnio.push(donaciones.filter(s => s.anio == anio).length));

      this.datasetsMensuales.push({ label : tipoDonacion, data: numDonacionesMes });
      this.datasetsAnuales.push({ label : tipoDonacion, data: numDonacionesAnio });
    });
  }


  cambiarDonacion(event: Event) {/*
    console.log(event.target) */
  }


  cambiarAnuales() {
    if (this.grafico) {
      this.grafico.data.labels = this.anios;
      this.grafico.data.datasets = this.datasetsAnuales;
      this.grafico.update();
    }
  }


  cambiarMensuales() {
    if (this.grafico) {
      this.grafico.data.labels = this.meses;
      this.grafico.data.datasets = this.datasetsMensuales;
      this.grafico.update();
    }
  }
}
