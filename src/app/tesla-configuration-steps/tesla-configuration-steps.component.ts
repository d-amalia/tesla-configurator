import { Component, OnInit } from '@angular/core';
import { TeslaConfigurationStepsService } from './tesla-configuration-steps.service';
import { TeslaConfigurationStep } from './tesla-configuration-step.model';
import { NgFor } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-tesla-configuration-steps',
  standalone: true,
  imports: [
    NgFor,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './tesla-configuration-steps.component.html',
  styleUrl: './tesla-configuration-steps.component.scss'
})
export class TeslaConfigurationStepsComponent implements OnInit {

  steps: TeslaConfigurationStep[] = [];

  constructor(private stepsService: TeslaConfigurationStepsService) {
  }

  ngOnInit(): void {
    this.initializeSteps();
  }

  private initializeSteps(): void {
    this.steps = this.stepsService.createConfigurationSteps();
  }
}
