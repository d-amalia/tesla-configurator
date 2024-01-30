import { Injectable } from '@angular/core';
import { TeslaConfigurationStep } from './tesla-configuration-step.model';
import { RoutingConstants } from '../routing/routing-constants';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';
import { TeslaConfigurationFormManager } from '../tesla-configuration-summary/tesla-configuration.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationStepsService {

  private configurationFormManager: TeslaConfigurationFormManager;

  constructor(private configurationManagerService: TeslaConfigurationManagerService) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  public createConfigurationSteps(): TeslaConfigurationStep[] {
    const steps = [];

    steps.push(this.createFirstConfigurationStep());
    steps.push(this.createSecondConfigurationStep());
    steps.push(this.createThirdConfigurationStep());

    return steps;
  }

  private createFirstConfigurationStep(): TeslaConfigurationStep {
    const stepNumber = 1;
    const routerLink = RoutingConstants.getTeslaModelSelectorPagePath();
    const canDeactivateCallback = () => {
      return false;
    };

    const step = new TeslaConfigurationStep(
      stepNumber, routerLink, canDeactivateCallback
    );

    return step;
  }

  private createSecondConfigurationStep(): TeslaConfigurationStep {
    const stepNumber = 2;
    const routerLink = RoutingConstants.getTeslaOptionsSelectorPagePath();
    const canDeactivateCallback = () => {
      return !this.configurationFormManager.modelCodeSelected;
    }

    const step = new TeslaConfigurationStep(
      stepNumber, routerLink, canDeactivateCallback
    );

    return step;
  }

  private createThirdConfigurationStep(): TeslaConfigurationStep {
    const stepNumber = 3;
    const routerLink = RoutingConstants.getTelsaConfigurationSummaryPagePath();
    const canDeactivateCallback = () => {
      return !(this.configurationFormManager.modelCodeSelected && this.configurationFormManager.configIdSelected);
    }

    const step = new TeslaConfigurationStep(
      stepNumber, routerLink, canDeactivateCallback
    );

    return step;
  }

}
