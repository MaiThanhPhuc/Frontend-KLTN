import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/utils/base.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { LoginRequest } from 'src/app/models/common.models';
import { takeUntil } from 'rxjs';
import { GlobalService } from 'src/app/services/global.service';
import { ToastService } from '../common/toast/toast.service';
import { CommonModule } from '@angular/common';
import { LocalStorage } from '../common/helper/localStorage';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { AppCommonModule } from '../common/app-common.module';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, CommonModule, AppCommonModule],
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  errorMsg: string;
  employeeData = new LoginRequest();
  localStorage: LocalStorage;
  iconPath = `${environment.assetsPath}/img/login_img.png`;
  isLoading = false;
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorage,
    private router: Router,
    private globalService: GlobalService
  ) {
    super()
  }
  ngOnInit(): void {
  }

  getFormControlByKey(key: string) {
    return this.loginFormGroup.controls[`${key}`];
  }

  onSubmitForm() {
    this.isLoading = true
    this.authService.login(this.employeeData).pipe(takeUntil(this.ngUnsubscribe)).subscribe((res) => {
      if (res) {
        localStorage.setItem('accessToken', res.accessToken)
        this.localStorageService.createStore('userData', res)
        localStorage.setItem('userId', res._id)
        this.globalService.announceIsLogin(true);
        this.errorMsg = '';
        this.isLoading = false
        this.router.navigate([`/home/dashboard`])
      }
    },
      (error => {
        this.isLoading = false
        this.errorMsg = error.error
      }))
  }
}
