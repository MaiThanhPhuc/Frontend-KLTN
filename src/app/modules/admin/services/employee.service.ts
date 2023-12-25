import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee, SearchModal, SearchEmployeeResponse, EmployeeSalary } from 'src/app/models/employee.model';
import { EmployeeLeaveTypeReponse } from 'src/app/models/leaveType.model';
import { BaseService } from 'src/app/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends BaseService {
  createEmployee(request: Employee): Observable<Employee> {
    return this.post("employee", request);
  }

  getEmployeeById(employeeId: string): Observable<EmployeeLeaveTypeReponse> {
    return this.get(`employee/${employeeId}`);
  }

  getEmployeeSalaryById(employeeId: string): Observable<EmployeeLeaveTypeReponse> {
    return this.get(`employee/getEmployeeSalaryById/${employeeId}`);
  }

  updateEmployeeById(request: Employee): Observable<boolean> {
    return this.put(`employee/${request._id}`, request);
  }

  searchEmployee(request: SearchModal): Observable<SearchEmployeeResponse> {
    return this.get(`employee`, request);
  }
  getAbsentByDate(request: SearchModal): Observable<any> {
    return this.get(`employee/getAbsentByDate`, request);
  }

  resetPassword(employeeId: string): Observable<any> {
    return this.put(`employee/resetPassword/${employeeId}`, {});
  }

  importDataEmployee(request: Employee[]): Observable<Employee[]> {
    return this.post("employee/importData", request);
  }

  calcSalaryEmployeeByMonth(request: EmployeeSalary): Observable<any> {
    return this.post("employee/calcSalaryEmployeeByMonth", request);
  }
}
