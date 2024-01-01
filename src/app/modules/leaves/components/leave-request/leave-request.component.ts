import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { Constants } from 'src/app/constants';
import { SearchModal } from 'src/app/models/employee.model';
import { LeaveRequest } from 'src/app/models/leaveType.model';
import { OptionModel } from 'src/app/models/optionsModel';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SearchTeamResponse, TeamModel } from 'src/app/models/team.model';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { ToastService } from 'src/app/modules/common/toast/toast.service';
import { GlobalService } from 'src/app/services/global.service';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})

export class LeaveRequestComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['request_date', 'leave_type', 'leave_time', 'total_leave', 'status', 'action'];
  dataSource: MatTableDataSource<LeaveRequest>;
  isLoading = false
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  currentUserId: string
  leaveRequestData: any
  leaveTypeOptions: OptionModel[];
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private globalService: GlobalService,
    private leaveTypeService: LeaveTypeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.initParamSearch();
    this.loadData();
    this.getAllLeaveType();
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
    this.leaveTypeService.searchLeaveRequest(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
      }
      this.isLoading = false
    });
  }

  getAllLeaveType() {
    this.isLoading = true
    this.leaveTypeService.getLeaveTypeByEmployeeId(this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) this.leaveTypeOptions = res.map(item => new OptionModel(item.leaveType.name, item.leaveType._id))
      this.isLoading = false
    })
  }

  createLeaveRequest(leaveRequestData: any) {
    leaveRequestData.employee = this.currentUserId
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to use this leave type?"
    inputPopupData.primarySubmit = true;
    const confirmRequestPopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmRequestPopup.componentInstance.data = inputPopupData;
    confirmRequestPopup.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(confirm => {
      if (confirm) {
        this.isLoading = true
        this.leaveTypeService.createLeaveRequest(leaveRequestData).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            ToastService.success("Create leave request success!")
            this.loadData();
            this.globalService.announceReloadUserLeaveTable(true);
          }
          this.isLoading = false
        })

      }
    });
  }

  updateStatus(item: any) {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to cancel this leave request?"
    inputPopupData.primarySubmit = true;
    const confirmRequestPopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmRequestPopup.componentInstance.data = inputPopupData;
    confirmRequestPopup.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(confirm => {
      if (confirm) {
        this.isLoading = true
        item.status = Constants.LeaveRequestCancelOption.id
        this.leaveTypeService.updateLeaveRequestById(item._id, item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            ToastService.success("Cancel leave request success!")
            this.loadData();
            this.globalService.announceReloadUserLeaveTable(true);
            this.isLoading = false
          }
        })

      }
    })
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
  openDetailLeaveRequest(item: LeaveRequest) {
    this.router.navigate([`/leaves/leave-request-detail/${item._id}`])
  }

}

