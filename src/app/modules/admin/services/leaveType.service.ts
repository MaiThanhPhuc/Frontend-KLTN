import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchModal } from 'src/app/models/employee.model';
import { EmployeeLeaveType, EmployeeLeaveTypeRequest, LeaveRequest, LeaveType } from 'src/app/models/leaveType.model';
import { BaseService } from 'src/app/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class LeaveTypeService extends BaseService {

  createLeaveType(request: LeaveType): Observable<string> {
    return this.post("leaveType", request);
  }

  getLeaveTypeById(leaveTypeId: string): Observable<LeaveType> {
    return this.get(`leaveType/${leaveTypeId}`);
  }

  getAllLeaveType(): Observable<LeaveType[]> {
    return this.get(`leaveType/getAllLeaveType`);
  }

  getLeaveTypeByEmployeeId(employeeId: string): Observable<any[]> {
    return this.get(`leaveType/getLeaveTypeByEmployeeId/${employeeId}`);
  }

  updateLeaveTypeById(request: LeaveType): Observable<string> {
    return this.put(`leaveType/${request._id}`, request);
  }

  searchLeaveType(request: SearchModal): Observable<any> {
    return this.get(`leaveType`, request);
  }

  addEmployeeLeaveType(request: EmployeeLeaveTypeRequest[]): Observable<any> {
    return this.post("leaveType/addEmployeeLeaveType", request);
  }

  updateEmployeeLeaveType(request: EmployeeLeaveType): Observable<any> {
    return this.post("leaveType/updateEmployeeLeaveType", request);
  }

  createLeaveRequest(request: LeaveRequest): Observable<any> {
    return this.post("leaveType/createLeaveRequest", request);
  }

  searchLeaveRequest(request: SearchModal): Observable<any> {
    return this.get(`leaveType/getLeaveRequest`, request);
  }

  getLeaveRequestByApprove(request: SearchModal): Observable<any> {
    return this.get(`leaveType/getLeaveRequestByApprove`, request);
  }

  getLeaveRequestHistory(request: SearchModal): Observable<any> {
    return this.get(`leaveType/getLeaveRequestHistory`, request);
  }

  getAllLeaveRequest(request: SearchModal): Observable<any> {
    return this.get(`leaveType/getAllLeaveRequest`);
  }
  getLeaveRequestById(leaveRequestId: string): Observable<any> {
    return this.get(`leaveType/getLeaveRequestById/${leaveRequestId}`);
  }
  updateLeaveRequestById(leaveRequestId: string, data: any): Observable<any> {
    return this.put(`leaveType/updateLeaveRequestById/${leaveRequestId}`, data);
  }
  updateLeaveRequestByApprovalId(leaveRequestId: string, data: any): Observable<any> {
    return this.put(`leaveType/updateLeaveRequestByApprovalId/${leaveRequestId}`, data);
  }
}
