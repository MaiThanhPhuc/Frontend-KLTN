import { Pipe, PipeTransform } from '@angular/core';
import commonFunction from 'src/app/utils/common';

@Pipe({
  name: 'getRoleEmployee'
})
export class GetRoleEmployee implements PipeTransform {

  constructor() {
  }

  transform(value: number) {
    if (!value) {
      return 'Undefine';
    }
    return commonFunction.getTextRole(value);
  }
}
