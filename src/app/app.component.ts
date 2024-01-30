import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeslaConfigurationStepsComponent } from './tesla-configuration-steps/tesla-configuration-steps.component';
import { TeslaModelViewerComponent } from './tesla-model-viewer/tesla-model-viewer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    TeslaConfigurationStepsComponent,
    TeslaModelViewerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
