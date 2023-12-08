import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { addDays, addHours, endOfDay, endOfMonth, isSameDay, isSameMonth, startOfDay, subDays } from 'date-fns';
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

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'A 3 day event',
      color: { ...colors.red },
    },
  ];
  workLog: WorkLogModel
  activeDayIsOpen: boolean = false;
  currentUserId: string;
  dataSopurce: WorkLogModel;
  dataSave: WorkLogModel;
  selectedMonth: number;
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
    // if(events) this.dialogRef.componentInstance.workLog = events[0]

    this.dialogRef.componentInstance.onSubmit.pipe(takeUntil(this.ngUnsubscribe)).subscribe((dataSave: WorkLogModel) => {
      this.dataSave = dataSave;
      this.dataSave.date = date;
      this.onSave()
    });

    this.dialogRef.componentInstance.onClose.pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      this.loadData()
    });
  }

  onChangeMonth(month: any) {
    console.log(month);
  }
  loadData() {
    this.workLogService.getWorkLogByMonth(this.selectedMonth).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        this.events = res.map(item => {
          return {
            start: new Date(item.date),
            title: item.description,
            color: { ...colors.red },
          }
        })
      }
    })
  }
  onSave() {
    console.log(this.dataSave);
    this.workLogService.createWorkLog(this.dataSave).subscribe(res => {
      if (res) ToastService.success("Created successfully")
    })
  }
}
