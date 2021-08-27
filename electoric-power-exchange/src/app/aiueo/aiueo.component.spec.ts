import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiueoComponent } from './aiueo.component';

describe('AiueoComponent', () => {
  let component: AiueoComponent;
  let fixture: ComponentFixture<AiueoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiueoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AiueoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
