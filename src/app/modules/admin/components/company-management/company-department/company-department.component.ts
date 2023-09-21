import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DepartmentModel } from 'src/app/models/deparment.model';
const ELEMENT_DATA: DepartmentModel[] = [
  { code: "1", name: 'Hydrogen', office: "test" },
  { code: "2", name: 'test', office: "test" },
  { code: "3", name: 'test1', office: "test" },
];
@Component({
  selector: 'app-company-department',
  templateUrl: './company-department.component.html',
  styleUrls: ['./company-department.component.scss']
})
export class CompanyDepartmentComponent {
  displayedColumns: string[] = ['code', 'name', 'office', 'action'];
  dataSource: MatTableDataSource<DepartmentModel>;
  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  onNavigateEdit(item: DepartmentModel) {
    console.log("test");
    this.router.navigate(['admin/company/employee', item.code])
  }
}
