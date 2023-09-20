import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CompanyRoutingModule } from './company-routing.module';



@NgModule({
  declarations: [
    CompanyComponent,
    LeaveTypeComponent,
    HolidayComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule
  ]
})
export class CompanyModule { }
