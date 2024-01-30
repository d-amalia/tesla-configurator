import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { TeslaModel } from '../tesla-model-selector/tesla-model.model';
import { TeslaModelOptions } from '../tesla-options-selector/tesla-option.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaDataService {

  constructor(private httpClient: HttpClient) { }

  getTeslaModels(): Observable<TeslaModel[]> {
    const teslaModels$ = this.getTeslaModelsByAPI();

    const teslaModelsFeedback$ = teslaModels$.pipe(
      catchError((err) => {
        console.error('Error fetching tesla models:', err);
        throw err;
      })
    );

    return teslaModelsFeedback$;
  }

  private getTeslaModelsByAPI(): Observable<TeslaModel[]> {
    const url = '/models';

    return this.httpClient.get<TeslaModel[]>(url);
  }

  getTeslaModelOptions(modelCode: string): Observable<TeslaModelOptions> {
    const teslaModelOptions$ = this.getTeslaModelOptionsByAPI(modelCode);

    const teslaModelOptionsFeedback$ = teslaModelOptions$.pipe(
      catchError((err) => {
        console.error('Error fetching tesla model options:', err);
        throw err;
      })
    );

    return teslaModelOptionsFeedback$;
  }

  private getTeslaModelOptionsByAPI(modelCode: string): Observable<TeslaModelOptions> {
    const url = `/options/${modelCode}`;

    return this.httpClient.get<TeslaModelOptions>(url);
  }
}
