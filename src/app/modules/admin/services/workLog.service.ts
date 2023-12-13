import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchModal } from 'src/app/models/employee.model';
import { WorkLogModel } from 'src/app/models/workLog.models';
import { BaseService } from 'src/app/services/base.service';
@Injectable({
  providedIn: 'root'
})
export class WorkLogService extends BaseService {

  createWorkLog(request: WorkLogModel): Observable<string> {
    return this.post("workLog/addWorkLog", request);
  }

  updateWorkLogById(request: WorkLogModel): Observable<string> {
    return this.put(`workLog/updateWorkLogById/${request._id}`, request);
  }

  getAllWorkLog(): Observable<WorkLogModel[]> {
    return this.get("workLog/getAllWorkLog");
  }
  getWorkLogByMonth(month: number, userId: string): Observable<WorkLogModel[]> {
    return this.get(`workLog/getWorkLogByMonth`, { userId: userId, month: month });
  }
  getWorkLogById(id: string): Observable<WorkLogModel> {
    return this.get(`workLog/getWorkLogById/${id}`);
  }
  searchWorkLog(request: SearchModal): Observable<any> {
    return this.get(`workLog/searchWorkLog`, request);
  }
}
