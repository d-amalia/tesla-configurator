import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaModelOptions } from './tesla-option.model';
import { TeslaDataService } from '../services/tesla-data.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tesla-options-selector',
  standalone: true,
  imports: [
    NgIf,
    NgFor
  ],
  templateUrl: './tesla-options-selector.component.html',
  styleUrl: './tesla-options-selector.component.scss'
})
export default class TeslaOptionsSelectorComponent implements OnInit, OnDestroy {

  public dataLoaded: boolean = false;
  public options!: TeslaModelOptions;

  private subSink = new Subscription();

  constructor(private dataService: TeslaDataService) {
  }

  ngOnInit(): void {
    this.initializeModelOptionsData();
  }

  private initializeModelOptionsData(): void {
    const modelCode = "X";
    const subscription = this.dataService.getTeslaModelOptions(modelCode).subscribe((options) => {
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
