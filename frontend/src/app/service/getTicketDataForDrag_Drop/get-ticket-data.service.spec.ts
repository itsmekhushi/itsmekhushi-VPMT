import { TestBed } from '@angular/core/testing';

import { GetTicketDataService } from './get-ticket-data.service';

describe('GetTicketDataService', () => {
  let service: GetTicketDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTicketDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
