import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogPopupComponent } from './work-log-popup.component';

describe('WorkLogPopupComponent', () => {
  let component: WorkLogPopupComponent;
  let fixture: ComponentFixture<WorkLogPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkLogPopupComponent]
    });
    fixture = TestBed.createComponent(WorkLogPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
