import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoConfirmedComponent } from './produto-confirmed.component';

describe('ProdutoConfirmedComponent', () => {
  let component: ProdutoConfirmedComponent;
  let fixture: ComponentFixture<ProdutoConfirmedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoConfirmedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoConfirmedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
