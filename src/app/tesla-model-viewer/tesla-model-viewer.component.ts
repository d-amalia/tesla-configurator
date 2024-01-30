import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaConfigurationFormManager } from '../tesla-configuration-summary/tesla-configuration.model';
import { TeslaConfigurationManagerService } from '../services/tesla-configuration-manager.service';
import { TeslaDataService } from '../services/tesla-data.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-tesla-model-viewer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './tesla-model-viewer.component.html',
  styleUrl: './tesla-model-viewer.component.scss'
})
export class TeslaModelViewerComponent implements OnInit, OnDestroy {

  configurationFormManager: TeslaConfigurationFormManager;
  imageURL: string | null = null;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService,
    private configurationManagerService: TeslaConfigurationManagerService
  ) {
    this.configurationFormManager = this.configurationManagerService.configurationFormManager;
  }

  ngOnInit(): void {
    this.subscribeToModelSelectionChanges();
    this.subscribeToColorSelectionChanges();
  }

  private subscribeToModelSelectionChanges(): void {
    const self = this;
    const subscription = this.configurationFormManager.modelCodeControlValueChanges.subscribe(() => {
      self.setImageURL();
    });

    this.subSink.add(subscription);
  }

  private subscribeToColorSelectionChanges(): void {
    const self = this;
    const subscription = this.configurationFormManager.colorCodeControlValueChanges.subscribe(() => {
      self.setImageURL();
    });

    this.subSink.add(subscription);
  }

  private setImageURL(): void {
    const modelCode = this.configurationFormManager.modelCodeControlValue;
    const colorCode = this.configurationFormManager.colorCodeControlValue;

    this.imageURL = this.dataService.getTeslaImageURL(modelCode, colorCode);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
