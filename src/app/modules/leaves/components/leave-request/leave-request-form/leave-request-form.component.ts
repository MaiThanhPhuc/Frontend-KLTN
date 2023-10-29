import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Constants } from 'src/app/constants';
import { LeaveRequest } from 'src/app/models/leaveType.model';
import { OptionModel } from 'src/app/models/optionsModel';
import { LeaveTypeService } from 'src/app/modules/admin/services/leaveType.service';
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


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  allLeaveTypeOptions = Constants.LeaveTypeTimeOptions
  leaveTypeOptions: OptionModel[];
  isLoading = false
  leaveRequestData = new LeaveRequest()
  leaveRequestFormGroup: FormGroup = new FormGroup({
    leaveType: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    reason: new FormControl('', Validators.required),
  });
  constructor(
    private leaveTypeService: LeaveTypeService
  ) {
    super();
  }

  ngOnInit(): void {
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
    this.leaveRequestData.employee = '653b2a1f4b48382ed217f25b'
    this.leaveTypeService.createLeaveRequest(this.leaveRequestData).pipe(takeUntil(this.ngUnsubscribe)).subscribe(res => {
      if (res) {
        console.log(res);
      }
      this.isLoading = false
    })
  }
}
