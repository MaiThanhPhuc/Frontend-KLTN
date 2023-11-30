import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeStatusLeaveRequestComponent } from './change-status-leave-request.component';

describe('ChangeStatusLeaveRequestComponent', () => {
  let component: ChangeStatusLeaveRequestComponent;
  let fixture: ComponentFixture<ChangeStatusLeaveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeStatusLeaveRequestComponent]
    });
    fixture = TestBed.createComponent(ChangeStatusLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
