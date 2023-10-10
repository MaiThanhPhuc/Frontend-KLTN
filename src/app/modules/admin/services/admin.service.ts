import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEmployee } from 'src/app/models/employee.model';
import { BaseService } from 'src/app/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {
  createEmployee(request: IEmployee): Observable<boolean> {
    return this.post("employee", request);
  }
}
