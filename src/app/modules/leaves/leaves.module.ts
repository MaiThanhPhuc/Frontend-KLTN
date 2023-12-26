import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeavesComponent } from './leaves.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { AppCommonModule } from '../common/app-common.module';
import { HomeModule } from '../home/home.module';
import { ManageLeaveRequestComponent } from './components/manage-leave-request/manage-leave-request.component';
import { DetailLeaveRequestComponent } from './components/leave-request/detail-leave-request/detail-leave-request.component';
import { ChangeStatusLeaveRequestComponent } from './components/manage-leave-request/change-status-leave-request/change-status-leave-request.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SimpleConfirmPopupComponent } from '../common/simple-confirm-popup/simple-confirm-popup.component';
// import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
@NgModule({
  declarations: [
    LeavesComponent,
    LeaveRequestComponent,
    MyLeavesComponent,
    LeavesHistoryComponent,
    LeaveManagementComponent,
    LeaveRequestFormComponent,
    ManageLeaveRequestComponent,
    DetailLeaveRequestComponent,
    ChangeStatusLeaveRequestComponent,
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
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    AppCommonModule,
    FormsModule,
    HomeModule,
    MatDialogModule,
    FormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ]
})
export class LeavesModule { }
