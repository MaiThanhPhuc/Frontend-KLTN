import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarMenuComponent } from './layout/sidebar-menu/sidebar-menu.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@NgModule({
  declarations: [
    SidebarMenuComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarMenuComponent
  ]
})
export class AppCommonModule { }
