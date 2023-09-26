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
const ELEMENT_DATA: DepartmentModel[] = [
  { code: "1", name: 'Hydrogen', office: "test", manager: "bod" },
  { code: "2", name: 'test', office: "test", manager: "bod" },
  { code: "3", name: 'test1', office: "test", manager: "bod" },
];
@Component({
  selector: 'app-leave-type-management',
  templateUrl: './leave-type-management.component.html',
  styleUrls: ['./leave-type-management.component.scss']
})
export class LeaveTypeManagementComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'allowance', 'description', 'action'];
  dataSource: MatTableDataSource<DepartmentModel>;
  dialogRef: MatDialogRef<AddEditLeaveTypePopupComponent>;
  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {
    super()
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
  }

  deleteLeaveType(item: LeaveType): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to delete this leave type?"
    inputPopupData.primarySubmit = true;
    const confirmDeletePopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmDeletePopup.componentInstance.data = inputPopupData;
    confirmDeletePopup.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(confirm => {
      console.log("test");
    });
  }

  openAddEditPopup(): void {
    this.dialogRef = this.dialog.open(AddEditLeaveTypePopupComponent, {
      width: `500px`,
      disableClose: true
    });
    if (this.dialogRef && this.dialogRef.componentInstance) {
      const data = Object.assign({}, this.dataSource);
    }
  }
}
