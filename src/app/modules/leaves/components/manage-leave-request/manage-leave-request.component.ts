import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { SearchModal } from 'src/app/models/employee.model';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-manage-leave-request',
  templateUrl: './manage-leave-request.component.html',
  styleUrls: ['./manage-leave-request.component.scss']
})
export class ManageLeaveRequestComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['request_date', 'leave_type', 'leave_time', 'total_leave', 'status', 'action'];
  dataSource: MatTableDataSource<any>;
  isLoading = false
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  currentUserId: string
  leaveRequestData: any
  constructor(
    private router: Router,
    private adminService: AdminService,
    private leaveTypeService: LeaveTypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.initParamSearch();
    this.loadData()
  }

  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      employeeId: this.currentUserId
    }
  }

  onSearchKeyword() {
    this.paramSearch.keyword = this.keyword
    this.loadData();
  }

  loadData() {
    this.isLoading = true

    this.leaveTypeService.getLeaveRequestByApprove(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
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
