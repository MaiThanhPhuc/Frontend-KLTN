import { Employee } from "./employee.model";
import { OfficeModel } from "./office.model";

export class DepartmentModel {
  code: string;
  name: string;
  office: any;
  manager: any;
  _id: string;
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
