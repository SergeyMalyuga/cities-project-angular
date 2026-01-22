import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'formatMonthYear',
})
export class FormatMonthYearPipe implements PipeTransform {
  transform(value: string) {
    return dayjs(value).format('MMMM YYYY');
  }
}
