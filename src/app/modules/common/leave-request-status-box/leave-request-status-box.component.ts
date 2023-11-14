import { Component, Input, OnInit } from '@angular/core';
import { Constants } from 'src/app/constants';
import { LeaveRequestStatusEnum } from 'src/app/models/leaveType.model';

@Component({
  selector: 'app-leave-request-status-box',
  templateUrl: './leave-request-status-box.component.html',
  styleUrls: ['./leave-request-status-box.component.scss']
})

export class LeaveRequestStatusBoxComponent implements OnInit {

  @Input() status: number = -1
  statusContent = ''

  get leaveRequestStatus() {
    return LeaveRequestStatusEnum;
  }

  ngOnInit(): void {
    this.initContentStatus();
  }

  initContentStatus() {
    this.statusContent = Constants.LeaveRequestStatus.find(item => item.id === this.status)?.text || ''
  }
}
