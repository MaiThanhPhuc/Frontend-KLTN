import { Employee, EmployeeSalary } from "./employee.model";

export class WorkLogModel {
  _id: string;
  date: Date;
  time: number;
  code: string;
  name: string;
  description: string;
  employee: any;
  status: number;
  checked?: boolean;
  month: number;
  year: number;
}

export class WorkLogReponse {
  currentPage: number;
  limit: number;
  msg: number;
  result: WorkLogResult[];
  totalItems: number;
  totalPage: number;
  teamName: string;
}

export class WorkLogResult {
  empSalary: EmployeeSalary;
  employeeInfo: Employee;
  selected?: boolean;
}

