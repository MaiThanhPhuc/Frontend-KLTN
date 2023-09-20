import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypeComponent } from './leave-type.component';

describe('LeaveTypeComponent', () => {
  let component: LeaveTypeComponent;
  let fixture: ComponentFixture<LeaveTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveTypeComponent]
    });
    fixture = TestBed.createComponent(LeaveTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
