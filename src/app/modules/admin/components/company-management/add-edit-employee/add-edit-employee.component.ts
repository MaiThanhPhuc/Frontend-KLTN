import { Component } from '@angular/core';
import { BasicInfoEmployeeField, CompanyInfoEmployeeField, LeaveTypeFieldDemo } from 'src/app/models/employee.model';

export interface LeaveTypeItem {
  id: number,
  name: string;
  total: number;
  default: number;
  remaining: number;
  taken: number;
  bonus: number;
  paid: number;
  forward: number;
  isEdit: boolean;
}

const ELEMENT_DATA: LeaveTypeItem[] = [
  { id: 1, name: 'Hydrogen', total: 12, default: 1, remaining: 20, taken: 1, bonus: 1, paid: 2, forward: 0, isEdit: false },
  { id: 2, name: 'Hydrogen', total: 12, default: 1, remaining: 20, taken: 1, bonus: 1, paid: 2, forward: 0, isEdit: true },
  { id: 3, name: 'Hydrogen', total: 12, default: 1, remaining: 20, taken: 1, bonus: 1, paid: 2, forward: 0, isEdit: true },
  { id: 4, name: 'Hydrogen', total: 12, default: 1, remaining: 20, taken: 1, bonus: 1, paid: 2, forward: 0, isEdit: true },
  { id: 4, name: 'Hydrogen', total: 12, default: 1, remaining: 20, taken: 1, bonus: 1, paid: 2, forward: 0, isEdit: true },
  { id: 4, name: 'Hydrogen', total: 12, default: 1, remaining: 20, taken: 1, bonus: 1, paid: 2, forward: 0, isEdit: true },
];

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent {
  displayedColumns = ['leaveTypeName', 'total', 'default', 'remaining', 'taken', 'bonus', 'paid', 'forward', 'action'];
  basicInfoField = BasicInfoEmployeeField
  companyInfoField = CompanyInfoEmployeeField
  leaveTypeDemo = LeaveTypeFieldDemo
  dataSource = ELEMENT_DATA
  constructor() {

  }

  onChangeStatus(data: LeaveTypeItem) {
    if (data.isEdit == true) {
      console.log("save");
    }
    this.dataSource = this.dataSource.map(item => {
      if (item.id == data.id) item.isEdit = !data.isEdit
      return item
    })
  }
}
