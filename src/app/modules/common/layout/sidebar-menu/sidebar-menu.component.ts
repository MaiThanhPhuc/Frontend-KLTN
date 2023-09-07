import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem.model';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  @ViewChild('mySidenav') sidebarElement: ElementRef | any;
  @Input() maxWidth = 300;
  @Input() minWidth = 60;
  @Input() isShowText: boolean | undefined;
  @Input() selectedMenuItem: any;
  @Output() clickItemEvent: EventEmitter<MenuItem> = new EventEmitter();
  isExpand = false;
  isHide = false;
  menus: Array<MenuItem> = [];

  closeMenu(item: MenuItem): void {
      this.isHide = false;
    this.clickItemEvent.emit();
  }
  constructor(){
    this.initSidebarMenu();
  }

  initSidebarMenu(){
    const newHome1: MenuItem = new MenuItem('newHome', "home", "this.newHomeUrl", '', 'home', 'home', 'view', false);
    const newHome2: MenuItem = new MenuItem('newHome', "home", "this.newHomeUrl", '', 'home', 'home', 'view', false);
    const newHome3: MenuItem = new MenuItem('newHome', "home", "this.newHomeUrl", '', 'home', 'home', 'view', false);
    const newHome4: MenuItem = new MenuItem('newHome', "home", "this.newHomeUrl", '', 'home', 'home', 'view', false);

    this.menus = [newHome1,newHome2,newHome3,newHome4]
  }

  setSideBarWidth(): void {
    this.sidebarElement.nativeElement.style.width = this.isExpand ? `${this.maxWidth}px` : `${this.minWidth}px`;
  }

}
