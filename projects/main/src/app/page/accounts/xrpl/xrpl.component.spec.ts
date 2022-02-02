import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XrplComponent } from './xrpl.component';

describe('XrplComponent', () => {
  let component: XrplComponent;
  let fixture: ComponentFixture<XrplComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ XrplComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(XrplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
