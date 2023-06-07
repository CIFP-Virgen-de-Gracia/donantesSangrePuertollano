import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(lista:String[], nombre:string): String[] {
    if(!nombre)return lista;
    return lista.filter((l) => l.toLowerCase().includes(nombre.toLowerCase())); ;
  }

}
