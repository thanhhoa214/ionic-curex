import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartPage } from './chart.page';

describe('Tab2Page', () => {
  let component: ChartPage;
  let fixture: ComponentFixture<ChartPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
