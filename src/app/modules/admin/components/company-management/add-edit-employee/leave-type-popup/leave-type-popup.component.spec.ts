import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveTypePopupComponent } from './leave-type-popup.component';

describe('LeaveTypePopupComponent', () => {
  let component: LeaveTypePopupComponent;
  let fixture: ComponentFixture<LeaveTypePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveTypePopupComponent]
    });
    fixture = TestBed.createComponent(LeaveTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
