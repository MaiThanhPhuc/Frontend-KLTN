import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SimpleConfirmPopupModel } from 'src/app/models/simple-confirm-popup.model';

@Component({
  selector: 'app-simple-confirm-poppup',
  templateUrl: './simple-confirm-popup.component.html',
  styleUrls: ['./simple-confirm-popup.component.scss']
})
export class SimpleConfirmPopupComponent implements OnInit {
  @Input() data: SimpleConfirmPopupModel;
  @Input() showCancelButton = true;
  constructor(
    public dialogRef: MatDialogRef<SimpleConfirmPopupComponent>) { }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
