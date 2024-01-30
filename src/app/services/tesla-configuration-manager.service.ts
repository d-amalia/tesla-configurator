import { Injectable } from '@angular/core';
import { TeslaConfigurationFormManager } from '../tesla-configuration-summary/tesla-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationManagerService {
  private configurationFormManager: TeslaConfigurationFormManager

  constructor() {
    this.configurationFormManager = new TeslaConfigurationFormManager();
  }

  public getTeslaConfigurationFormManager(): TeslaConfigurationFormManager {
    return this.configurationFormManager;
  }
}
