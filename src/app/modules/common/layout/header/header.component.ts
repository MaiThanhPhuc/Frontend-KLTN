import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { IconModel } from 'src/app/models/Icon.model';
import { GlobalService } from 'src/app/services/global.service';
// import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() rightIcons: IconModel[] = [];
  @Input() title: string | undefined;
  @Input() notifications = 0;
  @Output() rightIconClickedEvent: EventEmitter<string> = new EventEmitter();
  @ViewChild('menu', { static: true }) menuButton: MatButton | any;
  isExpandSideBar = true
  // isAnonymous: boolean = environment.server.isAnonymous;

  constructor(private globalService: GlobalService) { }

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
    // if (event.code == 'Enter') {
    //   document.getElementById('popupJumpToChemical').classList.add('d-none');
    //   document.getElementById('popupJumpToChemical').tabIndex = -1;
    // }
  }
}
