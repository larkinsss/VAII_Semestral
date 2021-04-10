import { TestBed } from '@angular/core/testing';

import { PnFormDataService } from './pn-form-data.service';

describe('PnFormDataService', () => {
  let service: PnFormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnFormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
