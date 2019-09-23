import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteNumberPage } from './route-number.page';

describe('RouteNumberPage', () => {
  let component: RouteNumberPage;
  let fixture: ComponentFixture<RouteNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteNumberPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
