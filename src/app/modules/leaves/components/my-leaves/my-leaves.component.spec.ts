import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLeavesComponent } from './my-leaves.component';

describe('MyLeavesComponent', () => {
  let component: MyLeavesComponent;
  let fixture: ComponentFixture<MyLeavesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyLeavesComponent]
    });
    fixture = TestBed.createComponent(MyLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
