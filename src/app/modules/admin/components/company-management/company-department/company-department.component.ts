import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentModel, SearchDepartmentResponse } from 'src/app/models/deparment.model';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { BaseComponent } from 'src/app/utils/base.component';
import { AddEditCommonPopupComponent } from '../add-edit-common-popup/add-edit-common-popup.component';
import { EditMode } from '../add-edit-common-popup/add-edit-common.model';
import { takeUntil } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { OfficeModel } from 'src/app/models/office.model';
import { SearchModal } from 'src/app/models/employee.model';
import { PageEvent } from '@angular/material/paginator';
import { Constants } from 'src/app/constants';
import { ToastService } from 'src/app/modules/common/toast/toast.service';
@Component({
  selector: 'app-company-department',
  templateUrl: './company-department.component.html',
  styleUrls: ['./company-department.component.scss']
})
export class CompanyDepartmentComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'office', 'manager', 'action'];
  dataSource: MatTableDataSource<DepartmentModel>;
  dialogRef: MatDialogRef<AddEditCommonPopupComponent>;
  dataOffice: OfficeModel[];
  isLoading = false;
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private adminService: AdminService
  ) {
    super()
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.initParamSearch();
    this.loadData()
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

  archiveDepartment(item: DepartmentModel): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to archive this department?"
    inputPopupData.primarySubmit = true;
    const confirmDeletePopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmDeletePopup.componentInstance.data = inputPopupData;
    confirmDeletePopup.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(confirm => {
      if (confirm) {
        this.isLoading = true
        item.status = Constants.DeactiveStatus.id
        this.adminService.updateDepartmentById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            ToastService.success("Restore department success")
            this.loadData();
          }
          this.isLoading = false
        })
      }
    });
  }

  openAddEditPopup(item?: DepartmentModel): void {
    this.dialogRef = this.dialog.open(AddEditCommonPopupComponent, {
      width: `500px`,
      disableClose: true
    });
    if (this.dialogRef && this.dialogRef.componentInstance) {
      if (item) this.dialogRef.componentInstance.departmentId = item._id
      this.dialogRef.componentInstance.mode = EditMode.DEPARTMENT;

      this.dialogRef.componentInstance.onSubmitDepartment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: DepartmentModel) => {
        if (dataSave) this.onSaveDepartment(dataSave)
      });
      this.dialogRef.componentInstance.onClose.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
        this.loadData();
      });
    }
  }

  loadData() {
    this.isLoading = true
    this.adminService.searchDepartment(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchDepartmentResponse) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
        this.isLoading = false
      }

    });
  }

  onSaveDepartment(data: DepartmentModel) {
    this.isLoading = true;
    if (data._id) {
      this.adminService.updateDepartmentById(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) {
          this.loadData();
          this.dialogRef.close()
        }
        this.isLoading = false
      });
    } else {
      this.adminService.createDepartment(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) {
          this.loadData();
          this.dialogRef.close()
        }
        this.isLoading = false
      });
    }

  }

}
