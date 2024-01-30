import { Injectable } from '@angular/core';
import { TeslaConfigurationFormManager } from '../tesla-configuration-summary/tesla-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationManagerService {
  private _configurationFormManager: TeslaConfigurationFormManager

  constructor() {
    this._configurationFormManager = new TeslaConfigurationFormManager();
  }

  public get configurationFormManager(): TeslaConfigurationFormManager {
    return this._configurationFormManager;
  }
}
