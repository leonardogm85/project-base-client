import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNotifyComponent } from './modal-notify.component';

describe('ModalNotifyComponent', () => {
  let component: ModalNotifyComponent;
  let fixture: ComponentFixture<ModalNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
