import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesComponent } from './leaves.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { LeavesHistoryComponent } from './components/leaves-history/leaves-history.component';
import { LeaveManagementComponent } from './components/leave-management/leave-management.component';
import { LeavesRoutingModule } from './leaves-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { LeaveRequestFormComponent } from './components/leave-request/leave-request-form/leave-request-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    LeavesComponent,
    LeaveRequestComponent,
    CalendarComponent,
    MyLeavesComponent,
    LeavesHistoryComponent,
    LeaveManagementComponent,
    LeaveRequestFormComponent,
  ],
  imports: [
    CommonModule,
    LeavesRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class LeavesModule { }
