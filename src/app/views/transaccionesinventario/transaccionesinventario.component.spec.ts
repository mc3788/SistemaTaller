import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransaccionesinventarioComponent } from './transaccionesinventario.component';

describe('TransaccionesinventarioComponent', () => {
  let component: TransaccionesinventarioComponent;
  let fixture: ComponentFixture<TransaccionesinventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransaccionesinventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransaccionesinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
