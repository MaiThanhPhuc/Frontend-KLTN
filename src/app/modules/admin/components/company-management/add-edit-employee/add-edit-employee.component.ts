import { Component, OnInit } from '@angular/core';
import { AllDataEmployee, BasicInfoEmployeeField, Employee, LeaveTypeFieldDemo, SearchModal, SearchEmployeeResponse } from 'src/app/models/employee.model';
import { AdminService } from '../../../services/admin.service';
import { BaseComponent } from 'src/app/utils/base.component';
import { HasUnsavedData } from 'src/app/interfaces/unsave-data';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { takeUntil } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee.service';
import { _isNumberValue } from '@angular/cdk/coercion';
import { ToastService } from 'src/app/modules/common/toast/toast.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { OfficeModel } from 'src/app/models/office.model';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { TeamModel } from 'src/app/models/team.model';
import { OptionModel } from 'src/app/models/optionsModel';
import { Constants } from 'src/app/constants';

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
  leaveTypeDemo = LeaveTypeFieldDemo
  dataSource = ELEMENT_DATA

  isEdit = false;
  hidePassword = true;
  isLoading = false
  allDataEmployee: any;
  dataEmployee: Employee;
  employeeDataFormGroup: FormGroup = new FormGroup({});
  dataSave = {} as any;
  employeeId: string;
  allOffice: OptionModel[];
  allDepartment: OptionModel[];
  allTeam: OptionModel[];
  paramSearch: SearchModal;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {
    super()
  }
  hasUnsavedData(): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // this.getAllLeader();
    combineLatest(
      this.adminService.getAllOffice(),
      this.adminService.getAllDepartment(),
      this.adminService.getAllTeam(),
    ).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([officeData, departmentData, teamData]) => {
      if (!officeData) return;
      this.allOffice = officeData.map(item => new OptionModel(item.name, item._id))
      this.allDepartment = departmentData.map(item => new OptionModel(item.name, item._id))
      this.allTeam = teamData.map(item => new OptionModel(item.name, item._id))

      this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
        this.employeeId = params['id'];
      });

      if (this.employeeId) {
        this.isEdit = true
        this.loadDataEmployee()
      } else {
        this.mapDataToForm(this.dataEmployee);
      }
    })
  }

  getAllLeader() {
    this.isLoading = true
    this.paramSearch = {
      role: Constants.LeaderRole.id
    }
    this.employeeService.searchEmployee(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchEmployeeResponse) => {
      if (res) {
        console.log(res);
      }

      this.isLoading = false
    });
    this.isLoading = false
  }

  loadDataEmployee() {
    this.isLoading = true;
    this.employeeService.getEmployeeById(this.employeeId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: Employee) => {
      if (res) {
        console.log(res);
        this.mapDataToForm(res)
      }
      this.isLoading = false
    })
  }

  save() {
    this.isLoading = true
    this.parseDataToObject()
    console.log(this.dataSave);
    if (this.employeeId) {
      this.dataSave._id = this.employeeId
      this.employeeService.updateEmployeeById(this.dataSave).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: boolean) => {
        if (res) {
          ToastService.success("Update employee success")
          this.loadDataEmployee()
        }
        this.isLoading = false
      })
    }
    this.employeeService.createEmployee(this.dataSave).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: Employee) => {
      if (res) {
        this.mapDataToForm(res)
      }
      ToastService.success("Create employee success")
      this.isLoading = false
    })
  }

  parseDataToObject() {
    this.parseItem()
  }

  parseItem() {
    let stopLoop = false;
    for (const item1 of this.allDataEmployee) {
      if (stopLoop) break;
      for (const item2 of item1.fields) {
        if (stopLoop) break;
        if (item2.isRequired && item2.value === '') {
          this.employeeDataFormGroup.controls[`${item2.key}`].markAsTouched();
          stopLoop = true;
          break;
        }
        this.dataSave[item2.key as keyof Employee] = item2.value;
      }
    }
  }

  mapDataToForm(data: Employee) {
    if (data) {
      this.allDataEmployee = AllDataEmployee.map(item => this.mapItem(item, data))
    } else {
      this.allDataEmployee = AllDataEmployee.map(item => this.mapItem(item, null))
    }
    this.isLoading = false
  }

  mapItem(item: any, data: any) {
    item.fields = ((item.fields || []) as Array<any>).map(item2 => this.mapItem2(item2, data));
    return item;
  }

  mapItem2(item: any, data: any) {
    if (item.isRequired) {
      this.employeeDataFormGroup.controls[`${item.key}`] = new FormControl(item.value, [Validators.required, Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]);
    } else {
      this.employeeDataFormGroup.controls[`${item.key}`] = new FormControl(item.value, []);
    }
    if (item.isOption) {
      switch (item.key) {
        case "office":
          item.options = this.allOffice
          break;
        case "department":
          item.options = this.allDepartment
          break;
        case "team":
          item.options = this.allTeam
          break;
        default:
          break;
      }
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

  getFormControlByKey(key: string) {
    return this.employeeDataFormGroup.controls[`${key}`];
  }

  cancel(){
    this.router.navigate([`admin/company/employee`])
  }

}
