import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchModal } from 'src/app/models/employee.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { WorkLogService } from '../../services/workLog.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { combineLatest, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';
import { OptionModel } from 'src/app/models/optionsModel';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { TeamModel } from 'src/app/models/team.model';
import { AdminService } from '../../services/admin.service';
import { FormControl } from '@angular/forms';
import moment from 'moment';
import { DateAdapter } from 'angular-calendar';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { WorkLogReponse } from 'src/app/models/workLog.models';
import { PdfService } from '../../services/exportPdf.service';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf'
import { PayslipPdfComponent } from './payslip-pdf/payslip-pdf.component';
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-worklog-management',
  templateUrl: './worklog-management.component.html',
  styleUrls: ['./worklog-management.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class WorklogManagementComponent extends BaseComponent implements OnInit {
  @ViewChild('filterDrawer') public drawer: MatDrawer;
  @ViewChild('contentToConvert') contentToConvert!: ElementRef;
  displayedColumns: string[] = ['checkbox', 'code', 'name', 'team', 'time', 'status', 'action'];

  dialogRef: MatDialogRef<PayslipPdfComponent>;
  dataSource: any;
  dataWorkLog: any;
  isLoading = false
  paramSearch: SearchModal = {};
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''
  isCheckAll = false;
  isIndeterminate = false;
  countIsSelected = 0;
  allOffice: OptionModel[];
  allDepartment: DepartmentModel[];
  allTeam: TeamModel[];
  departmentOptions: OptionModel[];
  teamOptions: OptionModel[];
  selectedOffice: string;
  selectedDepartment: string;
  selectedTeam: string;
  date = new FormControl(moment());
  currentMonth = new Date().getMonth() + 1;
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private workLogService: WorkLogService,
    private adminService: AdminService,
    private pdfService: PdfService
  ) {
    super();
  }
  ngOnInit(): void {
    combineLatest(
      this.adminService.getAllOffice(),
      this.adminService.getAllDepartment(),
      this.adminService.getAllTeam(),
    ).pipe(takeUntil(this.ngUnsubscribe)).subscribe(([officeData, departmentData, teamData]) => {
      if (!officeData) return;
      this.allOffice = officeData.map(item => new OptionModel(item.name, item._id))
      this.allDepartment = departmentData;
      this.allTeam = teamData;
    })

    this.initParamSearch();
    this.loadData();
  }
  initParamSearch() {
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword,
      month: this.currentMonth,
    }
  }

  applyFilter() {
    let month = this.date.value?.month();
    this.paramSearch = {
      limit: this.pageSize,
      pageIndex: this.pageIndex,
      keyword: this.keyword,
      month: month ? month + 1 : this.currentMonth,
    }
    if (this.selectedTeam)
      this.paramSearch.teamId = this.selectedTeam;
    else if (this.selectedDepartment)
      this.paramSearch.departmentId = this.selectedDepartment;
    else if (this.selectedOffice)
      this.paramSearch.officeId = this.selectedOffice;
    this.loadData();
  }

  eventCheckAll() {
    this.isCheckAll = !this.isCheckAll;
    this.dataSource.data.map((x: any) => x.selected = this.isCheckAll);
  }

  changeCheckbox(item: any): void {
    this.dataSource.data.find((x: any) => x.id == item.id).selected = !item.selected;
  }


  onChangeSelectItems(option: any, type?: number) {
    switch (type) {
      case 1:
        this.selectedDepartment = "";
        this.selectedTeam = "";
        this.departmentOptions = this.allDepartment.filter(data => data.office._id === option.value).map(k => new OptionModel(k.name, k._id))
        break;
      case 2:
        this.selectedTeam = "";
        this.teamOptions = this.allTeam.filter(data => data.department._id === option.value).map(k => new OptionModel(k.name, k._id))
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

  loadData() {
    this.isLoading = true
    this.workLogService.searchWorkLog(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: WorkLogReponse) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataWorkLog = res
        this.dataSource = new MatTableDataSource(res.result);
        this.isLoading = false
      }
    });
  }

  loadAllDataWorkLog() {
    this.isLoading = true
    this.paramSearch.isGetAll = true;
    this.workLogService.searchWorkLog(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: any) => {
      if (res) {
        this.countAllData = res.totalItems
        this.dataWorkLog = res.result
        this.dataSource = new MatTableDataSource(res.result);
        this.isLoading = false
      }
    });
    this.isLoading = false
  }

  exportPayslip(row: any) {

    this.dialogRef = this.dialog.open(PayslipPdfComponent, {
      width: '97vw',
      maxWidth: '97vw',
      maxHeight: '97vh',
      height: '97vh',
      disableClose: true
    });
    if (row) this.dialogRef.componentInstance.dataSource = this.dataSource.data.find((x: any) => x._id == row._id)

    // this.dialogRef.componentInstance.onSubmitDepartment.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: DepartmentModel) => {
    //   if (dataSave) this.onSaveDepartment(dataSave)
    // });
    // this.dialogRef.componentInstance.onClose.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
    //   this.loadData();
    // });
  }

  setMonthAndYear(event: any, dp: any, input: any) {
    dp.close();
    input.value = event.toISOString().split('-').join('/').substr(0, 7);
  }
  calcSalary(item: any) {
    this.router.navigate([`admin/detail-worklog/${item._id}`])
  }
}
