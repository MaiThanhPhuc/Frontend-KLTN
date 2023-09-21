import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserLeaveTypeItem } from 'src/app/models/leaveType.model';

const ELEMENT_DATA: UserLeaveTypeItem[] = [
  { id: 1, name: 'Hydrogen', total: 1.0079, remaining: 6, taken: 3 },
  { id: 2, name: 'test', total: 1.0079, remaining: 6, taken: 3 },
  { id: 3, name: 'test1', total: 1.0079, remaining: 6, taken: 3 },
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
