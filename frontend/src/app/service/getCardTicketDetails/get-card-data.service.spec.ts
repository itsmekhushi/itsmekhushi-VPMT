import { TestBed } from '@angular/core/testing';

import { GetCardDataService } from './get-card-data.service';

describe('GetCardDataService', () => {
  let service: GetCardDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetCardDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
