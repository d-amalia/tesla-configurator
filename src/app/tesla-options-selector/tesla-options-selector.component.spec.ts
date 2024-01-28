import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaOptionsSelectorComponent } from './tesla-options-selector.component';

describe('TeslaOptionsSelectorComponent', () => {
  let component: TeslaOptionsSelectorComponent;
  let fixture: ComponentFixture<TeslaOptionsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaOptionsSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeslaOptionsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
