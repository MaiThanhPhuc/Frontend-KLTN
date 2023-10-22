import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OfficeModel } from 'src/app/models/office.model';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { AddEditCommonPopupComponent } from '../add-edit-common-popup/add-edit-common-popup.component';
import { BaseComponent } from 'src/app/utils/base.component';
import { takeUntil } from 'rxjs/operators';
import { EditMode } from '../add-edit-common-popup/add-edit-common.model';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-company-office',
  templateUrl: './company-office.component.html',
  styleUrls: ['./company-office.component.scss']
})
export class CompanyOfficeComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'address', 'phone', 'action'];
  dataSource: MatTableDataSource<OfficeModel> = new MatTableDataSource();

  dialogRef: MatDialogRef<AddEditCommonPopupComponent>;
  officeDate: OfficeModel;
  isLoading = false;


  constructor(
    private router: Router,
    private dialog: MatDialog,
    private adminService: AdminService
  ) {
    super();
  }
  ngOnInit() {

    this.loadData();

    if (!this.officeDate) {
      this.initOfficeData()
    }
  }

  initOfficeData() {
    this.officeDate = {
      name: '',
      address: ""
    }
  }

  loadData() {
    this.isLoading = true
    this.adminService.getAllOffice().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: OfficeModel[]) => {
      if (res) console.log(res);
      this.dataSource = new MatTableDataSource(res);
      this.isLoading = false
    });
    this.isLoading = false
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
      console.log("test");
    });
  }

  openAddEditPopup(item?: OfficeModel): void {
    this.dialogRef = this.dialog.open(AddEditCommonPopupComponent, {
      width: `500px`,
      disableClose: true
    });
    this.initOfficeData()
    if (this.dialogRef && this.dialogRef.componentInstance) {
      const data = Object.assign({}, this.dataSource);
      this.dialogRef.componentInstance.mode = EditMode.OFFICE;
      this.dialogRef.componentInstance.officeData = item ? item : this.officeDate;

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
    console.log(data);
    if (data._id) {
      this.adminService.updateOfficeById(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) console.log(res);
        this.isLoading = false
        this.loadData();
        this.dialogRef.close()
      });
    } else {
      this.adminService.createOffice(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) console.log(res);
        this.isLoading = false
        this.loadData();
        this.dialogRef.close()
      });
    }

  }
}
