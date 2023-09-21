import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OfficeModel } from 'src/app/models/office.model';
const ELEMENT_DATA: OfficeModel[] = [
  { code: "1", name: 'Hydrogen', address: "test", phone: 1232 },
  { code: "2", name: 'test', address: "test", phone: 123 },
  { code: "3", name: 'test1', address: "test", phone: 133 },
];
@Component({
  selector: 'app-company-office',
  templateUrl: './company-office.component.html',
  styleUrls: ['./company-office.component.scss']
})
export class CompanyOfficeComponent {
  displayedColumns: string[] = ['code', 'name', 'office', 'action'];
  dataSource: MatTableDataSource<OfficeModel>;
  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  onNavigateEdit(item: OfficeModel) {
    console.log("test");
    this.router.navigate(['admin/company/employee', item.code])
  }
}
