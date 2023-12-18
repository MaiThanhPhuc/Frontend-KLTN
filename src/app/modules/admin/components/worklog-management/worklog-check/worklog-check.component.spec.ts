import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogCheckComponent } from './worklog-check.component';

describe('WorklogCheckComponent', () => {
  let component: WorklogCheckComponent;
  let fixture: ComponentFixture<WorklogCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorklogCheckComponent]
    });
    fixture = TestBed.createComponent(WorklogCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
