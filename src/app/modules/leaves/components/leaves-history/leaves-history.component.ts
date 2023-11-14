import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { Employee, SearchModal } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { BaseComponent } from 'src/app/utils/base.component';
@Component({
  selector: 'app-leaves-history',
  templateUrl: './leaves-history.component.html',
  styleUrls: ['./leaves-history.component.scss']
})
export class LeavesHistoryComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'leave_type', 'leave_time', 'role', 'office', 'department', 'team'];
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
    this.loadDate();
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
    this.loadDate();
  }
  loadDate() {
    this.isLoading = true

    this.leaveTypeService.getLeaveRequestHistory(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
        console.log(res.result);
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
    this.loadDate();
  }
}
