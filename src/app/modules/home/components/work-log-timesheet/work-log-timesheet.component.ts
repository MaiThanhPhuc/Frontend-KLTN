import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarView } from 'angular-calendar';
import { Subject, takeUntil } from 'rxjs';
import { EventColor } from 'calendar-utils';
import { WorkLogPopupComponent } from './work-log-popup/work-log-popup.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/utils/base.component';
import { WorkLogModel } from 'src/app/models/workLog.models';
import { WorkLogService } from 'src/app/modules/admin/services/workLog.service';
import { ToastService } from 'src/app/modules/common/toast/toast.service';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-work-log-timesheet',
  templateUrl: './work-log-timesheet.component.html',
  styleUrls: ['./work-log-timesheet.component.scss']
})
export class WorkLogTimesheetComponent extends BaseComponent implements OnInit {
  dialogRef: MatDialogRef<WorkLogPopupComponent>;
  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
  workLog: WorkLogModel
  activeDayIsOpen: boolean = false;
  currentUserId: string;
  dataSource: WorkLogModel[];
  dataSave: WorkLogModel;
  selectedMonth: number;
  isLoading = false
  constructor(
    private dialog: MatDialog,
    private workLogService: WorkLogService
  ) {
    super();
  }
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
    this.selectedMonth = new Date().getMonth() + 1;
    this.loadData();
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.dialogRef = this.dialog.open(WorkLogPopupComponent, {
      width: `700px`,
      height: `600px`,
      disableClose: true
    });
    let data;
    this.dataSource.forEach((item) => {
      if (new Date(item.date).getTime() === new Date(date).getTime()) {
        data = item
        return item
      }
      return null
    })
    this.dialogRef.componentInstance.workLog = data || new WorkLogModel();

    this.dialogRef.componentInstance.onSubmit.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: WorkLogModel) => {
      this.dataSave = dataSave;
      if (this.dataSave?._id) {
        this.onUpdate()
      }
      else {
        this.dataSave.date = date;
        this.onSave()
      }
    });

    this.dialogRef.componentInstance.onClose.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.loadData()
    });
  }

  onChangeMonth(date: Date) {
    this.selectedMonth = date.getMonth() + 1;
    this.loadData()
  }
  loadData() {
    this.isLoading = true
    this.workLogService.getWorkLogByMonth(this.selectedMonth, this.currentUserId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        this.isLoading = false
        this.dataSource = res;
        this.initValueCalendar(res);
      }
    })
  }
  initValueCalendar(data: WorkLogModel[]) {
    this.events = data.map((item) => {
      return {
        start: new Date(item.date),
        title: item.description,
        color: { ...colors.blue },
      }
    })
  }
  onSave() {
    this.workLogService.createWorkLog(this.dataSave).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
        this.loadData();
        ToastService.success("Created successfully")
      }
    })
  }

  onUpdate() {
    this.workLogService.updateWorkLogById(this.dataSave).subscribe(res => {
      if (res) {
        this.dialogRef.close(true);
        this.loadData();
        ToastService.success("Updated successfully")
      }
    })
  }
}
