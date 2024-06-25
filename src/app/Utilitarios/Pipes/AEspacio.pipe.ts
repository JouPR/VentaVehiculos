import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AEspacio'
})
export class AEspacioPipe implements PipeTransform {

  transform(value: string, buscar: string): any {
    const valorReemplazo=" "; //Se puede reemplazar por cualquier valor
    return value.replace(buscar, valorReemplazo); // remplaceAll busca y reemplaza
  }

}
