import { Component, OnInit } from '@angular/core';
import { Memoria } from '../interfaces/paginas.interface';
import { PaginasService } from '../services/paginas.service';

@Component({
  selector: 'app-memorias',
  templateUrl: './memorias.component.html',
  styleUrls: ['./memorias.component.scss']
})
export class MemoriasComponent implements OnInit {

  memorias: Memoria[] = [];

  constructor(private PaginasService: PaginasService) { }

  ngOnInit() {
    this.PaginasService.getMemorias()
      .subscribe(resp => {

        if (resp.success) {
          this.memorias = resp.data;
        }
      });
  }
}
