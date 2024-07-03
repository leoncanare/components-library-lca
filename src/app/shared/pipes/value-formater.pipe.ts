import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueFormater',
  standalone: true
})
export class ValueFormaterPipe implements PipeTransform {
  transform(value: any) {    
      if (typeof value === 'object' && !!value) {
        return value.label.toString();
      }
      return value;
    }
}
