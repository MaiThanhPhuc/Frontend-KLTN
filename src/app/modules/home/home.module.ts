import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkLogTimesheetComponent } from './components/work-log-timesheet/work-log-timesheet.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { UserLeaveTableComponent } from './components/dashboard/user-leave-table/user-leave-table.component';
import { AppCommonModule } from '../common/app-common.module';

@NgModule({
  declarations: [
    HomeComponent,
    DashboardComponent,
    WorkLogTimesheetComponent,
    UserLeaveTableComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    AppCommonModule
  ]
  , exports: [UserLeaveTableComponent]
})
export class HomeModule { }
