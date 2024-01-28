import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaConfigurationSummaryComponent } from './tesla-configuration-summary.component';

describe('TeslaConfigurationSummaryComponent', () => {
  let component: TeslaConfigurationSummaryComponent;
  let fixture: ComponentFixture<TeslaConfigurationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaConfigurationSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaConfigurationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
