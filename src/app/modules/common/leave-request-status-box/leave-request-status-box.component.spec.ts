import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestStatusBoxComponent } from './leave-request-status-box.component';

describe('LeaveRequestStatusBoxComponent', () => {
  let component: LeaveRequestStatusBoxComponent;
  let fixture: ComponentFixture<LeaveRequestStatusBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestStatusBoxComponent]
    });
    fixture = TestBed.createComponent(LeaveRequestStatusBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
