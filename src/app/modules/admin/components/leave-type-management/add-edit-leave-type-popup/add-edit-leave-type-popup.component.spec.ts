import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditLeaveTypePopupComponent } from './add-edit-leave-type-popup.component';

describe('AddEditLeaveTypePopupComponent', () => {
  let component: AddEditLeaveTypePopupComponent;
  let fixture: ComponentFixture<AddEditLeaveTypePopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditLeaveTypePopupComponent]
    });
    fixture = TestBed.createComponent(AddEditLeaveTypePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
