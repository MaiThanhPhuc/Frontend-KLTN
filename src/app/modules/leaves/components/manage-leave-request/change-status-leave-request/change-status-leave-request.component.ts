import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Constants } from 'src/app/constants';
import { LeaveType } from 'src/app/models/leaveType.model';

@Component({
  selector: 'app-change-status-leave-request',
  templateUrl: './change-status-leave-request.component.html',
  styleUrls: ['./change-status-leave-request.component.scss']
})
export class ChangeStatusLeaveRequestComponent implements OnInit {

  leaveTypeDataFormGroup: FormGroup = new FormGroup({
    status: new FormControl('',),
    description: new FormControl('',),
  });

  selectedStatus: any;
  description: any;
  @Output() onSubmit: EventEmitter<any> = new EventEmitter();
  @Output() onClose: EventEmitter<LeaveType> = new EventEmitter();

  statusOptions = Constants.LeaveRequestStatusOptions
  constructor(private dialogRef: MatDialogRef<ChangeStatusLeaveRequestComponent>,
  ) {
  }
  ngOnInit(): void {
  }

  closePopup(): void {
    this.dialogRef.close(true);
    this.onClose.emit();
  }

  onSubmitForm() {
    this.onSubmit.emit({ status: this.selectedStatus, description: this.description });
  }
}
