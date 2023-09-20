import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeavesHistoryComponent } from './leaves-history.component';

describe('LeavesHistoryComponent', () => {
  let component: LeavesHistoryComponent;
  let fixture: ComponentFixture<LeavesHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeavesHistoryComponent]
    });
    fixture = TestBed.createComponent(LeavesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
