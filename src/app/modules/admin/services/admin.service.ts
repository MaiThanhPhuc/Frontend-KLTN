import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { IEmployee } from 'src/app/models/employee.model';
import { OfficeModel } from 'src/app/models/office.model';
import { TeamModel } from 'src/app/models/team.model';
import { BaseService } from 'src/app/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService {
  createOffice(request: OfficeModel): Observable<string> {
    return this.post("admin/addOffice", request);
  }

  updateOfficeById(request: OfficeModel): Observable<string> {
    return this.put(`admin/updateOfficeById/${request._id}`, request);
  }

  getAllOffice(): Observable<OfficeModel[]> {
    return this.get("admin/getAllOffice");
  }

  getOfficeById(id: string): Observable<OfficeModel[]> {
    return this.get(`admin/getOfficeById/${id}`);
  }

  createDepartment(request: DepartmentModel): Observable<string> {
    return this.post("admin/addDepartment", request);
  }

  updateDepartmentById(request: DepartmentModel): Observable<string> {
    return this.put(`admin/updateDepartmentById/${request._id}`, request);
  }

  getAllDepartment(): Observable<DepartmentModel[]> {
    return this.get("admin/getAllDepartment");
  }

  getDepartmentById(id: string): Observable<DepartmentModel[]> {
    return this.get(`admin/getDepartmentById/${id}`);
  }

  createTeam(request: TeamModel): Observable<string> {
    return this.post("admin/addTeam", request);
  }

  updateTeamById(request: TeamModel): Observable<string> {
    return this.put(`admin/updateTeamById/${request._id}`, request);
  }

  getAllTeam(): Observable<TeamModel[]> {
    return this.get("admin/getAllTeam");
  }

  getTeamById(id: string): Observable<TeamModel[]> {
    return this.get(`admin/getTeamById/${id}`);
  }
}
