import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLeaveTableComponent } from './user-leave-table.component';

describe('UserLeaveTableComponent', () => {
  let component: UserLeaveTableComponent;
  let fixture: ComponentFixture<UserLeaveTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserLeaveTableComponent]
    });
    fixture = TestBed.createComponent(UserLeaveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
