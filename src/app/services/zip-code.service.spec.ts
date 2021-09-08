import { TestBed } from '@angular/core/testing';

import { ZipCodeService } from './zip-code.service';

describe('ZipCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ZipCodeService = TestBed.get(ZipCodeService);
    expect(service).toBeTruthy();
  });
});
