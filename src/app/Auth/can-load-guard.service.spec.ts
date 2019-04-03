import { TestBed } from '@angular/core/testing';

import { CanLoadGuardService } from './can-load-guard.service';

describe('CanLoadGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanLoadGuardService = TestBed.get(CanLoadGuardService);
    expect(service).toBeTruthy();
  });
});
