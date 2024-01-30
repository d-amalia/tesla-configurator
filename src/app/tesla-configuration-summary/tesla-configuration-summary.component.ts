import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaColor, TeslaModel } from '../tesla-model-selector/tesla-model.model';
import { TeslaModelConfig, TeslaModelOptions } from '../tesla-options-selector/tesla-option.model';
import { Subscription, combineLatest } from 'rxjs';
import { TeslaDataService } from '../services/tesla-data.service';
import { TeslaConfigurationFormManager } from './tesla-configuration.model';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';
import { CurrencyPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-tesla-configuration-summary',
  standalone: true,
  imports: [NgIf, CurrencyPipe],
  templateUrl: './tesla-configuration-summary.component.html',
  styleUrl: './tesla-configuration-summary.component.scss'
})
export default class TeslaConfigurationSummaryComponent implements OnInit, OnDestroy {

  dataLoaded: boolean = false;
  selectedModel: TeslaModel | null = null;
  selectedColor: TeslaColor | null = null;
  selectedConfig: TeslaModelConfig | null = null;
  configurationFormManager: TeslaConfigurationFormManager;
  totalCost: number = 0;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    this.fetchConfigurationsData();
  }

  private fetchConfigurationsData(): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    if (!selectedModelCode) return;

    const models$ = this.dataService.getTeslaModels();
    const options$ = this.dataService.getTeslaModelOptions(selectedModelCode);

    const self = this;
    const subscription = combineLatest([models$, options$]).subscribe((
      [models, options]) => {
      self.initializeSelectedModel(models);
      self.initializeSelectedColor();
      self.initializeSelectedConfig(options);
    });

    this.subSink.add(subscription);
  }

  private initializeSelectedModel(models: TeslaModel[]): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    if (!selectedModelCode) return;

    const foundModel = models.find(model => model.code === selectedModelCode);
    this.selectedModel = foundModel ? foundModel : null;
  }

  private initializeSelectedColor(): void {
    const selectedColorCode = this.configurationFormManager.colorCodeControlValue;
    if (!selectedColorCode || !this.selectedModel) return;

    const foundColor = this.selectedModel.colors.find(color => color.code === selectedColorCode);
    this.selectedColor = foundColor ? foundColor : null;
  }

  private initializeSelectedConfig(options: TeslaModelOptions): void {
    const selectedConfigId = this.configurationFormManager.configIdControlValue;
    if (!selectedConfigId) return;

    const foundConfig = options.configs.find(config => config.id === selectedConfigId);
    this.selectedConfig = foundConfig ? foundConfig : null;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
