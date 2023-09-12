import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPermissionService } from './guards/auth-permission.service';

const routes: Routes = [
  {
    path: 'home',
    // canActivate: [AuthPermissionService],
    children: [
      {
        path: '',
        // canActivateChild: [AuthPermissionService],
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      }
    ],
    data: { controller: 'location' }
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
