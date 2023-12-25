import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPermissionService } from './guards/auth-permission.service';
import { NotPermissionComponent } from './modules/not-permission/not-permission.component';
import { LoginComponent } from './modules/login/login.component';
import { EmployeeProfileComponent } from './modules/employee-profile/employee-profile.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    canActivate: [AuthPermissionService],
    data: { expectedPermission: 'humanResource' },
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'home',
    canActivate: [AuthPermissionService],
    data: { expectedPermission: 'member' },
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: 'leaves',
    canActivate: [AuthPermissionService],
    data: { expectedPermission: 'member' },
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/leaves/leaves.module').then(m => m.LeavesModule)
      }
    ]
  },
  {
    path: 'company',
    canActivate: [AuthPermissionService],
    data: { expectedPermission: 'member' },
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule)
      }
    ]
  },
  {
    path: 'not-permission',
    component: NotPermissionComponent
  },
  {
    path: 'employee-info',
    canActivate: [AuthPermissionService],
    data: { expectedPermission: 'member' },
    component: EmployeeProfileComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
