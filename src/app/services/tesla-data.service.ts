import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { TeslaModel } from '../tesla-model-selector/tesla-model.model';

@Injectable({
  providedIn: 'root'
})
export class TeslaDataService {

  constructor(private httpClient: HttpClient) { }

  public getTeslaModels(): Observable<TeslaModel[]> {
    const teslaModels$ = this.getTeslaModelsByAPI();

    const teslaModelsFeedback$ = teslaModels$.pipe(
      catchError((err) => {
        console.error('Error getting tesla models:', err);
        throw err;
      })
    );

    return teslaModelsFeedback$;
  }

  private getTeslaModelsByAPI(): Observable<TeslaModel[]> {
    const url = '/models';

    return this.httpClient.get<TeslaModel[]>(url);
  }
}
