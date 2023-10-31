import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPermissionService } from './guards/auth-permission.service';
import { NotPermissionComponent } from './modules/not-permission/not-permission.component';
import { LoginComponent } from './modules/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home/dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    // canActivate: [AuthPermissionService],
    children: [
      {
        path: '',
        // canActivateChild: [AuthPermissionService],
        loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
      }
    ]
  },
  {
    path: 'home',
    // canActivate: [AuthPermissionService],
    children: [
      {
        path: '',
        // canActivateChild: [AuthPermissionService],
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: 'leaves',
    // canActivate: [AuthPermissionService],
    children: [
      {
        path: '',
        // canActivateChild: [AuthPermissionService],
        loadChildren: () => import('./modules/leaves/leaves.module').then(m => m.LeavesModule)
      }
    ]
  },
  {
    path: 'company',
    // canActivate: [AuthPermissionService],
    children: [
      {
        path: '',
        // canActivateChild: [AuthPermissionService],
        loadChildren: () => import('./modules/company/company.module').then(m => m.CompanyModule)
      }
    ]
  },
  {
    path: 'not-permission',
    component: NotPermissionComponent
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
