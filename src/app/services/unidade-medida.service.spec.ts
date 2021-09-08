import { TestBed } from '@angular/core/testing';

import { UnidadeMedidaService } from './unidade-medida.service';

describe('UnidadeMedidaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnidadeMedidaService = TestBed.get(UnidadeMedidaService);
    expect(service).toBeTruthy();
  });
});
