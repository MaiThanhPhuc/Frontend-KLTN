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
  phone: string;
  status: number;
  role: number;
  department: DepartmentModel;
  team: TeamModel;
  office: OfficeModel;
  jobLeaveId: string;
  age: number;
  startedDate: Date;
  address: string;
  bankName: string;
  bankNo: string;
  salary: number;
  checked?: boolean;
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
  currentDate?: boolean;
  month?: number;
  isGetAll?: boolean;
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

export class EmployeeSalary {
  employee: string;
  contractSalary: number;
  paidSalary: number;
  paidDay: number;
  taxIncomeRate: number;
  taxValue: number;
  transportAllowance: number;
  mealAllowance: number;
  workingDay: number;
  otDay: number;
  workingDayOfMonth: number;
  month: number;
  year: number;
  updateDate: Date;
  status: number;
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
        key: "gender",
        label: "Gender",
        isRequired: true,
        value: "",
        isOption: true,
        options: Constants.Gender
      },
      {
        key: "birthday",
        label: "Birthday",
        isRequired: true,
        value: "",
        isDate: true
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
        key: "phone",
        label: "Phone",
        isRequired: true,
        value: "",
      },
      {
        key: "address",
        label: "Address",
        isRequired: false,
        value: "",
      },
      {
        key: "startedDate",
        label: "Started Date",
        isRequired: true,
        value: "",
        isDate: true
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
        key: "salary",
        label: "Base Salary",
        isRequired: true,
        value: "",
        type: 'number',
        isCustomType: true
      },
      {
        key: "status",
        label: "Status",
        isRequired: true,
        value: "",
        isOption: true,
        options: Constants.EmployeeStatus
      },
      {
        key: "bankName",
        label: "Bank Name",
        isRequired: false,
        value: "",
      },
      {
        key: "bankNo",
        label: "Account No.",
        isRequired: false,
        value: "",
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

