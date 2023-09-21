import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';


const ELEMENT_DATA: TeamModel[] = [
  { code: "1", name: 'Hydrogen', department: "test" },
  { code: "2", name: 'test', department: "test" },
  { code: "3", name: 'test1', department: "test" },
];
@Component({
  selector: 'app-company-team',
  templateUrl: './company-team.component.html',
  styleUrls: ['./company-team.component.scss']
})
export class CompanyTeamComponent {
  displayedColumns: string[] = ['code', 'name', 'department', 'action'];
  dataSource: MatTableDataSource<TeamModel>;
  constructor(
    private router: Router
  ) {
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  onNavigateEdit(item: TeamModel) {
    console.log("test");
    this.router.navigate(['admin/company/employee', item.code])
  }
}
