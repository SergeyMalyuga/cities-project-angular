import { Pipe, PipeTransform } from '@angular/core';
import { CITY_LOCATIONS, DEFAULT_CITY } from '../../../core/constants/const';

@Pipe({
  name: 'cityByName',
})
export class CityByNamePipe implements PipeTransform {
  transform(value: string) {
    const city = CITY_LOCATIONS.find((city) => city.name === value);
    return city ?? DEFAULT_CITY;
  }
}
