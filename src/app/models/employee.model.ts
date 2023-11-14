import { Constants } from "../constants";
import { DepartmentModel } from "./deparment.model";
import { OfficeModel } from "./office.model";
import { TeamModel } from "./team.model";

export interface IEmployee {
  _id: string;
  code: string;
  firstName: string;
  lastName: string;
  birthday: Date;
  email: string;
  gender: string;
  phone: number;
  citizenId: number;
  status: number;
  role: number;
  contract: string;
  departmentId: string;
  teamId: string;
  officeId: string;
  jobLeaveId: string;
}

export class Employee {
  _id: string;
  code: string;
  firstName: string;
  lastName: string;
  fullName: string;
  birthday: Date;
  email: string;
  gender: string;
  phone: number;
  citizenId: number;
  status: number;
  role: number;
  contract: string;
  department: DepartmentModel;
  team: TeamModel;
  office: OfficeModel;
  jobLeaveId: string;
}

export class SearchModal {
  keyword?: string;
  pageIndex?: number;
  limit?: number;
  role?: number;
  status?: number;
  sortBy?: string;
  officeId?: string;
  departmentId?: string;
  teamId?: string;
  employeeId?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export class SearchEmployeeResponse {
  msg: string;
  result: Employee[];
  totalItems: number;
  toltalPage: number;
  limit: number;
  currentPage: number;
}

export class AbsentEmployeeInfo {
  code: string;
  name: string;
  date: string;
  office: string;
  department: string;
  team: string;
  role: string;
}

export class EmployeeInfo {
  code: string;
  name: string;
  email: string;
  office: string;
  department: string;
  team: string;
  role: string;
}



export const BasicInfoEmployeeField = [
  {
    isLabel: true,
    label: "Basic infomation",
    fields: [
      {
        key: "firstName",
        label: "First Name",
        isRequired: true,
        value: "",
      },
      {
        key: "lastName",
        label: "Last Name",
        isRequired: true,
        value: "",
      },
      {
        key: "email",
        label: "Email",
        isRequired: true,
        value: "",
        type: 'email',
        isCustomType: true
      },
      {
        key: "password",
        label: "Password",
        isRequired: false,
        isDisable: true,
        value: "",
        isPassword: true
      },
      {
        key: "birthday",
        label: "Birthday",
        isRequired: true,
        value: "",
        isDate: true
      },
      {
        key: "phone",
        label: "Phone",
        isRequired: true,
        value: "",
        type: 'number',
        isCustomType: true
      },
      {
        key: "role",
        label: "Role",
        isRequired: true,
        value: "",
        isOption: true,
        options: Constants.EmployeeRole
      },
      {
        key: "status",
        label: "Status",
        isRequired: true,
        value: "",
        isOption: true,
        options: Constants.EmployeeStatus
      },
    ]
  },

  {
    isLabel: true,
    label: "Company information",
    fields: [
      {
        key: "office",
        label: "Office",
        isRequired: false,
        value: "",
        isOption: true,
        options: [],
        isCustomOption: true
      },
      {
        key: "department",
        label: "Department",
        isRequired: false,
        value: "",
        isOption: true,
        options: [],
        isCustomOption: true
      },
      {
        key: "team",
        label: "Team",
        isRequired: false,
        value: "",
        isOption: true,
        options: [],
        isCustomOption: true
      },
    ]
  },

]

export const LeaveTypeFieldDemo = [
  {
    name: "Paid Leave",
    total: 14,
    remaining: 6,
    default: 13,
    taken: 1,
    bonus: 1,
    forward: 1,
  }
]

export const AllDataEmployee = BasicInfoEmployeeField;

