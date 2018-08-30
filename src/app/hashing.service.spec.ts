import { TestBed, inject } from '@angular/core/testing';

import { HashingService } from './hashing.service';

describe('HashingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HashingService]
    });
  });

  it('should be created', inject([HashingService], (service: HashingService) => {
    expect(service).toBeTruthy();
  }));
});
