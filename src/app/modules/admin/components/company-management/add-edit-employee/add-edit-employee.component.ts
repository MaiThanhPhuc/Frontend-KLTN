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
import { LeaveTypeService } from '../../../services/leaveType.service';
import { EmployeeLeaveType, EmployeeLeaveTypeReponse, EmployeeLeaveTypeRequest, LeaveType, LeaveTypePopupModel } from 'src/app/models/leaveType.model';
import { MatDialog } from '@angular/material/dialog';
import { LeaveTypePopupComponent } from './leave-type-popup/leave-type-popup.component';

@Component({
  selector: 'app-add-edit-employee',
  templateUrl: './add-edit-employee.component.html',
  styleUrls: ['./add-edit-employee.component.scss']
})
export class AddEditEmployeeComponent extends BaseComponent implements OnInit, HasUnsavedData {
  displayedColumns = ['name', 'total', 'remaining', 'taken', 'bonus', 'paid', 'forward', 'action'];

  isEdit = false;
  hidePassword = true;
  isLoading = false
  allDataEmployee: any;
  dataEmployee: Employee;
  employeeDataFormGroup: FormGroup = new FormGroup({});
  dataSave = {} as any;
  employeeId: string;
  allOffice: OptionModel[];
  allDepartment: DepartmentModel[];
  allTeam: TeamModel[];
  paramSearch: SearchModal;
  allLeaveTypeOptions: OptionModel[];
  leaveTypeSelected: OptionModel[];
  leaveTypes = new FormControl('');
  leaveTypeEmployeeData: EmployeeLeaveType[];
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private leaveTypeService: LeaveTypeService,
    private dialog: MatDialog,
  ) {
    super()
  }
  hasUnsavedData(): boolean {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    combineLatest(
      this.adminService.getAllOffice(),
      this.adminService.getAllDepartment(),
      this.adminService.getAllTeam(),
      this.leaveTypeService.getAllLeaveType()
    ).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([officeData, departmentData, teamData, leaveTypeData]) => {
      if (!officeData) return;
      this.allOffice = officeData.map(item => new OptionModel(item.name, item._id))
      this.allDepartment = departmentData
      this.allTeam = teamData
      this.allLeaveTypeOptions = leaveTypeData.map(item => new OptionModel(item.name, item._id))
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

  loadDataEmployee() {
    this.isLoading = true;
    this.employeeService.getEmployeeById(this.employeeId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: EmployeeLeaveTypeReponse) => {
      if (res) {
        this.mapDataToForm(res.employeeInfo)
        this.initDataLeaveTypeEmp(res.leaveType)
      }

      this.isLoading = false
    })
  }

  updateEmployeeLeaveTypeItem(data: EmployeeLeaveType) {
    this.leaveTypeService.updateEmployeeLeaveType(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        ToastService.success("Update employee success")
        this.loadDataEmployee()
      }
      this.isLoading = false
    })
  }

  initDataLeaveTypeEmp(data: EmployeeLeaveType[]) {
    this.leaveTypeEmployeeData = data.map((item: EmployeeLeaveType) => {
      item.total = item.leaveType.default + item.bonus + item.forward
      item.remain = item.total - item.taken
      return item
    })
  }

  caculateDataLeaveTypeEmp(data: EmployeeLeaveType) {
    this.leaveTypeEmployeeData = this.leaveTypeEmployeeData.map((item: EmployeeLeaveType) => {
      if (item._id === data._id) {
        if (data.taken > data.total) return item
        item.total = item.leaveType.default + item.bonus + item.forward
        item.remain = item.total - item.taken
      }
      return item
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
        this.employeeId = res._id
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

  getItemByKey(key: string) {
    for (const item1 of this.allDataEmployee) {
      for (const item2 of item1.fields) {
        if (item2.key == key) {
          return item2
        }
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
        default:
          break;
      }
    }

    item.value = data ? data[item.key] : ''
    // item.value = (item.isDate) ? moment(data[item.key]) : (data[item.key] || '');
    return item;
  }

  onChangeStatus(data: EmployeeLeaveType) {
    if (data.isEdit == true) {
      this.updateEmployeeLeaveTypeItem(data)
    }
    this.leaveTypeEmployeeData = this.leaveTypeEmployeeData.map(item => {
      if (item._id == data._id) item.isEdit = !data.isEdit
      return item
    })
  }

  onChangePassword() {

  }

  getFormControlByKey(key: string) {
    return this.employeeDataFormGroup.controls[`${key}`];
  }

  cancel() {
    this.router.navigate([`admin/company/employee`])
  }
  onSelectLeaveType() {
    const inputPopupData: LeaveTypePopupModel = new LeaveTypePopupModel();
    inputPopupData.leaveTypeOption = this.allLeaveTypeOptions;
    const selectLeaveTypePopup = this.dialog.open(LeaveTypePopupComponent, {
      autoFocus: false,
      width: '500px',
      disableClose: true
    });
    selectLeaveTypePopup.componentInstance.data = inputPopupData;
    selectLeaveTypePopup.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(confirm => {
      if (confirm) {
        this.onSaveLeaveType();
      }
    });
  }

  onSaveLeaveType() {
    this.isLoading = true

    let request: EmployeeLeaveTypeRequest[] = []

    request = this.allLeaveTypeOptions.filter(item => item.checked === true).map(item => {
      return {
        employee: this.employeeId,
        leaveType: item.id
      }
    }
    )
    this.leaveTypeService.addEmployeeLeaveType(request).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) this.isLoading = false
      ToastService.success("Add leave type success")
    })
  }

  onChangeSelectItems(option: any, item: any) {
    switch (item.key) {
      case "office":
        var department = this.getItemByKey("department");
        department.value = ''
        department.options = this.allDepartment.filter(data => data.office._id === option.value).map(k => new OptionModel(k.name, k._id))
        break;
      case "department":
        var team = this.getItemByKey("team");
        team.value = '';
        team.options = this.allTeam.filter(data => data.department._id === option.value).map(k => new OptionModel(k.name, k._id))
        break;
      default:
        break;
    }
  }
}
