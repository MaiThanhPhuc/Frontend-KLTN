import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCommonPopupComponent } from './add-edit-common-popup.component';

describe('AddEditCommonPopupComponent', () => {
  let component: AddEditCommonPopupComponent;
  let fixture: ComponentFixture<AddEditCommonPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditCommonPopupComponent]
    });
    fixture = TestBed.createComponent(AddEditCommonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
