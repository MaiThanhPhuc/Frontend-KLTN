import { MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, MatSnackBar } from '@angular/material/snack-bar';
import { AppInjector } from 'src/app/services/app-injector.service';

export class ToastService {
  static horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  static verticalPosition: MatSnackBarVerticalPosition = 'top';
  static actionButtonLabel = 'Close';
  static action = true;
  static setAutoHide = true;
  static autoHide = 2000;

  // static success(msg) {
  //   if (msg && typeof msg === 'string') {
  //     const config = new MatSnackBarConfig();
  //     config.verticalPosition = this.verticalPosition;
  //     config.horizontalPosition = this.horizontalPosition;
  //     config.duration = this.setAutoHide ? this.autoHide : 0;
  //     config.panelClass = ['toast-success', 'mat-snack-bar-container-custom'];
  //     const notifi = AppInjector.getService(MatSnackBar);
  //     notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
  //   }
  // }
  // static warning(msg, duration?: number) {
  //   if (msg && typeof msg === 'string') {
  //     const config = new MatSnackBarConfig();
  //     config.verticalPosition = this.verticalPosition;
  //     config.horizontalPosition = this.horizontalPosition;
  //     config.duration = duration ? duration : (this.setAutoHide ? this.autoHide : 0);
  //     config.panelClass = ['toast-warning', 'mat-snack-bar-container-custom'];
  //     const notifi = AppInjector.getService(MatSnackBar);
  //     notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
  //   }
  // }
  // static info(msg) {
  //   if (msg && typeof msg === 'string') {
  //     const config = new MatSnackBarConfig();
  //     config.verticalPosition = this.verticalPosition;
  //     config.horizontalPosition = this.horizontalPosition;
  //     config.duration = this.setAutoHide ? this.autoHide : 0;
  //     config.panelClass = ['toast-infor', 'mat-snack-bar-container-custom'];
  //     const notifi = AppInjector.getService(MatSnackBar);
  //     notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
  //   }
  // }
  // static error(msg, verticalPosition: MatSnackBarVerticalPosition = null, horizontalPosition: MatSnackBarHorizontalPosition = null) {
  //   if (msg && typeof msg === 'string') {
  //     const config = new MatSnackBarConfig();
  //     config.verticalPosition = verticalPosition || this.verticalPosition;
  //     config.horizontalPosition = horizontalPosition || this.horizontalPosition;
  //     config.duration = this.setAutoHide ? this.autoHide : 0;
  //     config.panelClass = ['toast-error', 'mat-snack-bar-container-custom'];
  //     const notifi = AppInjector.getService(MatSnackBar);
  //     notifi.open(msg, this.action ? this.actionButtonLabel : undefined, config);
  //   }
  // }
}
