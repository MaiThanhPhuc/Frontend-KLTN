import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { Employee, SearchModal } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-my-leaves',
  templateUrl: './my-leaves.component.html',
  styleUrls: ['./my-leaves.component.scss']
})
export class MyLeavesComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['request_date', 'leave_type', 'leave_time', 'total_leave', 'status'];
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
    private emloyeeService: EmployeeService
  ) {
    super();
  }
  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.initParamSearch();
    this.loadData();
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

}
