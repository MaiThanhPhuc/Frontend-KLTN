import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { Constants } from 'src/app/constants';
import { LeaveRequest, LeaveType } from 'src/app/models/leaveType.model';
import { OptionModel } from 'src/app/models/optionsModel';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { ToastService } from 'src/app/modules/common/toast/toast.service';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss']
})
export class LeaveRequestFormComponent extends BaseComponent implements OnInit {
  @Input() leaveTypeOptions: OptionModel[] = []
  @Output() submitLeaveRequest: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  allLeaveTimeOptions = Constants.LeaveTypeTimeOptions
  isLoading = false
  leaveRequestData = new LeaveRequest()
  currentUserId: string
  leaveRequestFormGroup: FormGroup = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
  });
  constructor(
    private leaveTypeService: LeaveTypeService,
    private dialog: MatDialog,
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
  }

  submitRequest() {
    this.submitLeaveRequest.emit(this.leaveRequestFormGroup.value)
    this.leaveRequestFormGroup.reset()
  }
}
