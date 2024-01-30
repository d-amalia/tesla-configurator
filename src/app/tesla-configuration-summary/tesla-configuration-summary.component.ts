import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaColor, TeslaModel } from '../tesla-model-selector/tesla-model.model';
import { TeslaModelConfig, TeslaModelOptions } from '../tesla-options-selector/tesla-option.model';
import { Subscription } from 'rxjs';
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
    this.initializeModelsData();
    this.initializeOptionsData();
  }

  private initializeModelsData(): void {
    const subscription = this.dataService.getTeslaModels().subscribe((models) => {
      this.onInitializedModelsData(models);
    });

    this.subSink.add(subscription);
  }

  private onInitializedModelsData(models: TeslaModel[]): void {
    this.initializeSelectedModel(models);
    this.initializeSelectedColor();
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

  private initializeOptionsData(): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    if (selectedModelCode === null) {
      return;
    }

    const subscription = this.dataService.getTeslaModelOptions(selectedModelCode).subscribe((options) => {
      this.initializeSelectedConfig(options);
    });

    this.subSink.add(subscription);
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
