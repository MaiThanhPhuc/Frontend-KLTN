import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem.model';
import { GlobalService } from 'src/app/services/global.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  @ViewChild('mySidenav') sidebarElement: ElementRef | any;
  @Input() maxWidth = 300;
  @Input() minWidth = 60;
  @Input() isShowText: boolean = true;
  @Input() selectedMenuItem: any;
  @Output() clickItemEvent: EventEmitter<MenuItem> = new EventEmitter();
  isExpand = true;
  isHide = false;
  menus: Array<MenuItem> = [];
  ngUnsubscribe = new Subject<void>();
  closeMenu(item: MenuItem): void {
    this.isHide = false;
    this.clickItemEvent.emit();
  }
  constructor(
    private globalService: GlobalService
  ) {
    this.initSidebarMenu();
  }

  initSidebarMenu() {
    const homeTitle: MenuItem = new MenuItem('', "Home", "", '', true);
    const dashBoard: MenuItem = new MenuItem('dashBoard', "Dashboard", "/home/dashboard", 'dashboard', false);
    const workLog: MenuItem = new MenuItem('workLog', "Work Log Timesheet", "/home/work-log", 'event_available', false);
    const leaves: MenuItem = new MenuItem('', "Leaves", "", '', true);
    const request: MenuItem = new MenuItem('request', "Request", "/leaves/request", 'note_add', false);
    const calendar: MenuItem = new MenuItem('calendar', "Calendar", "/leaves/calendar", 'calendar_month', false);
    const myLeaves: MenuItem = new MenuItem('myLeaves', "My Leaves", "/leaves/my-leaves", 'list_alt', false);
    const leavesHistory: MenuItem = new MenuItem('leavesHistory', "Leaves History", "/leaves/leaves-history", 'manage_search', false);
    const leaveManagement: MenuItem = new MenuItem('leaveManagement', "Leave Management", "/leaves/leave-management", 'folder_managed', false);
    const company: MenuItem = new MenuItem('', "Company", "", '', true);
    const leaveTypes: MenuItem = new MenuItem('leaveTypes', "Leave Types", "/company/leave-types", 'lists', false);
    const holidays: MenuItem = new MenuItem('holidays', "Holidays", "/company/holidays", 'event_note', false);
    const employee: MenuItem = new MenuItem('employee', "Employee", "/company/employee", 'assignment_ind', false);

    this.menus = [homeTitle, dashBoard, workLog, leaves, request, calendar, myLeaves, leavesHistory, leaveManagement, company, leaveTypes, holidays, employee]
  }
  ngOnInit(): void {
    this.listeningEvent();
  }

  setSideBarWidth(): void {
    this.sidebarElement.nativeElement.style.width = this.isExpand ? `${this.maxWidth}px` : `${this.minWidth}px`;
  }
  listeningEvent(): void {
    this.globalService.toggleIconSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        this.isExpand = res;
        this.setSideBarWidth();
      });
  }
}
