import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { AddEditCommonPopupComponent } from '../add-edit-common-popup/add-edit-common-popup.component';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { EditMode } from '../add-edit-common-popup/add-edit-common.model';
import { takeUntil } from 'rxjs/operators';


const ELEMENT_DATA: TeamModel[] = [
  { code: "1", name: 'Hydrogen', department: "test", leader: "jack" },
  { code: "2", name: 'test', department: "test", leader: "jack" },
  { code: "3", name: 'test1', department: "test", leader: "jack" },
];
@Component({
  selector: 'app-company-team',
  templateUrl: './company-team.component.html',
  styleUrls: ['./company-team.component.scss']
})
export class CompanyTeamComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'department', 'leader', 'action'];
  dataSource: MatTableDataSource<TeamModel>;
  dialogRef: MatDialogRef<AddEditCommonPopupComponent>;

  constructor(
    private router: Router,
    private dialog: MatDialog,
  ) {
    super();
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }
  ngOnInit() {
  }

  archiveTeam(item: TeamModel): void {
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
      this.dialogRef.componentInstance.mode = EditMode.TEAM;
      this.dialogRef.componentInstance.teamData = ELEMENT_DATA[0];

      this.dialogRef.componentInstance.onSubmitTeam.pipe(takeUntil(this.ngUnsubscribe)).subscribe((user: TeamModel) => {
        console.log(123);
      });
    }
  }
}
