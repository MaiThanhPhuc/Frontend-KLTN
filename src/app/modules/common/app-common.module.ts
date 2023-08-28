import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';

@NgModule({
  declarations: [
    SidebarMenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarMenuComponent
  ]
})
export class AppCommonModule { }
