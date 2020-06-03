import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaPedidoComponent } from './pesquisa-pedido.component';

describe('PesquisaPedidoComponent', () => {
  let component: PesquisaPedidoComponent;
  let fixture: ComponentFixture<PesquisaPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PesquisaPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
