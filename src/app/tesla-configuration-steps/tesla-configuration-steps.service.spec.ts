import { TestBed } from '@angular/core/testing';

import { TeslaConfigurationStepsService } from './tesla-configuration-steps.service';

describe('TeslaConfigurationStepsService', () => {
  let service: TeslaConfigurationStepsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeslaConfigurationStepsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
