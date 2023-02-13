import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Integrante } from '../interfaces/Paginas.interfaces';


@Component({
  selector: 'app-la-hermandad',
  templateUrl: './la-hermandad.component.html',
  styleUrls: ['./la-hermandad.component.scss']
})
export class LaHermandadComponent implements OnInit {

  junta!: Integrante[];


  constructor(private SharedService: SharedService) { }

  ngOnInit() {
    this.SharedService.getIntegrantesCargo()
      .subscribe(resp => {
        if (resp.success) {
          this.junta = resp.data;
        }
      });
  }
}
