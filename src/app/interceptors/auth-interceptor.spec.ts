import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth-interceptor';

describe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should created', () => {
    const service: AuthInterceptor = TestBed.get(AuthInterceptor);
    expect(service).toBeTruthy();
  });
});
