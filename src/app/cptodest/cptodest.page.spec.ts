import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CptodestPage } from './cptodest.page';

describe('CptodestPage', () => {
  let component: CptodestPage;
  let fixture: ComponentFixture<CptodestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CptodestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CptodestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
