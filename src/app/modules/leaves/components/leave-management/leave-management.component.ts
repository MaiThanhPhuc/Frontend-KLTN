import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Employee, SearchModal } from 'src/app/models/employee.model';
import { EmployeeLeaveType, EmployeeLeaveTypeReponse } from 'src/app/models/leaveType.model';
import { OptionModel } from 'src/app/models/optionsModel';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent extends BaseComponent implements OnInit {
  displayedColumns = ['name', 'total', 'remaining', 'taken', 'bonus', 'paid', 'forward'];
  isEdit = false;
  hidePassword = true;
  isLoading = false
  allDataEmployee: any;
  dataEmployee: Employee;
  currentUserId: string;
  paramSearch: SearchModal;
  allLeaveTypeOptions: OptionModel[];
  leaveTypeSelected: OptionModel[];
  leaveTypes = new FormControl('');
  leaveTypeEmployeeData: EmployeeLeaveType[];

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) {
    super()
  }
  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId') || '';

    if (this.currentUserId) {
      this.loadDataEmployee()
    }
  }
  loadDataEmployee() {
    this.isLoading = true;
    this.employeeService.getEmployeeById(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: EmployeeLeaveTypeReponse) => {
      if (res) {
        this.initDataLeaveTypeEmp(res.leaveType)
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

}
