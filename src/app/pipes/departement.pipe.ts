import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'departement'
})
export class DepartementPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.substring(0, 2);
  }

}
