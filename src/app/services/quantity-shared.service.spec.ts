import { TestBed } from '@angular/core/testing';

import { QuantitySharedService } from './quantity-shared.service';

describe('QuantitySharedService', () => {
  let service: QuantitySharedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuantitySharedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
