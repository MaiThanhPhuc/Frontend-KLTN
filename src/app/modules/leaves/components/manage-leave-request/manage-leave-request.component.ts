import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { SearchModal } from 'src/app/models/employee.model';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { BaseComponent } from 'src/app/utils/base.component';
import { ChangeStatusLeaveRequestComponent } from './change-status-leave-request/change-status-leave-request.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manage-leave-request',
  templateUrl: './manage-leave-request.component.html',
  styleUrls: ['./manage-leave-request.component.scss']
})
export class ManageLeaveRequestComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['name', 'department', 'team', 'request_date', 'leave_type', 'leave_time', 'total_leave', 'status', 'action'];
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
  slectedStatus: any
  dialogRef: MatDialogRef<ChangeStatusLeaveRequestComponent>;
  approvals = []

  constructor(
    private router: Router,
    private adminService: AdminService,
    private dialog: MatDialog,
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
        this.leaveRequestData = res.result
        this.dataSource = new MatTableDataSource(res.result);
      }
      this.isLoading = false
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
    this.loadData();
  }
  updateStatus(item: any) {
    this.dialogRef = this.dialog.open(ChangeStatusLeaveRequestComponent, {
      width: `500px`,
      height: `550px`,
      disableClose: true
    });

    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.onSubmit.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
        if (res) {
          item.approvalStatus.map((data: any) => {
            if (this.currentUserId === data.employee) {
              data.status = res.status
              data.description = res.description
              data.updateDate = new Date()
            }
          })
          this.leaveTypeService.updateLeaveRequestByApprovalId(item._id, item).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
            if (res) {
              this.loadData()
              this.dialogRef.close()
            }
          })
        }
      });

      this.dialogRef.componentInstance.onClose.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        this.loadData()
      });
    }
  }

  openDetailLeaveRequest(item: any) {
    this.router.navigate([`/leaves/leave-request-detail/${item._id}`])
  }

}
