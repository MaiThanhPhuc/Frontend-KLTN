import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeLeaveTypeReponse, UserLeaveTypeItem } from 'src/app/models/leaveType.model';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';
import { BaseComponent } from 'src/app/utils/base.component';

const ELEMENT_DATA: UserLeaveTypeItem[] = [
  { id: 1, name: 'Hydrogen', total: 1.0079, remaining: 6, taken: 3 },
  { id: 2, name: 'test', total: 1.0079, remaining: 6, taken: 3 },
  { id: 3, name: 'test1', total: 1.0079, remaining: 6, taken: 3 },
];
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
  constructor(private emloyeeService: EmployeeService) {
    super();
  }


  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.getUserData()
  }
  getUserData() {
    this.emloyeeService.getEmployeeById(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: EmployeeLeaveTypeReponse) => {
      if (res) {
        this.userData = res.employeeInfo
        this.dataSource = res.leaveType
      }
    })
  }
}
