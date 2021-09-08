import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarSenhaComponent } from './atualizar-senha.component';

describe('AtualizarSenhaComponent', () => {
  let component: AtualizarSenhaComponent;
  let fixture: ComponentFixture<AtualizarSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtualizarSenhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
