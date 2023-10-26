import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaveType, LeaveTypePopupModel } from 'src/app/models/leaveType.model';
import { OptionModel } from 'src/app/models/optionsModel';

@Component({
  selector: 'app-leave-type-popup',
  templateUrl: './leave-type-popup.component.html',
  styleUrls: ['./leave-type-popup.component.scss']
})

export class LeaveTypePopupComponent {
  @Input() data: LeaveTypePopupModel;
  @Input() showCancelButton = true;

  allLeaveTypeChecked = false;

  constructor(
    public dialogRef: MatDialogRef<LeaveTypePopupComponent>) { }

  ngOnInit() {

  }
  onCancel(): void {
    this.dialogRef.close();
  }
  selectOrUnselectAll(checked: boolean) {
    this.data.leaveTypeOption.forEach(item => {
      item.checked = item.disabled ? false : checked;
    });
  }

  onChangeChecked(item: OptionModel) {
    // this.data.leaveTypeOption.forEach(data => {
    //   if (item.id == data.id) {
    //     item.checked = item.disabled ? false : item.checked;
    //   }
    // });
  }

  isAllChecked(data: OptionModel[]): boolean {
    return data.every(item => item.checked);
  }
}
