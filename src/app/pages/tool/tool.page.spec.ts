import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolPage } from './tool.page';

describe('Tab3Page', () => {
  let component: ToolPage;
  let fixture: ComponentFixture<ToolPage>;

  beforeEach(async () => {
    fixture = TestBed.createComponent(ToolPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
