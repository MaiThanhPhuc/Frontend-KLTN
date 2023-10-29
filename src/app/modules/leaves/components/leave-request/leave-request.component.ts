import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';
import { SearchModal } from 'src/app/models/employee.model';
import { SearchTeamResponse, TeamModel } from 'src/app/models/team.model';
import { AdminService } from 'src/app/modules/admin/services/admin.service';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})

export class LeaveRequestComponent extends BaseComponent implements OnInit {
  displayedColumns: string[] = ['code', 'name', 'department', 'leader', 'action'];
  dataSource: MatTableDataSource<TeamModel>;
  isLoading = false
  paramSearch: SearchModal = {};
  pageSize = 5;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  countAllData = 0
  keyword = ''

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private adminService: AdminService
  ) {
    super();
  }

  ngOnInit(): void {
    this.initParamSearch();
    this.loadData()
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

  loadData() {
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


}

