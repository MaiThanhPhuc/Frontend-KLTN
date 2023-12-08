import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaveType } from 'src/app/models/leaveType.model';
import { BaseComponent } from 'src/app/utils/base.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { WorkLogModel } from 'src/app/models/workLog.models';

@Component({
  selector: 'app-work-log-popup',
  templateUrl: './work-log-popup.component.html',
  styleUrls: ['./work-log-popup.component.scss']
})
export class WorkLogPopupComponent extends BaseComponent implements OnInit {
  @Input() isEdit = false;
  editor = ClassicEditor;
  currentUserId: string;
  workLogFormGroup: FormGroup = new FormGroup({
    time: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  @Input() workLog = new WorkLogModel();
  @Output() onSubmit: EventEmitter<WorkLogModel> = new EventEmitter();
  @Output() onClose: EventEmitter<WorkLogModel> = new EventEmitter();


  constructor(private dialogRef: MatDialogRef<WorkLogPopupComponent>,
  ) {
    super()
  }
  ngOnInit(): void {
    this.currentUserId = localStorage.getItem('userId') || '';
  }

  closePopup(): void {
    this.dialogRef.close(true);
    this.onClose.emit();
  }

  onSubmitForm() {
    this.workLog.employee = this.currentUserId
    this.onSubmit.emit(this.workLog)
  }
}
