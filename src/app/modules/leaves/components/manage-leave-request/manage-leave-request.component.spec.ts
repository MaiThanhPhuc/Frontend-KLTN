import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageLeaveRequestComponent } from './manage-leave-request.component';

describe('ManageLeaveRequestComponent', () => {
  let component: ManageLeaveRequestComponent;
  let fixture: ComponentFixture<ManageLeaveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageLeaveRequestComponent]
    });
    fixture = TestBed.createComponent(ManageLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
