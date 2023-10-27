import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentModel } from 'src/app/models/deparment.model';
import { OfficeModel } from 'src/app/models/office.model';
import { TeamModel } from 'src/app/models/team.model';
import { BaseComponent } from 'src/app/utils/base.component';
import { EditMode } from './add-edit-common.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { takeUntil } from 'rxjs';
import { OptionModel } from 'src/app/models/optionsModel';
import { EmployeeService } from '../../../services/employee.service';
import { Employee, SearchModal, SearchEmployeeResponse } from 'src/app/models/employee.model';
import { Constants } from 'src/app/constants';

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

  allOfficeOptions: OptionModel[];
  allDepartmentOptions: OptionModel[];
  allTeamOptions: OptionModel[];
  allManagerOptions: OptionModel[];
  allLeaderOptions: OptionModel[];
  officeDataFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phone: new FormControl(''),
  });
  departmentDataFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    office: new FormControl('', Validators.required),
    manager: new FormControl(''),
  });
  teamDataFormGroup: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    leader: new FormControl(''),
  });
  paramSearch: SearchModal = {};

  dtNow: Date = new Date();
  isLoading = false;
  get EditMode() { return EditMode; }

  title = '';
  constructor(private dialogRef: MatDialogRef<AddEditCommonPopupComponent>,
    private adminService: AdminService,
    private employeeService: EmployeeService
  ) {
    super();
  }

  ngOnInit(): void {
    switch (this.mode) {
      case EditMode.TEAM:
        this.title = 'Team Infomation';
        this.getAllLeader()
        this.loadDataDepartment()
        break;
      case EditMode.DEPARTMENT:
        this.title = 'Department Infomation';
        this.loadDataOffice();
        this.getAllManager();
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
        this.submitDepartment();
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

  loadDataOffice() {
    this.isLoading = true
    this.adminService.getAllOffice().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: OfficeModel[]) => {
      if (res) {
        this.allOfficeOptions = res.map(item => new OptionModel(item.name, item._id))
      }

      this.isLoading = false
    });
    this.isLoading = false
  }

  loadDataDepartment() {
    this.isLoading = true
    this.adminService.getAllDepartment().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: DepartmentModel[]) => {
      if (res) {
        this.allDepartmentOptions = res.map(item => new OptionModel(item.name, item._id))
      }
      this.isLoading = false
    });
    this.isLoading = false
  }

  loadDataTeam() {
    this.isLoading = true
    this.adminService.getAllTeam().pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: TeamModel[]) => {
      if (res) {
        this.allTeamOptions = res.map(item => new OptionModel(item.name, item._id))
      }
      this.isLoading = false
    });
    this.isLoading = false
  }

  getAllManager() {
    this.isLoading = true
    this.paramSearch.role = Constants.ManagerRole.id
    this.employeeService.searchEmployee(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchEmployeeResponse) => {
      if (res) {
        this.allManagerOptions = res.result.map(item => new OptionModel(`${item.firstName} ${item.lastName}`, item._id))
      }

      this.isLoading = false
    });
    this.isLoading = false
  }

  getAllLeader() {
    this.isLoading = true
    this.paramSearch.role = Constants.LeaderRole.id
    this.employeeService.searchEmployee(this.paramSearch).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: SearchEmployeeResponse) => {
      if (res) {
        this.allLeaderOptions = res.result.map(item => new OptionModel(`${item.firstName} ${item.lastName}`, item._id))
      }

      this.isLoading = false
    });
    this.isLoading = false
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
