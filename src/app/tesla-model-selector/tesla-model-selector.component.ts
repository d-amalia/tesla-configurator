import { Component, OnDestroy, OnInit } from '@angular/core';
import { TeslaDataService } from '../services/tesla-data.service';
import { TeslaModel } from './tesla-model.model';
import { Observable, Subscription } from 'rxjs';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

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

  public teslaModels$!: Observable<TeslaModel[]>;
  public modelControl!: FormControl<string | null>;

  private subSink = new Subscription();

  constructor(private teslaDataService: TeslaDataService) {
  }

  ngOnInit(): void {
    this.initializeTeslaModels();
    this.initializeModelControl();

    this.onModelControlValueChange();
  }

  private initializeTeslaModels(): void {
    this.teslaModels$ = this.teslaDataService.getTeslaModels();
  }

  private initializeModelControl(): void {
    this.modelControl = new FormControl<string | null>(null, {
      validators: Validators.required
    });
  }

  private onModelControlValueChange(): void {
    const subscription = this.modelControl.valueChanges.subscribe((modelCode: string | null) => {
      console.log(modelCode);
    });

    this.subSink.add(subscription);
  }

  ngOnDestroy(): void {
    this.subSink.unsubscribe();
  }
}
