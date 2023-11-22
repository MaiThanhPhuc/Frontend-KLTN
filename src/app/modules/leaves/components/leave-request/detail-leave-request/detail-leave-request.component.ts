import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Employee, SearchModal } from 'src/app/models/employee.model';
import { EmployeeLeaveTypeReponse } from 'src/app/models/leaveType.model';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-detail-leave-request',
  templateUrl: './detail-leave-request.component.html',
  styleUrls: ['./detail-leave-request.component.scss']
})
export class DetailLeaveRequestComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['request_date', 'leave_type', 'leave_time', 'total_leave', 'status'];
  displayedApprovalColumns: string[] = ['approver', 'approved_time', 'status', 'description'];
  dataSourceLeaveTime: MatTableDataSource<any>;
  dataSourceApproval: MatTableDataSource<any>;
  isLoading = false;
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  currentUserId: string
  userData: Employee
  leaveRequestId: string
  leaveRequestData: any;
  dataInfomation: any;
  dataLeaveType: any;
  dataApproval: any;
  constructor(private leaveTypeService: LeaveTypeService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
  ) {
    super();
  }
  ngOnInit() {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.leaveRequestId = params['id'];
    });
    this.currentUserId = localStorage.getItem('userId') || '';
    this.loadDataEmployee()
    this.loadDataLeaveRequest()
  }

  loadDataEmployee() {
    this.isLoading = true;
    this.employeeService.getEmployeeById(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: EmployeeLeaveTypeReponse) => {
      if (res) {
        this.userData = res.employeeInfo
        this.isLoading = false
      }

    })
  }

  loadDataLeaveRequest() {
    this.isLoading = true;
    this.leaveTypeService.getLeaveRequestById(this.leaveRequestId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        this.leaveRequestData = res
        this.dataLeaveType = res.leaveType
        this.dataApproval = res.approvalStatus
        this.dataSourceLeaveTime = new MatTableDataSource([res]);
        this.dataSourceApproval = new MatTableDataSource(this.dataApproval);
      }
      this.isLoading = false
    })
  }
}
