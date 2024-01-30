import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaDataService } from '../services/tesla-data.service';
import { TeslaColor, TeslaModel } from './tesla-model.model';
import { Subscription } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TeslaConfigurationFormManager } from '../tesla-configuration-summary/tesla-configuration.model';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';

@Component({
  selector: 'app-tesla-model-selector',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './tesla-model-selector.component.html',
  styleUrl: './tesla-model-selector.component.scss'
})
export class TeslaModelSelectorComponent implements OnInit, OnDestroy {

  dataLoaded: boolean = false;
  models: TeslaModel[] = [];
  colors: TeslaColor[] = [];
  configurationFormManager: TeslaConfigurationFormManager;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    this.fetchModelsAndColorsData();
    this.subscribeToModelSelectionChanges();
  }

  private fetchModelsAndColorsData(): void {
    const subscription = this.dataService.getTeslaModels().subscribe((models) => {
      this.models = models;
      this.initializeColorsData();
      this.dataLoaded = true;
    });

    this.subSink.add(subscription);
  }

  private initializeColorsData(): void {
    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    const foundModel = this.models.find(model => model.code === selectedModelCode);

    this.colors = foundModel ? foundModel.colors : [];
  }

  private subscribeToModelSelectionChanges(): void {
    const self = this;
    const subscription = this.configurationFormManager.modelCodeControlValueChanges.subscribe(() => {
      self.initializeColorsData();
      self.selectFirstColorIfAvailable();
      self.clearConfig()
    });

    this.subSink.add(subscription);
  }

  private selectFirstColorIfAvailable(): void {
    if (this.colors.length === 0) return;

    const firstColorCode = this.colors[0].code;
    this.configurationFormManager.setColorCodeControlValue(firstColorCode);
  }

  private clearConfig(): void {
    this.configurationFormManager.resetConfigIdControl();
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
