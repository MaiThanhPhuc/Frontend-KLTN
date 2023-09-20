import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkLogTimesheetComponent } from './work-log-timesheet.component';

describe('WorkLogTimesheetComponent', () => {
  let component: WorkLogTimesheetComponent;
  let fixture: ComponentFixture<WorkLogTimesheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkLogTimesheetComponent]
    });
    fixture = TestBed.createComponent(WorkLogTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
