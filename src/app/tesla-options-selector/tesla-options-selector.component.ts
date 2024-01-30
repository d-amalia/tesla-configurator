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

  dataLoaded: boolean = false;
  options: TeslaModelOptions | null = null;
  selectedConfig: TeslaModelConfig | null = null;
  configurationFormManager: TeslaConfigurationFormManager;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    this.fetchOptionsData();
    this.subscribeToConfigSelectionChanges();
  }

  private fetchOptionsData(): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    if (!selectedModelCode) return;

    const subscription = this.dataService.getTeslaModelOptions(selectedModelCode).subscribe((options) => {
      this.options = options;
      this.setSelectedConfigData();
      this.dataLoaded = true;
    });

    this.subSink.add(subscription);
  }

  private setSelectedConfigData(): void {
    const selectedConfigId = this.configurationFormManager.configIdControlValue;
    if (!selectedConfigId || !this.options) {
      this.selectedConfig = null;
      return;
    }

    const foundConfig = this.options.configs.find(config => config.id == selectedConfigId);
    this.selectedConfig = foundConfig ? foundConfig : null;
  }

  private subscribeToConfigSelectionChanges(): void {
    const subscription = this.configurationFormManager.configIdControlValueChanges.subscribe(() => {
      this.setSelectedConfigData();
    });

    this.subSink.add(subscription);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
