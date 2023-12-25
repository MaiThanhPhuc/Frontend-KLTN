import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MenuItem } from 'src/app/models/menuItem.model';
import { GlobalService } from 'src/app/services/global.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthPermissionService } from 'src/app/guards/auth-permission.service';

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
    private globalService: GlobalService,
    private authService: AuthPermissionService
  ) {
  }

  initSidebarMenu() {
    const isAdmin = this.authService.isAdmin()
    const isManage = this.authService.isManager()

    const homeTitle: MenuItem = new MenuItem('', "Home", "", '', true);
    const dashBoard: MenuItem = new MenuItem('dashBoard', "Dashboard", "/home/dashboard", 'dashboard', false);
    const workLog: MenuItem = new MenuItem('workLog', "Work Log Timesheet", "/home/work-log", 'event_available', false);
    const leaves: MenuItem = new MenuItem('', "Leaves", "", '', true);
    const request: MenuItem = new MenuItem('request', "Request", "/leaves/request", 'note_add', false);
    const manageRequest: MenuItem = new MenuItem('request', "Manage Request", "/leaves/manage-request", 'assignment_ind', false);
    // const calendar: MenuItem = new MenuItem('calendar', "Calendar", "/leaves/calendar", 'calendar_month', false);
    const myLeaves: MenuItem = new MenuItem('myLeaves', "My Leaves", "/leaves/my-leaves", 'list_alt', false);
    const leavesHistory: MenuItem = new MenuItem('leavesHistory', "Leaves History", "/leaves/leaves-history", 'manage_search', false);
    const leaveManagement: MenuItem = new MenuItem('leaveManagement', "Leave Management", "/leaves/leave-management", 'folder_managed', false);
    const company: MenuItem = new MenuItem('', "Company", "", '', true);
    const leaveTypes: MenuItem = new MenuItem('leaveTypes', "Leave Types", "/company/leave-types", 'lists', false);
    // const holidays: MenuItem = new MenuItem('holidays', "Holidays", "/company/holidays", 'event_note', false);
    const employee: MenuItem = new MenuItem('employee', "Employee", "/company/employee", 'assignment_ind', false);

    var adminMenu = isAdmin || this.authService.isHumanResource() ? this.initSidebarAdminMenu() : []
    var manageRole = isManage ? [manageRequest] : []
    this.menus = [homeTitle, dashBoard, workLog, ...adminMenu, leaves, request, ...manageRole, myLeaves, leavesHistory, leaveManagement, company, leaveTypes, employee]
  }

  initSidebarAdminMenu(): MenuItem[] {
    const admin: MenuItem = new MenuItem('', "Admin", "", '', true);
    const adminCompany: MenuItem = new MenuItem('adminCompany', "Company Management", "/admin/company", 'apartment', false);
    const adminEmployee: MenuItem = new MenuItem('adminEmployee', "Employee", "/admin/company/employee", '', false);
    const adminTeam: MenuItem = new MenuItem('adminTeam', "Team", "/admin/company/team", '', false);
    const adminDeparment: MenuItem = new MenuItem('adminDeparment', "Department", "/admin/company/department", '', false);
    const adminOffice: MenuItem = new MenuItem('adminOffice', "Office", "/admin/company/office", '', false);
    const archive: MenuItem = new MenuItem('archive', "Archive", "/admin/company/archive", '', false);
    adminCompany.children = [adminEmployee, adminTeam, adminDeparment, adminOffice, archive]

    const adminLeaveTypes: MenuItem = new MenuItem('adminLeaveTypes', "Leave Types Management", "/admin/leave-type", 'subject', false);
    const adminWorkLog: MenuItem = new MenuItem('adminWorklog', "Work Log Management", "/admin/work-log", 'view_timeline', false);
    const importData: MenuItem = new MenuItem('importData', "Import Data", "/admin/import-data", 'publish', false);
    if (this.authService.isHumanResource()) {
      adminCompany.children = [adminEmployee, adminTeam, adminDeparment, adminOffice]
      return [admin, adminCompany, adminLeaveTypes, adminWorkLog]
    }
    return [admin, adminCompany, adminLeaveTypes, adminWorkLog, importData]
  }
  ngOnInit(): void {
    this.listeningEvent();
    this.initSidebarMenu();
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

    this.globalService.isLoginSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        this.isExpand = res;
        this.initSidebarMenu();
      });
  }
}
