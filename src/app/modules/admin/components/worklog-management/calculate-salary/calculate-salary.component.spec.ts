import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculateSalaryComponent } from './calculate-salary.component';

describe('CalculateSalaryComponent', () => {
  let component: CalculateSalaryComponent;
  let fixture: ComponentFixture<CalculateSalaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalculateSalaryComponent]
    });
    fixture = TestBed.createComponent(CalculateSalaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
