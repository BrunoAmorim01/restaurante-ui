import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroRapidoComponent } from './cadastro-rapido.component';

describe('CadastroRapidoComponent', () => {
  let component: CadastroRapidoComponent;
  let fixture: ComponentFixture<CadastroRapidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroRapidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
