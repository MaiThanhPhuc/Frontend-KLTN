export interface UserLeaveTypeItem {
  id: number,
  name: string;
  total: number;
  remaining: number;
  taken: number;
}

export class LeaveType {
  code: number;
  name: string;
  allowance: number;
  description: string;
}
