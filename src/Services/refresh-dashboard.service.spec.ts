import { TestBed } from '@angular/core/testing';

import { RefreshDashboardService } from './refresh-dashboard.service';

describe('RefreshDashboardService', () => {
  let service: RefreshDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RefreshDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
