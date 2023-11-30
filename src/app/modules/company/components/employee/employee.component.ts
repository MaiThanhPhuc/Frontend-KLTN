import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Constants } from 'src/app/constants';
import { ToastService } from 'src/app/modules/common/toast/toast.service';
import { EmployeeService } from 'src/app/modules/admin/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'email', 'team', 'department', 'office', 'role'];
  dataSource: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  isLoading = false
  constructor(
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

  onNavigateEdit(item: Employee) {
    this.router.navigate([`admin/company/employee/edit/${item._id}`])
  }

  archiveEmployee(item: Employee): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to archive this employee ?"
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
        this.employeeService.updateEmployeeById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            ToastService.success("Archive employee success")
            this.getDataEmployee();
          }
          this.isLoading = false
        })

      }
    });
  }

}
