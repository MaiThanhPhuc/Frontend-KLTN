import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';



export interface UserLeaveTypeItem {
  id: number,
  name: string;
  total: number;
  remaining: number;
  taken: number;
}


const ELEMENT_DATA: UserLeaveTypeItem[] = [
  { id: 1, name: 'Hydrogen', total: 1.0079, remaining: 6, taken: 3 },
  { id: 1, name: 'Hydrogen', total: 1.0079, remaining: 6, taken: 3 },
  { id: 1, name: 'Hydrogen', total: 1.0079, remaining: 6, taken: 3 },
];
@Component({
  selector: 'app-user-leave-table',
  templateUrl: './user-leave-table.component.html',
  styleUrls: ['./user-leave-table.component.scss']
})

export class UserLeaveTableComponent {
  displayedColumns: string[] = ['name', 'total', 'remaining', 'taken'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
}
