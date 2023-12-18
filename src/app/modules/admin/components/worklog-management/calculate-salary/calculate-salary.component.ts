import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Employee, SearchModal } from 'src/app/models/employee.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkLogService } from '../../../services/workLog.service';
import { OptionModel } from 'src/app/models/optionsModel';
import { EmployeeService } from '../../../services/employee.service';
import { EmployeeLeaveTypeReponse } from 'src/app/models/leaveType.model';


@Component({
  selector: 'app-calculate-salary',
  templateUrl: './calculate-salary.component.html',
  styleUrls: ['./calculate-salary.component.scss']
})
export class CalculateSalaryComponent extends BaseComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(new Date(new Date().getFullYear(), new Date().getMonth(), 1)),
    end: new FormControl<Date | null>(new Date()),
  });
  // @ViewChild('filterDrawer') public drawer: MatDrawer;
  displayedColumns: string[] = ['code', 'name', 'team', 'date', 'time', 'description', 'status'];
  dataSource: any;
  statusWorkLog: OptionModel[] = [
    new OptionModel("Valid", 1),
    new OptionModel("Invalid", 0)
  ]

  employeeId: string;
  dataSourceLeaveType: any;
  userData: Employee;

  isLoading = false
  paramSearch: SearchModal = {};
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private workLogService: WorkLogService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.ngUnsubscribe)).subscribe(params => {
      this.employeeId = params['id'];
    });
    this.initParamSearch();
    this.loadData();
    this.loadDataEmployee();
  }
  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword,
      employeeId: this.employeeId
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


  loadData() {
    this.isLoading = true
    this.workLogService.searchWorkLog(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataSource = new MatTableDataSource(res.result);
        this.isLoading = false
      }

    });
    this.isLoading = false
  }

  loadDataEmployee() {
    this.isLoading = true;
    this.employeeService.getEmployeeById(this.employeeId).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: EmployeeLeaveTypeReponse) => {
      if (res) {
        this.userData = res.employeeInfo
        this.dataSourceLeaveType = res.leaveType
        this.isLoading = false
      }

    })
  }
  onClose() {
    // if (!this.drawer.opened) {
    // }

  }
  clearFilter() {

  }

  filter() {

  }
}
