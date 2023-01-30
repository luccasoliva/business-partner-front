import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'phone'
})
export class PhonePipe implements PipeTransform {

  transform(value: string | null) {
    if (value != null) {
      return value.substring(0, 0) + '(' + value.substring(0, 2) + ') ' + value.substring(2, 7) + '-' + value.substring(7);
    } else {
      return value;
    }

}
}
