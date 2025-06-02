import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshDashboardService {

  private refreshDashboardAPI = new Subject<void>();
  $refreshAPI = this.refreshDashboardAPI.asObservable();
  constructor() { }


  triggerRefresh(){
    this.refreshDashboardAPI.next();
  }
}
