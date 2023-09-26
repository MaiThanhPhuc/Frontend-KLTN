import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-add-edit-leave-type-popup',
  templateUrl: './add-edit-leave-type-popup.component.html',
  styleUrls: ['./add-edit-leave-type-popup.component.scss']
})
export class AddEditLeaveTypePopupComponent extends BaseComponent implements OnInit {
  @Input() isEdit = false;

  constructor(private dialogRef: MatDialogRef<AddEditLeaveTypePopupComponent>) {
    super()
  }
  ngOnInit(): void {
  }
  closePopup(): void {
    this.dialogRef.close(true);
  }

  onSubmitForm() {

  }
}
