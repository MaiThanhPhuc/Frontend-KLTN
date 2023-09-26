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


const ELEMENT_DATA: OfficeModel[] = [
  { code: "1", name: 'Hydrogen', address: "test", phone: 1232 },
  { code: "2", name: 'test', address: "test", phone: 123 },
  { code: "3", name: 'test1', address: "test", phone: 133 },
];
@Component({
  selector: 'app-company-office',
  templateUrl: './company-office.component.html',
  styleUrls: ['./company-office.component.scss']
})
export class CompanyOfficeComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'address', 'phone', 'action'];
  dataSource: MatTableDataSource<OfficeModel> = new MatTableDataSource(ELEMENT_DATA);
  dialogRef: MatDialogRef<AddEditCommonPopupComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {
    super();
  }
  ngOnInit() {

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

  openAddEditPopup(): void {
    this.dialogRef = this.dialog.open(AddEditCommonPopupComponent, {
      width: `500px`,
      disableClose: true
    });
    if (this.dialogRef && this.dialogRef.componentInstance) {
      const data = Object.assign({}, this.dataSource);
      this.dialogRef.componentInstance.mode = EditMode.OFFICE;
      this.dialogRef.componentInstance.officeData = ELEMENT_DATA[0];

      this.dialogRef.componentInstance.onSubmitOffice.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: OfficeModel) => {
        console.log(123);
      });
    }
  }
}
