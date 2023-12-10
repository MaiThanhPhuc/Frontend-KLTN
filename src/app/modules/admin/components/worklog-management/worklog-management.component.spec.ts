import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogManagementComponent } from './worklog-management.component';

describe('WorklogManagementComponent', () => {
  let component: WorklogManagementComponent;
  let fixture: ComponentFixture<WorklogManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorklogManagementComponent]
    });
    fixture = TestBed.createComponent(WorklogManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
