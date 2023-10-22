import { OfficeModel } from "./office.model";

export class DepartmentModel {
  code: string;
  name: string;
  office: OfficeModel[];
  manager?: string;
  _id?: string;
}

export class SearchDepartmentResponse {
  msg: string;
  result: DepartmentModel[];
  totalItems: number;
  toltalPage: number;
  limit: number;
  currentPage: number;
}
