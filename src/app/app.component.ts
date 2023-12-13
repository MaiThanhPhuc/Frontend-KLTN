import { Component, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from './services/global.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('mainContent') mainContentElement: ElementRef | any;
  title = 'Frontend-KLTN';
  onClickAppIcon: boolean = true;
  showRightBar = false;
  onClicNotiftionkAppIcon: boolean = false;
  showNotificationBox = false;
  tabName: string = "test";
  isExpand = false
  ngUnsubscribe = new Subject<void>();
  showMenu: boolean = false;
  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private router: Router,
  ) {
    if (this.authService.isLoggedIn() && !this.authService.isExpiredToken()) {
      this.showMenu = true
      // this.router.navigate(['/home/dashboard'])
    }
  }

  ngOnInit(): void {
    this.listeningEvent();
  }

  setSideBarWidth(): void {
    this.mainContentElement.nativeElement.style.marginLeft = this.isExpand ? `300px` : `60px`;
  }
  listeningEvent(): void {
    this.globalService.toggleIconSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        this.isExpand = res;
        this.setSideBarWidth();
      });

    if (!this.showMenu) {
      this.globalService.isLoginSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (res) => {
          if (res) {
            this.router.navigate(['/home/dashboard'])
          }
          this.showMenu = res
        });
    }


  }

  onRightIconClicked(icon: string): void {
    switch (icon) {
      case 'apps':
        this.onClickAppIcon = true;
        this.showRightBar = !this.showRightBar;
        break;
      case 'perm_identity':
        break;
      case 'info_outline':
        break;
      case 'notifications':
        this.onClicNotiftionkAppIcon = true;
        this.showNotificationBox = !this.showNotificationBox;
        this.showRightBar = false;
        break;
    }
  }
}
