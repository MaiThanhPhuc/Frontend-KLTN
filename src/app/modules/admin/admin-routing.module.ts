import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LeaveTypeComponent } from '../company/components/leave-type/leave-type.component';
import { HolidayComponent } from '../company/components/holiday/holiday.component';
import { CompanyManagementComponent } from './components/company-management/company-management.component';
import { CompanyEmployeeComponent } from './components/company-management/company-employee/company-employee.component';
import { CompanyTeamComponent } from './components/company-management/company-team/company-team.component';
import { CompanyDepartmentComponent } from './components/company-management/company-department/company-department.component';
import { CompanyOfficeComponent } from './components/company-management/company-office/company-office.component';
import { AddEditEmployeeComponent } from './components/company-management/add-edit-employee/add-edit-employee.component';

const routes: Routes = [{
  path: '', component: AdminComponent,
  children: [
    {
      path: 'company', component: CompanyManagementComponent, children: [
        {
          path: 'employee', component: CompanyEmployeeComponent
        },
        {
          path: 'employee/:id', component: AddEditEmployeeComponent
        },
        {
          path: 'team', component: CompanyTeamComponent
        },
        {
          path: 'department', component: CompanyDepartmentComponent
        },
        {
          path: 'office', component: CompanyOfficeComponent
        },
      ]
    },
    { path: 'leave-type', component: LeaveTypeComponent },
    { path: 'holidays', component: HolidayComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
