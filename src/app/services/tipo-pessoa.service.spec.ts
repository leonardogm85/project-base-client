import { TestBed } from '@angular/core/testing';

import { TipoPessoaService } from './tipo-pessoa.service';

describe('TipoPessoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoPessoaService = TestBed.get(TipoPessoaService);
    expect(service).toBeTruthy();
  });
});
