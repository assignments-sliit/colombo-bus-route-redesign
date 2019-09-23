import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrrMapPage } from './srr-map.page';

describe('SrrMapPage', () => {
  let component: SrrMapPage;
  let fixture: ComponentFixture<SrrMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrrMapPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrrMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
