import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaModelOptions } from './tesla-option.model';
import { TeslaDataService } from '../services/tesla-data.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TeslaConfigurationFormManager } from '../tesla-configuration-summary/tesla-configuration.model';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';

@Component({
  selector: 'app-tesla-options-selector',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    ReactiveFormsModule
  ],
  templateUrl: './tesla-options-selector.component.html',
  styleUrl: './tesla-options-selector.component.scss'
})
export default class TeslaOptionsSelectorComponent implements OnInit, OnDestroy {

  public dataLoaded: boolean = false;
  public options: TeslaModelOptions | null = null;
  public configurationFormManager: TeslaConfigurationFormManager;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    this.initializeModelOptionsData();
  }

  private initializeModelOptionsData(): void {
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
    this.dataLoaded = true;
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
