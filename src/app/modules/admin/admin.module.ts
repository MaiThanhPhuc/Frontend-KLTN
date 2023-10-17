import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LeaveTypeManagementComponent } from './components/leave-type-management/leave-type-management.component';
import { HolidaysManagementComponent } from './components/holidays-management/holidays-management.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { CompanyEmployeeComponent } from './components/company-management/company-employee/company-employee.component';
import { CompanyTeamComponent } from './components/company-management/company-team/company-team.component';
import { CompanyDepartmentComponent } from './components/company-management/company-department/company-department.component';
import { CompanyOfficeComponent } from './components/company-management/company-office/company-office.component';
import { AddEditEmployeeComponent } from './components/company-management/add-edit-employee/add-edit-employee.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AddEditCommonPopupComponent } from './components/company-management/add-edit-common-popup/add-edit-common-popup.component';
import { ArchiveComponent } from './components/company-management/archive/archive.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AddEditLeaveTypePopupComponent } from './components/leave-type-management/add-edit-leave-type-popup/add-edit-leave-type-popup.component';
import { AppCommonModule } from '../common/app-common.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
@NgModule({
  declarations: [
    AdminComponent,
    CompanyManagementComponent,
    LeaveTypeManagementComponent,
    HolidaysManagementComponent,
    CompanyEmployeeComponent,
    CompanyTeamComponent,
    CompanyDepartmentComponent,
    CompanyOfficeComponent,
    AddEditEmployeeComponent,
    AddEditCommonPopupComponent,
    ArchiveComponent,
    AddEditLeaveTypePopupComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatButtonToggleModule,
    ReactiveFormsModule,
    AppCommonModule
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
})
export class AdminModule { }