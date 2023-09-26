import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { BaseComponent } from 'src/app/utils/base.component';
import { AddEditCommonPopupComponent } from '../add-edit-common-popup/add-edit-common-popup.component';
import { EditMode } from '../add-edit-common-popup/add-edit-common.model';
import { takeUntil } from 'rxjs';
const ELEMENT_DATA: DepartmentModel[] = [
  { code: "1", name: 'Hydrogen', office: "test", manager: "bod" },
  { code: "2", name: 'test', office: "test", manager: "bod" },
  { code: "3", name: 'test1', office: "test", manager: "bod" },
];
@Component({
  selector: 'app-company-department',
  templateUrl: './company-department.component.html',
  styleUrls: ['./company-department.component.scss']
})
export class CompanyDepartmentComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'office', 'manager', 'action'];
  dataSource: MatTableDataSource<DepartmentModel>;
  dialogRef: MatDialogRef<AddEditCommonPopupComponent>;
  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {
    super()
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit() {
  }

  archiveDepartment(item: DepartmentModel): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to archive this deaprtment ?"
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
    this.dialogRef = this.dialog.open(AddEditCommonPopupComponent, {
      width: `500px`,
      disableClose: true
    });
    if (this.dialogRef && this.dialogRef.componentInstance) {
      const data = Object.assign({}, this.dataSource);
      this.dialogRef.componentInstance.mode = EditMode.DEPARTMENT;
      this.dialogRef.componentInstance.departmentData = ELEMENT_DATA[0];

      this.dialogRef.componentInstance.onSubmitDepartment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: DepartmentModel) => {
        console.log(123);
      });
    }
  }

}
