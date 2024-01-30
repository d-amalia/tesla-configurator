import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeslaModelViewerComponent } from './tesla-model-viewer.component';

describe('TeslaModelViewerComponent', () => {
  let component: TeslaModelViewerComponent;
  let fixture: ComponentFixture<TeslaModelViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeslaModelViewerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeslaModelViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
