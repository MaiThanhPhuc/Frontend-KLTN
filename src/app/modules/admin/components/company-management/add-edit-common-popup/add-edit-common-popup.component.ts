import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { OfficeModel } from 'src/app/models/office.model';
import { TeamModel } from 'src/app/models/team.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { EditMode } from './add-edit-common.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-edit-common-popup',
  templateUrl: './add-edit-common-popup.component.html',
  styleUrls: ['./add-edit-common-popup.component.scss']
})
export class AddEditCommonPopupComponent extends BaseComponent implements OnInit {

  @Input() mode = -1;
  @Input() isEdit = false;
  @Input() teamData = new TeamModel();
  @Input() departmentData = new DepartmentModel();
  @Input() officeData = new OfficeModel();
  @Output() onSubmitTeam: EventEmitter<TeamModel> = new EventEmitter();
  @Output() onSubmitDepartment: EventEmitter<DepartmentModel> = new EventEmitter();
  @Output() onSubmitOffice: EventEmitter<OfficeModel> = new EventEmitter();
  @Output() onClose: EventEmitter<OfficeModel> = new EventEmitter();

  officeDataFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl(''),
  });
  departmentDataFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    office: new FormControl('', Validators.required),
    manager: new FormControl('', Validators.required),
  });
  teamDataFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    leader: new FormControl('', Validators.required),
  });

  dtNow: Date = new Date();

  get EditMode() { return EditMode; }

  title = '';
  constructor(private dialogRef: MatDialogRef<AddEditCommonPopupComponent>
  ) {
    super();
  }

  ngOnInit(): void {
    switch (this.mode) {
      case EditMode.TEAM:
        this.title = 'Team Infomation';
        break;
      case EditMode.DEPARTMENT:
        this.title = 'Department Infomation';
        break;
      case EditMode.OFFICE:
        this.title = 'Office Infomation';
        break;
    }
  }

  onSubmitForm() {
    switch (this.mode) {
      case EditMode.TEAM:
        this.submitTeam()
        break;
      case EditMode.DEPARTMENT:
        this.submitDepartment()
        break;
      case EditMode.OFFICE:
        this.submitOffice()
        break;
    }
  }

  submitTeam() {
    this.onSubmitTeam.emit(this.teamData)
  }

  submitDepartment() {
    this.onSubmitDepartment.emit(this.departmentData)
  }

  submitOffice() {
    this.onSubmitOffice.emit(this.officeData)
  }

  closePopup(): void {
    this.dialogRef.close(true);
    this.onClose.emit();
  }



  getFormControlByKey(key: string) {
    switch (this.mode) {
      case EditMode.TEAM:
        return this.teamDataFormGroup.controls[`${key}`];
      case EditMode.DEPARTMENT:
        return this.departmentDataFormGroup.controls[`${key}`];
      default:
        return this.officeDataFormGroup.controls[`${key}`];
    }
  }
}
