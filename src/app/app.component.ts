import { Component, ElementRef, ViewChild } from '@angular/core';
import { GlobalService } from './services/global.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  constructor(
    private globalService: GlobalService
  ) {
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
