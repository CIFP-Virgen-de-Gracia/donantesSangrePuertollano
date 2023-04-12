import { Component } from '@angular/core';
import { Memoria } from '../interfaces/paginas.interface';
import { PaginasService } from '../services/paginas.service';

@Component({
  selector: 'app-memorias',
  templateUrl: './memorias.component.html',
  styleUrls: ['./memorias.component.scss']
})
export class MemoriasComponent {

  listaMemorias: Memoria[] = [];

  constructor(private PaginasService: PaginasService) { }
}
