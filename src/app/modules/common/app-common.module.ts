import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MenuItemComponent } from './layout/sidebar-menu/menu-item/menu-item.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatExpansionModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    SidebarMenuComponent
  ]
})
export class AppCommonModule { }
