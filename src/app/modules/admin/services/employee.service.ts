import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/models/employee.model';
import { OfficeModel } from 'src/app/models/office.model';
import { BaseService } from 'src/app/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  createEmployee(request: IEmployee): Observable<boolean> {
    return this.post("employee", request);
  }

}
