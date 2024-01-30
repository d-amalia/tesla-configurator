import { CanActivateFn } from '@angular/router';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';
import { inject } from '@angular/core';

export const canActivateConfigurationSummaryGuard: CanActivateFn = () => {
  const configurationManagerService = inject(TeslaConfigurationManagerService);
  const configurationFormManager = configurationManagerService.configurationFormManager;

  if (configurationFormManager.modelCodeSelected && configurationFormManager.configIdSelected) {
    return true
  }

  return false;
};
