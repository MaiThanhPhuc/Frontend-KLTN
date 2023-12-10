import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { BaseComponent } from 'src/app/utils/base.component';
import { takeUntil } from 'rxjs';
import { AddEditLeaveTypePopupComponent } from './add-edit-leave-type-popup/add-edit-leave-type-popup.component';
import { LeaveType } from 'src/app/models/leaveType.model';
import { LeaveTypeService } from '../../services/leaveType.service';
import { SearchModal } from 'src/app/models/employee.model';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-leave-type-management',
  templateUrl: './leave-type-management.component.html',
  styleUrls: ['./leave-type-management.component.scss']
})
export class LeaveTypeManagementComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'allowance', 'description', 'action'];
  dataSource: any;
  dialogRef: MatDialogRef<AddEditLeaveTypePopupComponent>;

  isLoading = false
  paramSearch: SearchModal = {};
  pageSize = 100;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private leaveTypeService: LeaveTypeService
  ) {
    super()
  }

  ngOnInit() {
    this.initParamSearch();
    this.loadData();
  }

  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword
    }
  }

  onSearchKeyword() {
    this.paramSearch.keyword = this.keyword
    this.loadData();
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

  deleteLeaveType(item: LeaveType): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to delete this leave type ?"
    inputPopupData.primarySubmit = true;
    const confirmDeletePopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmDeletePopup.componentInstance.data = inputPopupData;
    confirmDeletePopup.afterClosed().subscribe(confirm => {
      this.isLoading = true
      // this.leaveTypeService.de(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      //   if (res) {
      //     ToastService.success("Archive office success")
      //     this.loadData();
      //   }
      //   this.isLoading = false
      // })
    });
  }

  openAddEditPopup(item?: LeaveType): void {
    this.dialogRef = this.dialog.open(AddEditLeaveTypePopupComponent, {
      width: `700px`,
      height: `600px`,
      disableClose: true
    });
    if (this.dialogRef && this.dialogRef.componentInstance) {
      const data = Object.assign({}, this.dataSource);
      if (item) this.dialogRef.componentInstance.leaveTypeData = item
      this.dialogRef.componentInstance.onSubmit.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: LeaveType) => {
        if (dataSave) this.onSaveDepartment(dataSave)
      });

      this.dialogRef.componentInstance.onClose.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
        this.loadData()
      });
    }
  }

  onSaveDepartment(data: LeaveType) {
    this.isLoading = true;
    if (data._id) {
      this.leaveTypeService.updateLeaveTypeById(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) {
          this.loadData();
          this.dialogRef.close()
        }
        this.isLoading = false
      });
    } else {
      this.leaveTypeService.createLeaveType(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) console.log(res);
        this.isLoading = false
        this.loadData();
        this.dialogRef.close()
      });
    }

  }

  loadData() {
    this.isLoading = true
    this.leaveTypeService.searchLeaveType(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
        this.isLoading = false
      }

    });
    this.isLoading = false
  }
}
