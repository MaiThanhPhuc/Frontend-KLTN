import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeLeaveTypeReponse } from 'src/app/models/leaveType.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { EmployeeService } from '../admin/services/employee.service';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent extends BaseComponent implements OnInit {
  currentUserId: string;
  dataSource: any;
  userData: Employee;
  isLoading = false;
  constructor(private employeeService: EmployeeService) {
    super();
  }
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.loadDataEmployee()
  }

  loadDataEmployee() {
    this.isLoading = true;
    this.employeeService.getEmployeeById(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: EmployeeLeaveTypeReponse) => {
      if (res) {
        this.userData = res.employeeInfo
        this.dataSource = res.leaveType
        this.isLoading = false
      }

    })
  }
}
