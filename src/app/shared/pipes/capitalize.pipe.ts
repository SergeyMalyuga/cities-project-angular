import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
    transform(value: string) {
        return value.replace(value.charAt(0), value.charAt(0).toUpperCase());
    }
}
