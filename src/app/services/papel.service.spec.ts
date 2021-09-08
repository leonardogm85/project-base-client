import { TestBed } from '@angular/core/testing';

import { PapelService } from './papel.service';

describe('PapelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PapelService = TestBed.get(PapelService);
    expect(service).toBeTruthy();
  });
});
