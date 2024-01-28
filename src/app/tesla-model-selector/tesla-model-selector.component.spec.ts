import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaModelSelectorComponent } from './tesla-model-selector.component';

describe('TeslaModelSelectorComponent', () => {
  let component: TeslaModelSelectorComponent;
  let fixture: ComponentFixture<TeslaModelSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaModelSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaModelSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
