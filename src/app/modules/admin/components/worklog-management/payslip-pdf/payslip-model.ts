export class PayslipModel {
  name: string
  value: string
  date: Date
}

export const PayslipDataModal = [
  {
    label: "I/ GENERAL INFORMATION",
    fields: [
      {
        key: "fullName",
        label: "Employee’s Name",
        isEmployeeInfo: true,
        value: "",
      },
      {
        key: "workingDayOfMonth",
        label: "Standard Days of this month",
        value: "",
      },
      {
        key: "paidDay",
        label: "Paid Days",
        value: "",
      },
      {
        key: "dependents",
        label: "Number of Dependents",
        value: 0,
      },
      {
        key: "otDay",
        label: "Total OT Hours",
        value: "",
      }

    ]
  },
  {
    label: "II/ TOTAL INCOME",
    fields: [
      {
        key: "contractSalary",
        label: "Contract Salary",
        value: "",
      },
      {
        key: "transportAllowance",
        label: "Transport Allowance",
        value: "",
      },
      {
        key: "internetAllowance",
        label: "Internet Allowance",
        value: "",
      },
      {
        key: "mealAllowance",
        label: "Meal Allowance",
        value: 0,
      },
      {
        key: "bonus",
        label: "Bonus Or Other Payments",
        value: "",
      },
      {
        key: "salary13th",
        label: "13th Salary",
        value: "",
      },
      {
        key: "siClaimed",
        label: "SI Claimed - Payment to employee",
        value: "",
      },
      {
        key: "otTax",
        label: "Taxable OT Payment",
        value: "",
      },
    ]
  },
  {
    label: "III/ DEDUCTIONS",
    fields: [
      {
        key: "personalAndDependentDeduction",
        label: "Personal And Dependent Deduction",
        value: "",
      },
      {
        key: "salaryAdvance",
        label: "Salary Advance",
        value: "",
      },
      {
        key: "others",
        label: "Others",
        value: "",
      },
    ]
  },
  {
    label: "IV/ PERSONAL INCOME TAX",
    fields: [
      {
        key: "taxValue",
        label: "Personal Income Tax",
        value: "",
      }
    ]
  },
  {
    label: "V/ PAID TO EMPLOYEE ACCOUNT",
    fields: [
      {
        key: "paidSalary",
        label: "Paid to Employee Account",
        value: "",
      },
      {
        key: "bankName",
        label: "Bank Name",
        isEmployeeInfo: true,
        value: "",
      },
      {
        key: "bankNo",
        label: "Bank Account no.",
        isEmployeeInfo: true,
        value: "",
      }
    ]
  },
]

