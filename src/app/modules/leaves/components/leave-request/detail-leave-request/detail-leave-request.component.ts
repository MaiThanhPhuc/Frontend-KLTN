import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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
  dataSource: MatTableDataSource<any>;
  isLoading = false;
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  currentUserId: string
  userData: Employee
  constructor(private leaveTypeService: LeaveTypeService,
    private employeeService: EmployeeService
  ) {
    super();
  }
  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.initParamSearch();
    this.loadData();
    this.loadDataEmployee()
  }

  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword,
      employeeId: this.currentUserId
    }
  }
  onSearchKeyword() {
    this.paramSearch.keyword = this.keyword
    this.loadData();
  }
  loadData() {
    this.isLoading = true

    this.leaveTypeService.searchLeaveRequest(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
      }
      this.isLoading = false
    });
    this.isLoading = false
  }

  handlePageEvent(event: PageEvent) {
    if (event.pageSize !== this.paramSearch.limit) {
      this.paramSearch.pageIndex = 1
      this.pageIndex = 0
    } else {
      this.paramSearch.pageIndex = event.pageIndex + 1
    }
    this.paramSearch.limit = event.pageSize
    this.loadData();
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
}
