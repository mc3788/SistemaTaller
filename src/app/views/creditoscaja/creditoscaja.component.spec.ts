import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoscajaComponent } from './creditoscaja.component';

describe('CreditoscajaComponent', () => {
  let component: CreditoscajaComponent;
  let fixture: ComponentFixture<CreditoscajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditoscajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditoscajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
