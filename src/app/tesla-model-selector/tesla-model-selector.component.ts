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
  public modelColors: TeslaColor[] = [];

  public configurationFormManager!: TeslaConfigurationFormManager;
  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
  }

  ngOnInit(): void {
    this.configurationFormManager = this.configurationManagerService.getTeslaConfigurationFormManager();
    this.initializeTeslaModels();

    this.onModelCodeChange();
  }

  private initializeTeslaModels(): void {
    const subscription = this.dataService.getTeslaModels().subscribe((models) => {
      this.onInitializedModels(models);
    });

    this.subSink.add(subscription);
  }

  private onInitializedModels(models: TeslaModel[]): void {
    this.models = models;
    this.dataLoaded = true;

    const selectedModelCode = this.configurationFormManager.modelCodeControlValue;
    this.initializeModelColors(selectedModelCode);
  }

  private onModelCodeChange(): void {
    const subscription = this.configurationFormManager.modelCodeControlValueChanges.subscribe((modelCode: string | null) => {
      this.initializeModelColors(modelCode);
      this.configurationFormManager.setColorCodeControlValue(this.modelColors[0].code)
    });

    this.subSink.add(subscription);
  }

  private initializeModelColors(modelCode: string | null): void {
    if (modelCode === null) {
      return;
    }

    const foundColors = this.models.find(model => model.code === modelCode);
    if (foundColors === undefined) {
      return;
    }

    this.modelColors = foundColors.colors;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
