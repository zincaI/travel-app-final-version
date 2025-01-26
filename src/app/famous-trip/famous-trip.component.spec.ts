import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamousTripComponent } from './famous-trip.component';

describe('FamousTripComponent', () => {
  let component: FamousTripComponent;
  let fixture: ComponentFixture<FamousTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FamousTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FamousTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
