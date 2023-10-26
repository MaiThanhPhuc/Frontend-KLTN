import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MenuItemComponent } from './layout/sidebar-menu/menu-item/menu-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SimpleConfirmPopupComponent } from './simple-confirm-popup/simple-confirm-popup.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoadingComponent } from './loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GetRoleEmployee } from './pipe/get-role-employee.pipe';
@NgModule({
  declarations: [
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent,
    MenuItemComponent,
    SimpleConfirmPopupComponent,
    LoadingComponent,
    GetRoleEmployee
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    RouterModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  exports: [
    SidebarMenuComponent,
    HeaderComponent,
    SimpleConfirmPopupComponent,
    LoadingComponent,
    GetRoleEmployee
  ]
})
export class AppCommonModule { }
