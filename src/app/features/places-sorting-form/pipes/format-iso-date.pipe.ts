import {Pipe, PipeTransform} from '@angular/core';
import dayjs from 'dayjs';

@Pipe({name: 'formatIsoDate'})
export class FormatIsoDatePipe implements PipeTransform {
    transform(value: string) {
        return dayjs(value).format('YYYY-DD-MM')
    }
}
