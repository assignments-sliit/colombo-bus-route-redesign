import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrrTextPage } from './srr-text.page';

describe('SrrTextPage', () => {
  let component: SrrTextPage;
  let fixture: ComponentFixture<SrrTextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrrTextPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrrTextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
