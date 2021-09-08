import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarContaComponent } from './atualizar-conta.component';

describe('AtualizarContaComponent', () => {
  let component: AtualizarContaComponent;
  let fixture: ComponentFixture<AtualizarContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
