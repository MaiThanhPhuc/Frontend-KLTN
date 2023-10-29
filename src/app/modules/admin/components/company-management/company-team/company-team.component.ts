import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SearchTeamResponse, TeamModel } from 'src/app/models/team.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { AddEditCommonPopupComponent } from '../add-edit-common-popup/add-edit-common-popup.component';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { EditMode } from '../add-edit-common-popup/add-edit-common.model';
import { takeUntil } from 'rxjs/operators';
import { AdminService } from '../../../services/admin.service';
import { Employee, SearchModal } from 'src/app/models/employee.model';
import { PageEvent } from '@angular/material/paginator';
import { Constants } from 'src/app/constants';
import { ToastService } from 'src/app/modules/common/toast/toast.service';

@Component({
  selector: 'app-company-team',
  templateUrl: './company-team.component.html',
  styleUrls: ['./company-team.component.scss']
})
export class CompanyTeamComponent extends BaseComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['code', 'name', 'department', 'leader', 'action'];
  dataSource: MatTableDataSource<TeamModel>;
  dialogRef: MatDialogRef<AddEditCommonPopupComponent>;
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

  ngOnInit() {
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

  archiveTeam(item: TeamModel): void {
    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to archive this team ?"
    inputPopupData.primarySubmit = true;
    const confirmDeletePopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmDeletePopup.componentInstance.data = inputPopupData;
    confirmDeletePopup.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.isLoading = true
        item.status = Constants.DeactiveStatus.id
        this.adminService.updateTeamById(item).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            ToastService.success("Archive team success")
            this.loadData();
          }
          this.isLoading = false
        })

      }
    });
  }

  openAddEditPopup(item?: TeamModel): void {
    this.dialogRef = this.dialog.open(AddEditCommonPopupComponent, {
      width: `500px`,
      disableClose: true
    });
    if (this.dialogRef && this.dialogRef.componentInstance) {
      if (item) this.dialogRef.componentInstance.teamId = item._id

      this.dialogRef.componentInstance.mode = EditMode.TEAM;

      this.dialogRef.componentInstance.onSubmitTeam.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: TeamModel) => {
        if (dataSave) this.onSaveTeam(dataSave)
      });
    }
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

  onSaveTeam(data: TeamModel) {
    this.isLoading = true;
    console.log(data);
    if (data._id) {
      this.adminService.updateTeamById(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) console.log(res);
        this.isLoading = false
        this.loadData();
        this.dialogRef.close()
      });
    } else {
      this.adminService.createTeam(data).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: string) => {
        if (res) console.log(res);
        this.isLoading = false
        this.loadData();
        this.dialogRef.close()
      });
    }

  }

}
