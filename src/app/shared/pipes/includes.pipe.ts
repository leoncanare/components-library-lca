import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'includes',
  standalone: true
})
export class IncludesPipe implements PipeTransform {
  transform(array: any, searchElement: any) {
    if (typeof array === 'string') {
      array = JSON.parse(array.replace(/'/g, '"').replace(/,[\n\s]*]/g, ']'));
    }

    return array?.includes(searchElement);
  }
}
