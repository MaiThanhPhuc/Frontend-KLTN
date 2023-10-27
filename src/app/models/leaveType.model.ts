import { Employee } from "./employee.model";
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
}

export class LeaveTypePopupModel {
  leaveTypeOption: OptionModel[];
}
