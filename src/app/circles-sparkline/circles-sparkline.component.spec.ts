import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CirclesSparklineComponent } from './circles-sparkline.component';

describe('CirclesSparklineComponent', () => {
  let component: CirclesSparklineComponent;
  let fixture: ComponentFixture<CirclesSparklineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CirclesSparklineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CirclesSparklineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
