import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaModelConfig, TeslaModelOptions } from './tesla-option.model';
import { TeslaDataService } from '../services/tesla-data.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TeslaConfigurationFormManager } from '../tesla-configuration-summary/tesla-configuration.model';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';

@Component({
  selector: 'app-tesla-options-selector',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule,
    CurrencyPipe
  ],
  templateUrl: './tesla-options-selector.component.html',
  styleUrl: './tesla-options-selector.component.scss'
})
export default class TeslaOptionsSelectorComponent implements OnInit, OnDestroy {

  public options: TeslaModelOptions | null = null;
  public config: TeslaModelConfig | null = null;

  public dataLoaded: boolean = false;
  public configurationFormManager: TeslaConfigurationFormManager;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    this.initializeOptionsData();
    this.onConfigSelectionChange();
  }

  private initializeOptionsData(): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    if (selectedModelCode === null) {
      return;
    }

    const subscription = this.dataService.getTeslaModelOptions(selectedModelCode).subscribe((options) => {
      this.onInitializedModelOptionsData(options);
    });

    this.subSink.add(subscription);
  }

  private onInitializedModelOptionsData(options: TeslaModelOptions): void {
    this.options = options;

    const selectedConfigId = this.configurationFormManager.configIdControlValue;
    this.initializeConfig(selectedConfigId);

    this.dataLoaded = true;
  }

  private onConfigSelectionChange(): void {
    const subscription = this.configurationFormManager.configIdControlValueChanges.subscribe((configId: number | null) => {
      this.initializeConfig(configId);
    });

    this.subSink.add(subscription);
  }

  private initializeConfig(configId: number | null): void {
    if (configId === null || this.options === null) {
      this.config = null;
      return;
    }

    const foundConfig = this.options.configs.find(config => config.id == configId);
    if (foundConfig === undefined) {
      return;
    }

    this.config = foundConfig;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
