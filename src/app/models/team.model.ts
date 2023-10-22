import { DepartmentModel } from "./deparment.model";
import { Employee } from "./employee.model";

export class TeamModel {
  code: string;
  name: string;
  department: DepartmentModel;
  leader: Employee;
  _id?: string;
}

export class SearchTeamResponse {
  msg: string;
  result: TeamModel[];
  totalItems: number;
  toltalPage: number;
  limit: number;
  currentPage: number;
}
