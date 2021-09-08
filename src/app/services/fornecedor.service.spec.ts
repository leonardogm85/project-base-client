import { TestBed } from '@angular/core/testing';

import { FornecedorService } from './fornecedor.service';

describe('FornecedorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FornecedorService = TestBed.get(FornecedorService);
    expect(service).toBeTruthy();
  });
});
