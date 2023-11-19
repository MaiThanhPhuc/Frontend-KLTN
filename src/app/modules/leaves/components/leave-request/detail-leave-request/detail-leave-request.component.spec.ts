import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailLeaveRequestComponent } from './detail-leave-request.component';

describe('DetailLeaveRequestComponent', () => {
  let component: DetailLeaveRequestComponent;
  let fixture: ComponentFixture<DetailLeaveRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailLeaveRequestComponent]
    });
    fixture = TestBed.createComponent(DetailLeaveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
