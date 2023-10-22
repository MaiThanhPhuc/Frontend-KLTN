import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, IEmployee, SearchModal, SearchEmployeeResponse } from 'src/app/models/employee.model';
import { OfficeModel } from 'src/app/models/office.model';
import { BaseService } from 'src/app/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  createEmployee(request: IEmployee): Observable<Employee> {
    return this.post("employee", request);
  }

  getEmployeeById(employeeId: string): Observable<Employee> {
    return this.get(`employee/${employeeId}`);
  }

  updateEmployeeById(request: IEmployee): Observable<boolean> {
    return this.put(`employee/${request._id}`, request);
  }

  searchEmployee(request: SearchModal): Observable<SearchEmployeeResponse> {
    return this.get(`employee`, request);
  }

}
