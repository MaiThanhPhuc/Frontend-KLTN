import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { Constants } from 'src/app/constants';
import { LeaveRequest } from 'src/app/models/leaveType.model';
import { OptionModel } from 'src/app/models/optionsModel';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
import { SimpleConfirmPopupComponent } from 'src/app/modules/common/simple-confirm-popup/simple-confirm-popup.component';
import { ToastService } from 'src/app/modules/common/toast/toast.service';
import { BaseComponent } from 'src/app/utils/base.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
];


@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss']
})
export class LeaveRequestFormComponent extends BaseComponent implements OnInit {

  @Output() reload: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  allLeaveTypeOptions = Constants.LeaveTypeTimeOptions
  leaveTypeOptions: OptionModel[];
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
    this.getAllLeaveType();
  }

  getAllLeaveType() {
    this.isLoading = true
    this.leaveTypeService.getAllLeaveType().pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) this.leaveTypeOptions = res.map(item => new OptionModel(item.name, item._id))
      this.isLoading = false
    })
  }

  createLeaveRequset() {
    if (this.leaveRequestFormGroup.invalid) {
      ToastService.warning('Please fill all field!');
      return;
    }
    this.isLoading = true
    this.leaveRequestData.employee = this.currentUserId

    const inputPopupData: SimpleConfirmPopupModel = new SimpleConfirmPopupModel();
    inputPopupData.submitButton = "Confirm"
    inputPopupData.cancelButton = "Cancel"
    inputPopupData.content = "Do you want to use this leave type?"
    inputPopupData.primarySubmit = true;
    const confirmRequestPopup = this.dialog.open(SimpleConfirmPopupComponent, {
      autoFocus: false,
      width: '400px',
      disableClose: true
    });
    confirmRequestPopup.componentInstance.data = inputPopupData;

    confirmRequestPopup.afterClosed().pipe(takeUntil(this.ngUnsubscribe)).subscribe(confirm => {
      if (confirm) {
        this.isLoading = true
        this.leaveTypeService.createLeaveRequest(this.leaveRequestData).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
          if (res) {
            ToastService.success("Create leave request!")
            this.leaveRequestFormGroup.reset()
            this.reload.emit()
            this.isLoading = false
          }
        })

      }
    });


  }
}
