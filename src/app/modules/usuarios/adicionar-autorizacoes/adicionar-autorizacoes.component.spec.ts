import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarAutorizacoesComponent } from './adicionar-autorizacoes.component';

describe('AdicionarAutorizacoesComponent', () => {
  let component: AdicionarAutorizacoesComponent;
  let fixture: ComponentFixture<AdicionarAutorizacoesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarAutorizacoesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarAutorizacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
