import { Injectable } from '@angular/core';
import { TeslaConfigurationStep } from './tesla-configuration-step.model';
import { RoutingConstants } from '../routing/routing-constants';

@Injectable({
  providedIn: 'root'
})
export class TeslaConfigurationStepsService {

  constructor() {
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
    const step = new TeslaConfigurationStep(
      stepNumber, routerLink
    );

    return step;
  }

  private createSecondConfigurationStep(): TeslaConfigurationStep {
    const stepNumber = 2;
    const routerLink = RoutingConstants.getTeslaOptionsSelectorPagePath();
    const step = new TeslaConfigurationStep(
      stepNumber, routerLink
    );

    return step;
  }

  private createThirdConfigurationStep(): TeslaConfigurationStep {
    const stepNumber = 3;
    const routerLink = RoutingConstants.getTelsaConfigurationSummaryPagePath();
    const step = new TeslaConfigurationStep(
      stepNumber, routerLink
    );

    return step;
  }

}
