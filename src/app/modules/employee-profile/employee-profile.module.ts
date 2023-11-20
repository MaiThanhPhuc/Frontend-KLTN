import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeProfileComponent } from './employee-profile.component';
import { AppCommonModule } from '../common/app-common.module';



@NgModule({
  declarations: [
    EmployeeProfileComponent
  ],
  imports: [
    CommonModule,
    AppCommonModule
  ]
})
export class EmployeeProfileModule { }
