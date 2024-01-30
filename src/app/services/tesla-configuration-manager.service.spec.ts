import { TestBed } from '@angular/core/testing';

import { TeslaConfigurationManagerService } from './tesla-configuration-manager.service';

describe('TeslaConfigurationManagerService', () => {
  let service: TeslaConfigurationManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaConfigurationManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
