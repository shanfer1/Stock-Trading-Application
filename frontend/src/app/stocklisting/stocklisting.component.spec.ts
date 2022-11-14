import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StocklistingComponent } from './stocklisting.component';

describe('StocklistingComponent', () => {
  let component: StocklistingComponent;
  let fixture: ComponentFixture<StocklistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StocklistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StocklistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
