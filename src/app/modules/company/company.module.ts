import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { LeaveTypeComponent } from './components/leave-type/leave-type.component';
import { HolidayComponent } from './components/holiday/holiday.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { CompanyRoutingModule } from './company-routing.module';
import { LoadingService } from 'src/app/services/loading.service';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AppCommonModule } from '../common/app-common.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CompanyComponent,
    LeaveTypeComponent,
    HolidayComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    MatFormFieldModule,
    MatPaginatorModule,
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
    MatButtonToggleModule,
    ReactiveFormsModule,
    AppCommonModule,
    MatCheckboxModule,
    MatDialogModule
  ],
  providers: [
    LoadingService,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        subscriptSizing: 'dynamic'
      }
    }
  ],
})
export class CompanyModule { }
