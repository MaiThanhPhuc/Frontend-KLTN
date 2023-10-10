import { Constants } from "../constants";

export interface IEmployee {
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
  }
  ,
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
    isNumber: true
  },
  {
    key: "citizenNumber",
    label: "Citizen Number",
    isRequired: true,
    value: "",
    isNumber: true
  },
  {
    key: "status",
    label: "Status",
    isRequired: true,
    value: "",
    isOption: true,
    options: Constants.EmployeeStatus
  }
]

export const CompanyInfoEmployeeField = [
  {
    key: "officeId",
    label: "Office",
    isRequired: true,
    value: "UTE Corp",
    isOption: true,
    options: ["UTE Corp"]
  },
  {
    key: "deparmentId",
    label: "Department",
    isRequired: true,
    value: "",
    isOption: true,
    options: [""]
  },
  {
    key: "teamId",
    label: "Team",
    isRequired: true,
    value: "",
    isOption: true,
    options: [""]
  },
  {
    key: "role",
    label: "Role",
    isRequired: true,
    value: "Member",
    isOption: true,
    options: ["Admin", "Manager", "Leader", "Member"]
  }
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

export const AllDataEmployee = [
  BasicInfoEmployeeField,
  CompanyInfoEmployeeField
]
