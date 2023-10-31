import { Pipe, PipeTransform } from '@angular/core';
import commonFunction from 'src/app/utils/common';

@Pipe({
  name: 'date'
})
export class FormatDate implements PipeTransform {

  constructor() {
  }

  transform(date: Date) {
    if (!date) {
      return 'Undefine';
    }
    return commonFunction.formatMMDDYYY(new Date(date));
  }
}
