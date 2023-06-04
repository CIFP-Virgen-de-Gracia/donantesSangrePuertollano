import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Integrante } from '../interfaces/la-hermandad.interface';


@Component({
  selector: 'app-pagina-hermandad',
  templateUrl: './pagina-hermandad.component.html',
  styleUrls: ['./pagina-hermandad.component.scss']
})
export class PaginaHermandadComponent implements OnInit {

  junta: Integrante[] = [];
  historia: string = '';

  constructor(private SharedService: SharedService) { }

  //Alicia
  ngOnInit() {
    this.SharedService.getIntegrantesCargo()
      .subscribe(resp => {
        if (resp.success) {
          this.junta = resp.data;
        }
      });

    this.SharedService.getHistoria()
      .subscribe(resp => {
        if (resp.success) {
          this.historia = resp.data.valor;
        }
      });
  }
}
