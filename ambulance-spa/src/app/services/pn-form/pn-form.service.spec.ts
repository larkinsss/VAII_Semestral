import { TestBed } from '@angular/core/testing';

import { PnFormService } from './pn-form.service';

describe('PnFormService', () => {
  let service: PnFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PnFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
