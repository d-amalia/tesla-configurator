import { CanActivateFn } from '@angular/router';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';
import { inject } from '@angular/core';

export const canActivateOptionsSelectionGuard: CanActivateFn = () => {
  const configurationManagerService = inject(TeslaConfigurationManagerService);
  const configurationFormManager = configurationManagerService.configurationFormManager;

  const canActivate = configurationFormManager.modelCodeSelected;
  return canActivate;
};
