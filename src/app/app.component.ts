import { Component } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeslaConfigurationStepsComponent } from './tesla-configuration-steps/tesla-configuration-steps.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    TeslaConfigurationStepsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
