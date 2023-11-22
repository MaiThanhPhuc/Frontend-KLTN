import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { AbsentEmployeeInfo, Employee, SearchModal } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { BaseComponent } from 'src/app/utils/base.component';
import commonFunction from 'src/app/utils/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'office', 'department', 'team', 'role'];
  dataSource: MatTableDataSource<AbsentEmployeeInfo>;
  isLoading = false;
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  currentUserId: string
  userData: Employee
  constructor(private leaveService: LeaveTypeService,
    private emloyeeService: EmployeeService
  ) {
    super();
  }
  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.initParamSearch();
    this.loadDataAbsent();
  }

  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword,
      currentDate: true,
    }
  }
  onSearchKeyword() {
    this.paramSearch.keyword = this.keyword
    this.loadDataAbsent();
  }
  loadDataAbsent() {
    this.isLoading = true
    this.emloyeeService.getAbsentByDate(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
        this.isLoading = false
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    if (event.pageSize !== this.paramSearch.limit) {
      this.paramSearch.pageIndex = 1
      this.pageIndex = 0
    } else {
      this.paramSearch.pageIndex = event.pageIndex + 1
    }
    this.paramSearch.limit = event.pageSize
    this.loadDataAbsent();
  }

}
