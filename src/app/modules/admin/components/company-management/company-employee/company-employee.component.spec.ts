import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEmployeeComponent } from './company-employee.component';

describe('CompanyEmployeeComponent', () => {
  let component: CompanyEmployeeComponent;
  let fixture: ComponentFixture<CompanyEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyEmployeeComponent]
    });
    fixture = TestBed.createComponent(CompanyEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
