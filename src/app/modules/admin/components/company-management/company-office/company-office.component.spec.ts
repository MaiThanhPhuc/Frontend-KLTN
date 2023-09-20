import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyOfficeComponent } from './company-office.component';

describe('CompanyOfficeComponent', () => {
  let component: CompanyOfficeComponent;
  let fixture: ComponentFixture<CompanyOfficeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyOfficeComponent]
    });
    fixture = TestBed.createComponent(CompanyOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
