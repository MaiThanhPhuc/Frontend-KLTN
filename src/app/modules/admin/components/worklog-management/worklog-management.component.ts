import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { SearchModal } from 'src/app/models/employee.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { WorkLogService } from '../../services/workLog.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-worklog-management',
  templateUrl: './worklog-management.component.html',
  styleUrls: ['./worklog-management.component.scss']
})
export class WorklogManagementComponent extends BaseComponent implements OnInit {
  @ViewChild('filterDrawer') public drawer: MatDrawer;
  displayedColumns: string[] = ['code', 'name', 'team', 'date', 'time', 'type', 'description', 'status'];
  dataSource: any;

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
    private workLogService: WorkLogService
  ) {
    super();
  }
  ngOnInit(): void {
    this.initParamSearch();
    this.loadData();
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

  onClose() {
    if (!this.drawer.opened) {
    }

  }
  clearFilter() {

  }

  filter() {

  }

}
