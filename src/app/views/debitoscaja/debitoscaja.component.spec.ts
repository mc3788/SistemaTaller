import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebitoscajaComponent } from './debitoscaja.component';

describe('DebitoscajaComponent', () => {
  let component: DebitoscajaComponent;
  let fixture: ComponentFixture<DebitoscajaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebitoscajaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebitoscajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
