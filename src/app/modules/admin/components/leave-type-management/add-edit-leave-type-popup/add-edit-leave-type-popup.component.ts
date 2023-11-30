import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { LeaveType } from 'src/app/models/leaveType.model';
import { BaseComponent } from 'src/app/utils/base.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-edit-leave-type-popup',
  templateUrl: './add-edit-leave-type-popup.component.html',
  styleUrls: ['./add-edit-leave-type-popup.component.scss']
})
export class AddEditLeaveTypePopupComponent extends BaseComponent implements OnInit {
  @Input() isEdit = false;
  editor = ClassicEditor;

  leaveTypeDataFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    default: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  @Input() leaveTypeData = new LeaveType();
  @Output() onSubmit: EventEmitter<LeaveType> = new EventEmitter();
  @Output() onClose: EventEmitter<LeaveType> = new EventEmitter();


  constructor(private dialogRef: MatDialogRef<AddEditLeaveTypePopupComponent>,
  ) {
    super()
  }
  ngOnInit(): void {
  }

  closePopup(): void {
    this.dialogRef.close(true);
    this.onClose.emit();
  }

  onSubmitForm() {
    this.onSubmit.emit(this.leaveTypeData)
  }
}
