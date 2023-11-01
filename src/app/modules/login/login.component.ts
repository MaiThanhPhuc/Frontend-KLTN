import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from 'src/app/utils/base.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AtuhService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule],
})
export class LoginComponent extends BaseComponent implements OnInit {

  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  employeeData: any
  constructor(
    private authService: AtuhService
  ) {
    super()
  }
  ngOnInit(): void {
  }

  getFormControlByKey(key: string) {
    return this.loginFormGroup.controls[`${key}`];
  }

  onSubmitForm() {

  }
}
