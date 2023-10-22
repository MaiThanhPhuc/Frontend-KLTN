import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee, EmployeeInfo, IEmployee, SearchModal, SearchEmployeeResponse } from 'src/app/models/employee.model';
import { Router } from '@angular/router';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { MatDialog } from '@angular/material/dialog';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { takeUntil } from 'rxjs';
import { BaseComponent } from 'src/app/utils/base.component';
import { EmployeeService } from '../../../services/employee.service';
@Component({
  selector: 'app-company-employee',
  templateUrl: './company-employee.component.html',
  styleUrls: ['./company-employee.component.scss']
})
export class CompanyEmployeeComponent extends BaseComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'name', 'email', 'team', 'department', 'office', 'role', 'action'];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 1;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  isLoading = false
  keyword = ''
  constructor(private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private dialog: MatDialog,
    private employeeService: EmployeeService
  ) {
    super()
    this.dataSource = new MatTableDataSource();
  }
  ngOnInit(): void {
    this.initParamSearch();
    this.getDataEmployee();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  handlePageEvent(event: PageEvent) {
    if (event.pageSize !== this.paramSearch.limit) {
      this.paramSearch.pageIndex = 1
      this.pageIndex = 0
    } else {
      this.paramSearch.pageIndex = event.pageIndex + 1
    }
    this.paramSearch.limit = event.pageSize
    this.getDataEmployee();
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

  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword
    }
  }

  onSearchKeyword() {
    this.paramSearch.keyword = this.keyword
    this.getDataEmployee();
  }

  onNavigateEdit(item: EmployeeInfo) {
    console.log("test");
    this.router.navigate(['admin/company/employee', item.code])
  }

  archiveEmployee(item: EmployeeInfo): void {
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
}
