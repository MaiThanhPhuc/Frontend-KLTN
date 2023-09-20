import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDepartmentComponent } from './company-department.component';

describe('CompanyDepartmentComponent', () => {
  let component: CompanyDepartmentComponent;
  let fixture: ComponentFixture<CompanyDepartmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyDepartmentComponent]
    });
    fixture = TestBed.createComponent(CompanyDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
