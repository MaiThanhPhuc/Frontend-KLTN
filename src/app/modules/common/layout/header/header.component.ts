import { Component, Input, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { takeUntil } from 'rxjs';
import { IconModel } from 'src/app/models/Icon.model';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { BaseComponent } from 'src/app/utils/base.component';
import { LocalStorage } from '../../helper/localStorage';
import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends BaseComponent implements OnInit {
  @Input() rightIcons: IconModel[] = [];
  @Input() title: string | undefined;
  @Input() notifications = 0;
  @Output() rightIconClickedEvent: EventEmitter<string> = new EventEmitter();
  @ViewChild('menu', { static: true }) menuButton: MatButton | any;
  isExpandSideBar = true
  dataUser: any
  constructor(private globalService: GlobalService,
    private authService: AuthService,
    private localStorageService: LocalStorage,
    private router: Router) {
    super();
  }
  ngOnInit(): void {
    this.dataUser = JSON.parse(this.localStorageService.getStore('userData') || '{}');
    this.listeningEvent();
  }

  onClicked(): void {
    this.isExpandSideBar = !this.isExpandSideBar;
    this.globalService.announceToggleIconClicked(this.isExpandSideBar);
  }

  onMouseOut(): void {
    this.menuButton._elementRef.nativeElement.classList.remove('border-0');
    this.menuButton._elementRef.nativeElement.blur();
  }

  onMouseDown(): void {
    this.menuButton._elementRef.nativeElement.classList.add('border-0');
  }

  onIconClicked(icon?: string): void {
    this.rightIconClickedEvent.emit(icon);
  }

  onKeyDown(event: any): void {
  }
  logout() {
    this.globalService.announceIsLogin(false);
    this.authService.logout();
  }

  gotoEmployeeProfile() {
    this.router.navigate(['/employee-info']);
  }

  listeningEvent(): void {
    this.globalService.isLoginSubject$.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        if (res) this.dataUser = JSON.parse(this.localStorageService.getStore('userData') || '{}');
      });
  }
}
