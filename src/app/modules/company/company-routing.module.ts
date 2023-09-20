import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { EmployeeComponent } from './components/employee/employee.component';

const routes: Routes = [{
  path: '', component: CompanyComponent,
  children: [
    { path: 'leave-types', component: LeaveTypeComponent },
    { path: 'holidays', component: HolidayComponent },
    { path: 'employee', component: EmployeeComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
