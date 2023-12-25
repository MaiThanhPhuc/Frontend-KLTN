import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { CompanyEmployeeComponent } from './components/company-management/company-employee/company-employee.component';
import { CompanyTeamComponent } from './components/company-management/company-team/company-team.component';
import { CompanyDepartmentComponent } from './components/company-management/company-department/company-department.component';
import { CompanyOfficeComponent } from './components/company-management/company-office/company-office.component';
import { AddEditEmployeeComponent } from './components/company-management/add-edit-employee/add-edit-employee.component';
import { ArchiveComponent } from './components/company-management/archive/archive.component';
import { LeaveTypeManagementComponent } from './components/leave-type-management/leave-type-management.component';
import { HolidaysManagementComponent } from './components/holidays-management/holidays-management.component';
import { ImportDataComponent } from './components/import-data/import-data.component';
import { WorklogManagementComponent } from './components/worklog-management/worklog-management.component';
import { CalculateSalaryComponent } from './components/worklog-management/calculate-salary/calculate-salary.component';
import { AuthPermissionService } from 'src/app/guards/auth-permission.service';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    { path: '', redirectTo: '/company/employee', pathMatch: 'full' },
    {
      path: 'company', component: CompanyManagementComponent,
      children: [
        {
          path: '', redirectTo: '/company/employee', pathMatch: 'full'
        },
        {
          path: 'employee', component: CompanyEmployeeComponent
        },
        {
          path: 'employee/edit/:id', component: AddEditEmployeeComponent
        },
        {
          path: 'employee/add', component: AddEditEmployeeComponent
        },
        {
          path: 'team', component: CompanyTeamComponent
        },
        {
          path: 'department', component: CompanyDepartmentComponent
        },
        {
          path: 'office', component: CompanyOfficeComponent,
        },
        {
          path: 'archive', component: ArchiveComponent,
        },
      ]
    },
    { path: 'leave-type', component: LeaveTypeManagementComponent },
    { path: 'work-log', component: WorklogManagementComponent },
    { path: 'detail-worklog/:id', component: CalculateSalaryComponent },
    { path: 'holidays', component: HolidaysManagementComponent },
    { path: 'import-data', component: ImportDataComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
