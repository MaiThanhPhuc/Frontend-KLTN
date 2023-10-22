import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { OfficeModel } from 'src/app/models/office.model';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { TeamModel } from 'src/app/models/team.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { BaseComponent } from 'src/app/utils/base.component';

const ELEMENT_DATA1: OfficeModel[] = [
  { code: "1", name: 'Hydrogen', address: "test", createDate: new Date("20-2-2000") },
  { code: "2", name: 'test', address: "test", createDate: new Date("20-2-2000") },
  { code: "3", name: 'test1', address: "test", createDate: new Date("20-2-2000") },
];

const ELEMENT_DATA2: DepartmentModel[] = [
  // { code: "1", name: 'Hydrogen', office: "test", manager: "bod" },
  // { code: "2", name: 'test', office: "test", manager: "bod" },
  // { code: "3", name: 'test1', office: "test", manager: "bod" },
];

const ELEMENT_DATA3: TeamModel[] = [
  // { code: "1", name: 'Hydrogen', department: "test", leader: "jack" },
  // { code: "2", name: 'test', department: "test", leader: "jack" },
  // { code: "3", name: 'test1', department: "test", leader: "jack" },
];

enum TableMode {
  employee = 0,
  team = 1,
  department = 2,
  office = 3,
}


@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent extends BaseComponent implements OnInit {

  selectedTable?: TableMode = TableMode.employee;
  currentDisplayTable: string[] = [];
  displayedEmployeeColumns: string[] = ['code', 'name', 'team', 'department', 'role', 'action'];
  displayedTeamColumns: string[] = ['code', 'name', 'department', 'deleteDate', 'action'];
  displayedDepartmentColumns: string[] = ['code', 'name', 'office', 'deleteDate', 'action'];
  displayedOfficeColumns: string[] = ['code', 'name', 'address', 'deleteDate', 'action'];
  dataSourceOffice: MatTableDataSource<any> = new MatTableDataSource(ELEMENT_DATA1);
  get tableMode() { return TableMode; }
  constructor(
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentDisplayTable = this.displayedEmployeeColumns;
  }


  onChangeSelectTable() {
    console.log(this.selectedTable);
    switch (this.selectedTable) {
      case TableMode.employee:
        this.currentDisplayTable = this.displayedEmployeeColumns;
        this.dataSourceOffice = new MatTableDataSource(ELEMENT_DATA1);
        break;
      case TableMode.team:
        this.currentDisplayTable = this.displayedTeamColumns;
        this.dataSourceOffice = new MatTableDataSource(ELEMENT_DATA3);
        break;
      case TableMode.department:
        this.currentDisplayTable = this.displayedDepartmentColumns;
        this.dataSourceOffice = new MatTableDataSource(ELEMENT_DATA2);
        break;
      case TableMode.office:
        this.currentDisplayTable = this.displayedOfficeColumns;
        this.dataSourceOffice = new MatTableDataSource(ELEMENT_DATA1);
        break;
      default:
        break;
    }
  }

  restoreItem(item: any): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.primarySubmit = true;

    switch (this.selectedTable) {
      case TableMode.employee:
        inputPopupData.content = "Do you want to restore this employee?"
        break;
      case TableMode.team:
        inputPopupData.content = "Do you want to restore this team?"
        break;
      case TableMode.department:
        inputPopupData.content = "Do you want to restore this deaprtment ?"
        break;
      case TableMode.office:
        inputPopupData.content = "Do you want to restore this office?"
        break;
      default:
        break;
    }


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

}
