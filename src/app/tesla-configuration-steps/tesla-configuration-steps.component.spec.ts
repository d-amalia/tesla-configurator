import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaConfigurationStepsComponent } from './tesla-configuration-steps.component';

describe('TeslaConfigurationStepsComponent', () => {
  let component: TeslaConfigurationStepsComponent;
  let fixture: ComponentFixture<TeslaConfigurationStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaConfigurationStepsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaConfigurationStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
