import { Employee, EmployeeSalary } from "./employee.model";
import { OptionModel } from "./optionsModel";

export interface UserLeaveTypeItem {
  id: number,
  name: string;
  total: number;
  remaining: number;
  taken: number;
}

export class LeaveType {
  _id: string
  code: number;
  name: string;
  default: number;
  description: string;
  updateDate: Date;
}
export class EmployeeLeaveType {
  _id: string
  code: number;
  name: string;
  default: number;
  description: string;
  updateDate: Date;
  total: number;
  remain: number;
  taken: number;
  bonus: number;
  status: number;
  forward: number;
  employee: Employee;
  leaveType: LeaveType;
  isEdit?: boolean
}

export class EmployeeLeaveTypeRequest {
  employee: string;
  leaveType: string;
}

export class EmployeeLeaveTypeReponse {
  employeeInfo: Employee;
  leaveType: EmployeeLeaveType[];
  empSalary: EmployeeSalary;
}

export class LeaveTypePopupModel {
  leaveTypeOption: OptionModel[];
}

export class LeaveRequest {
  _id: string;
  employee: any;
  leaveType: any;
  date: Date;
  timeType: number;
  timeValue: number;
  reason: string;
}

export enum LeaveRequestStatusEnum {
  CANCELLED = 0,
  PENDING = 1,
  APPROVED = 2,
  WAITING = 3,
  REJECT = 4,
}
