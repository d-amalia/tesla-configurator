import { Component, OnInit } from '@angular/core';
import { TeslaDataService } from '../services/tesla-data.service';
import { TeslaModel } from './tesla-model.model';
import { Observable } from 'rxjs';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tesla-model-selector',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgFor
  ],
  templateUrl: './tesla-model-selector.component.html',
  styleUrl: './tesla-model-selector.component.scss'
})
export class TeslaModelSelectorComponent implements OnInit {

  public teslaModels$!: Observable<TeslaModel[]>;

  constructor(private teslaDataService: TeslaDataService) {
  }

  ngOnInit(): void {
    this.initializeTeslaModels();
  }

  private initializeTeslaModels(): void {
    this.teslaModels$ = this.teslaDataService.getTeslaModels();
  }
}
