import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
  @Input() isShowText = true;
  @Input() items: Array<MenuItem> = [];
  @Input() selectedMenuItem: any;
  managerUser = '';
  constructor() {
  }

  @Output() clickItemEvent: EventEmitter<string> = new EventEmitter();
  selectedController: string| undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (this.selectedMenuItem) this.selectedController = this.selectedMenuItem.controller;
    else this.selectedController = '';
  }

  onHeaderPanelClicked(item: any) {
    this.selectedController = item.controller;
  }

  closeMenu(item: any) {
    this.clickItemEvent.emit(item);
  }

  isActiveModule(module: string) {
    return window.location.href.includes(module);
  }
}
