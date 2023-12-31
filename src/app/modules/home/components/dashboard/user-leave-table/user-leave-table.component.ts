import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeLeaveType, EmployeeLeaveTypeReponse, UserLeaveTypeItem } from 'src/app/models/leaveType.model';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';
import { GlobalService } from 'src/app/services/global.service';
import { BaseComponent } from 'src/app/utils/base.component';
@Component({
  selector: 'app-user-leave-table',
  templateUrl: './user-leave-table.component.html',
  styleUrls: ['./user-leave-table.component.scss']
})

export class UserLeaveTableComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'total', 'remaining', 'taken'];
  dataSource: any;
  currentUserId: string
  userData: Employee
  constructor(private emloyeeService: EmployeeService, private globalService: GlobalService) {
    super();
  }
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.getUserData()
    this.listeningEvent();
  }
  getUserData() {
    this.emloyeeService.getEmployeeById(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: EmployeeLeaveTypeReponse) => {
      if (res) {
        this.userData = res.employeeInfo
        this.initDataLeaveTypeEmp(res.leaveType)
      }
    })
  }

  listeningEvent(): void {
    this.globalService.reloadUserLeave$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        if (res)
          this.getUserData();
      });

  }

  initDataLeaveTypeEmp(data: EmployeeLeaveType[]) {
    this.dataSource = data.map((item: EmployeeLeaveType) => {
      item.total = item.leaveType.default + item.bonus + item.forward
      item.remain = item.total - item.taken
      return item
    })
  }
}
