import { Component, OnInit } from '@angular/core';
import { AllDataEmployee, BasicInfoEmployeeField, CompanyInfoEmployeeField, Employee, LeaveTypeFieldDemo } from 'src/app/models/employee.model';
import { AdminService } from '../../../services/admin.service';
import { BaseComponent } from 'src/app/utils/base.component';
import { HasUnsavedData } from 'src/app/interfaces/unsave-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee.service';

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
export class AddEditEmployeeComponent extends BaseComponent implements OnInit, HasUnsavedData {
  displayedColumns = ['leaveTypeName', 'total', 'default', 'remaining', 'taken', 'bonus', 'paid', 'forward', 'action'];
  basicInfoField = BasicInfoEmployeeField
  companyInfoField = CompanyInfoEmployeeField
  leaveTypeDemo = LeaveTypeFieldDemo
  dataSource = ELEMENT_DATA

  isEdit = false;
  hidePassword = true;
  isLoading = false
  allDataEmployee: any;
  dataEmployee: Employee;
  employeeDataFormGroup: FormGroup = new FormGroup({});
  dataSave = {} as any;
  constructor(
    private employeeService: EmployeeService
  ) {
    super()
  }
  hasUnsavedData(): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.mapDataToForm(this.dataEmployee);
  }

  save() {
    this.parseDataToObject()
    this.employeeService.createEmployee(this.dataSave).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      console.log(res);
    })
  }

  parseDataToObject() {
    this.parseItem()
  }

  parseItem() {
    let stopLoop = false;
    for (const item1 of this.allDataEmployee) {
      if (stopLoop) break;
      for (const item2 of item1) {
        if (stopLoop) break;
        if (item2.isRequired && (!item2.value || (Array.isArray(item2.value) && !item2.value.length))) {
          this.employeeDataFormGroup.controls[`${item2.key}`].markAsTouched();
          stopLoop = true;
          break;
        }
        this.dataSave[item2.key as keyof Employee] = item2.value;
      }
    }
  }

  mapDataToForm(data: Employee) {
    // if (data) {
    //   this.dataEmployee = this.mapItem(this.basicInfoField, data)
    // } else {
    //   this.dataEmployee = this.mapItem(this.basicInfoField, data)
    // }
    this.allDataEmployee = AllDataEmployee.map(item => item.map(item2 => this.mapItem(item2, data)))
  }

  mapItem(item: any, data: any) {
    if (item.isRequired) {
      this.employeeDataFormGroup.controls[`${item.key}`] = new FormControl(item.value, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
    } else {
      this.employeeDataFormGroup.controls[`${item.key}`] = new FormControl(item.value, []);
    }
    item.value = data ? data[item.key] : ''
    // item.value = (item.isDate) ? moment(data[item.key]) : (data[item.key] || '');
    return item;
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

  onChangePassword() {

  }
}
