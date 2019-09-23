import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrrHostPage } from './srr-host.page';

describe('SrrHostPage', () => {
  let component: SrrHostPage;
  let fixture: ComponentFixture<SrrHostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrrHostPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrrHostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
