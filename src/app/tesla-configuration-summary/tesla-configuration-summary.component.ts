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

  public dataLoaded: boolean = false;
  public selectedModel: TeslaModel | null = null;
  public selectedColor: TeslaColor | null = null;
  public selectedConfig: TeslaModelConfig | null = null;

  public configurationFormManager: TeslaConfigurationFormManager;
  public totalCost: number = 0;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    if (selectedModelCode) {
      this.initializeTeslaConfigurations(selectedModelCode);
    }
  }

  private initializeTeslaConfigurations(selectedModelCode: string): void {
    const teslaModels$ = this.dataService.getTeslaModels();
    const teslaOptions$ = this.dataService.getTeslaModelOptions(selectedModelCode);

    const self = this;
    const subscription = combineLatest([teslaModels$, teslaOptions$]).subscribe((
      [teslaModels, teslaOptions]) => {
      self.initializeSelectedTeslaConfigurations(teslaModels, teslaOptions);
    });

    this.subSink.add(subscription);
  }

  private initializeSelectedTeslaConfigurations(models: TeslaModel[], options: TeslaModelOptions): void {
    this.initializeSelectedModel(models);
    this.initializeSelectedColor();
    this.initializeSelectedConfig(options);
  }

  private initializeSelectedModel(models: TeslaModel[]): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    if (selectedModelCode === null) {
      return;
    }

    const foundModel = models.find(model => model.code === selectedModelCode);
    if (foundModel === undefined) {
      return;
    }

    this.selectedModel = foundModel;
  }

  private initializeSelectedColor(): void {
    const selectedColorCode = this.configurationFormManager.colorCodeControlValue;
    if (selectedColorCode === null || this.selectedModel === null) {
      return;
    }

    const foundColor = this.selectedModel.colors.find(color => color.code === selectedColorCode);
    if (foundColor === undefined) {
      return;
    }

    this.selectedColor = foundColor;
  }

  private initializeSelectedConfig(options: TeslaModelOptions): void {
    const selectedConfigId = this.configurationFormManager.configIdControlValue;
    if (selectedConfigId === null) {
      return;
    }

    const foundConfig = options.configs.find(config => config.id === selectedConfigId);
    if (foundConfig === undefined) {
      return;
    }

    this.selectedConfig = foundConfig;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
