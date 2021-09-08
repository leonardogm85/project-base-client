import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPapeisComponent } from './adicionar-papeis.component';

describe('AdicionarPapeisComponent', () => {
  let component: AdicionarPapeisComponent;
  let fixture: ComponentFixture<AdicionarPapeisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarPapeisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarPapeisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
