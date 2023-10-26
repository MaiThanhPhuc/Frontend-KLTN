import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { takeUntil } from 'rxjs';
import { DepartmentModel, SearchDepartmentResponse } from 'src/app/models/deparment.model';
import { OfficeModel, SearchOfficeResponse } from 'src/app/models/office.model';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SearchTeamResponse, TeamModel } from 'src/app/models/team.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { BaseComponent } from 'src/app/utils/base.component';
import { AdminService } from '../../../services/admin.service';
import { Employee, SearchEmployeeResponse, SearchModal } from 'src/app/models/employee.model';
import { PageEvent } from '@angular/material/paginator';
import { EmployeeService } from '../../../services/employee.service';
import { Constants } from 'src/app/constants';
import { ToastService } from 'src/app/modules/common/toast/toast.service';

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
  displayedEmployeeColumns: string[] = ['code', 'firstName', 'lastName', 'team', 'department', 'role', 'action'];
  displayedTeamColumns: string[] = ['code', 'name', 'department', 'updateDate', 'action'];
  displayedDepartmentColumns: string[] = ['code', 'name', 'office', 'updateDate', 'action'];
  displayedOfficeColumns: string[] = ['code', 'name', 'address', 'updateDate', 'action'];

  isLoading = false;
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''

  dataSource: any;

  get tableMode() { return TableMode; }
  constructor(
    private dialog: MatDialog,
    private adminService: AdminService,
    private employeeService: EmployeeService
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentDisplayTable = this.displayedEmployeeColumns;
    this.loadData();
  }


  onChangeSelectTable() {
    switch (this.selectedTable) {
      case TableMode.employee:
        this.currentDisplayTable = this.displayedEmployeeColumns;
        break;
      case TableMode.team:
        this.currentDisplayTable = this.displayedTeamColumns;
        break;
      case TableMode.department:
        this.currentDisplayTable = this.displayedDepartmentColumns;
        break;
      case TableMode.office:
        this.currentDisplayTable = this.displayedOfficeColumns;
        break;
      default:
        break;
    }
    this.loadData();
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
      if (confirm) {
        switch (this.selectedTable) {
          case TableMode.employee:
            this.restoreEmployee(item);
            break;
          case TableMode.team:
            this.restoreTeam(item);
            break;
          case TableMode.department:
            this.restoreDepartment(item)
            break;
          case TableMode.office:
            this.restoreOffice(item);
            break;
          default:
            break;
        }
      }
    });
  }

  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword
    }
  }

  loadData() {
    this.paramSearch.status = Constants.DeactiveStatus.id
    switch (this.selectedTable) {
      case TableMode.employee:
        this.getDataEmployee();
        break;
      case TableMode.team:
        this.loadDataTeam();
        break;
      case TableMode.department:
        this.loadDataDepartment()
        break;
      case TableMode.office:
        this.loadDataOffice();
        break;
      default:
        break;
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

  loadDataDepartment() {
    this.isLoading = true
    this.adminService.searchDepartment(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchDepartmentResponse) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
        this.isLoading = false
      }

    });
    this.isLoading = false
  }

  getDataEmployee() {
    this.isLoading = true
    this.employeeService.searchEmployee(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchEmployeeResponse) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result)
      }
      this.isLoading = false
    })
  }

  loadDataOffice() {
    this.isLoading = true
    this.adminService.searchOffice(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchOfficeResponse) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
      }
      this.isLoading = false
    });
    this.isLoading = false
  }

  loadDataTeam() {
    this.isLoading = true
    this.adminService.searchTeam(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchTeamResponse) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
      }
      this.isLoading = false
    });
    this.isLoading = false
  }

  restoreEmployee(item: Employee) {
    this.isLoading = true
    item.status = Constants.ActiveStatus.id
    this.employeeService.updateEmployeeById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        ToastService.success("Restore employee success!")
        this.getDataEmployee();
      }
      this.isLoading = false
    })
  }

  restoreTeam(item: TeamModel) {
    this.isLoading = true
    item.status = Constants.ActiveStatus.id
    this.adminService.updateTeamById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        ToastService.success("Restore team success")
        this.loadDataTeam();
      }
      this.isLoading = false
    })
  }

  restoreDepartment(item: DepartmentModel) {
    this.isLoading = true
    item.status = Constants.ActiveStatus.id
    this.adminService.updateDepartmentById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        ToastService.success("Restore department success")
        this.loadDataDepartment();
      }
      this.isLoading = false
    })
  }

  restoreOffice(item: OfficeModel) {
    this.isLoading = true
    item.status = Constants.ActiveStatus.id
    this.adminService.updateOfficeById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        ToastService.success("Restore office success")
        this.loadDataOffice();
      }
      this.isLoading = false
    })
  }

}
