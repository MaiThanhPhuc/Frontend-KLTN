import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { AppInjector } from 'src/app/services/app-injector.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from 'src/app/utils/base.component';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent extends BaseComponent implements OnInit {
  isLoading: Subject<boolean>;
  isShowLoading = false;
  @Input() manualLoadingInput: boolean;
  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }
  ngOnInit(): void {
    AppInjector.getService(LoadingService).isLoading.pipe(takeUntil(this.ngUnsubscribe)).subscribe((res: boolean) => {
      this.isShowLoading = res;
      this.changeDetector.detectChanges();
    });

  }
}
