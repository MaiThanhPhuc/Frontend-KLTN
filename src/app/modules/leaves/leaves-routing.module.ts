import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeavesComponent } from './leaves.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MyLeavesComponent } from './components/my-leaves/my-leaves.component';
import { LeavesHistoryComponent } from './components/leaves-history/leaves-history.component';
import { LeaveManagementComponent } from './components/leave-management/leave-management.component';
import { LeaveRequestComponent } from './components/leave-request/leave-request.component';
import { ManageLeaveRequestComponent } from './components/manage-leave-request/manage-leave-request.component';
import { DetailLeaveRequestComponent } from './components/leave-request/detail-leave-request/detail-leave-request.component';

const routes: Routes = [{
  path: '', component: LeavesComponent,
  children: [
    { path: 'request', component: LeaveRequestComponent },
    { path: 'leave-request-detail/:id', component: DetailLeaveRequestComponent },
    { path: 'manage-request', component: ManageLeaveRequestComponent },
    { path: 'calendar', component: CalendarComponent },
    { path: 'my-leaves', component: MyLeavesComponent },
    { path: 'leaves-history', component: LeavesHistoryComponent },
    { path: 'leave-management', component: LeaveManagementComponent },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeavesRoutingModule { }
