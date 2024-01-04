import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OfficeModel, SearchOfficeResponse } from 'src/app/models/office.model';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { AddEditCommonPopupComponent } from '../add-edit-common-popup/add-edit-common-popup.component';
import { BaseComponent } from 'src/app/utils/base.component';
import { takeUntil } from 'rxjs/operators';
import { EditMode } from '../add-edit-common-popup/add-edit-common.model';
import { AdminService } from '../../../services/admin.service';
import { SearchModal } from 'src/app/models/employee.model';
import { PageEvent } from '@angular/material/paginator';
import { Constants } from 'src/app/constants';
import { ToastService } from 'src/app/modules/common/toast/toast.service';

@Component({
  selector: 'app-company-office',
  templateUrl: './company-office.component.html',
  styleUrls: ['./company-office.component.scss']
})
export class CompanyOfficeComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'address', 'phone', 'action'];
  dataSource: MatTableDataSource<OfficeModel>;

  dialogRef: MatDialogRef<AddEditCommonPopupComponent>;
  officeDate: OfficeModel;
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
    super();
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
  loadData() {
    this.isLoading = true
    this.adminService.searchOffice(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchOfficeResponse) => {
      if (res) {
        this.countAllData = res.totalItems
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
  archiveOffice(item: OfficeModel): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to archive this offices ?"
    inputPopupData.primarySubmit = true;
    const confirmDeletePopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmDeletePopup.componentInstance.data = inputPopupData;
    confirmDeletePopup.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.isLoading = true
        item.status = Constants.DeactiveStatus.id
        this.adminService.updateOfficeById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            ToastService.success("Archive office success")
            this.loadData();
          }
          this.isLoading = false
        })
      }
    });
  }

  openAddEditPopup(item?: OfficeModel): void {
    this.dialogRef = this.dialog.open(AddEditCommonPopupComponent, {
      width: `500px`,
      disableClose: true
    });
    if (this.dialogRef && this.dialogRef.componentInstance) {
      if (item) this.dialogRef.componentInstance.officeData = item;
      this.dialogRef.componentInstance.mode = EditMode.OFFICE;

      this.dialogRef.componentInstance.onSubmitOffice.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: OfficeModel) => {
        if (dataSave) this.onSaveOffice(dataSave)
      });

      this.dialogRef.componentInstance.onClose.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: OfficeModel) => {
        this.loadData()
      });
    }
  }

  onSaveOffice(data: OfficeModel) {
    this.isLoading = true;
    if (data._id) {
      this.adminService.updateOfficeById(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) {
          this.loadData();
          this.dialogRef.close()
        }
        this.isLoading = false
      });
    } else {
      this.adminService.createOffice(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) {
          this.loadData();
          this.dialogRef.close()
        }
        this.isLoading = false
      });
    }

  }
}
