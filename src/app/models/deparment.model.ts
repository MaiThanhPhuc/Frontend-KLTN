import { Employee } from "./employee.model";
import { OfficeModel } from "./office.model";

export class DepartmentModel {
  code: string;
  name: string;
  office: OfficeModel[];
  manager?: Employee;
  _id?: string;
  status: number;
}

export class SearchDepartmentResponse {
  msg: string;
  result: DepartmentModel[];
  totalItems: number;
  toltalPage: number;
  limit: number;
  currentPage: number;
}
