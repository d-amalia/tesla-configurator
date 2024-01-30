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

  public dataLoaded: boolean = false;
  public models: TeslaModel[] = [];
  public colors: TeslaColor[] = [];
  public configurationFormManager: TeslaConfigurationFormManager;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    this.initializeModelsData();

    this.onModelSelectionChange();
  }

  private initializeModelsData(): void {
    const subscription = this.dataService.getTeslaModels().subscribe((models) => {
      this.onInitializedModelsData(models);
    });

    this.subSink.add(subscription);
  }

  private onInitializedModelsData(models: TeslaModel[]): void {
    this.models = models;

    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    this.initializeColorsData(selectedModelCode);

    this.dataLoaded = true;
  }

  private initializeColorsData(modelCode: string | null): void {
    if (modelCode === null) {
      return;
    }

    const foundModel = this.models.find(model => model.code === modelCode);
    if (foundModel === undefined) {
      return;
    }

    this.colors = foundModel.colors;
  }

  private onModelSelectionChange(): void {
    const subscription = this.configurationFormManager.modelCodeControlValueChanges.subscribe((modelCode: string | null) => {
      this.initializeColorsData(modelCode);
      this.selectFirstColor();
    });

    this.subSink.add(subscription);
  }

  private selectFirstColor(): void {
    const firstColorCode = this.colors[0].code;
    this.configurationFormManager.setColorCodeControlValue(firstColorCode);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
