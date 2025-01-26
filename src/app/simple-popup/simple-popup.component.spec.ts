import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplePopupComponent } from './simple-popup.component';

describe('SimplePopupComponent', () => {
  let component: SimplePopupComponent;
  let fixture: ComponentFixture<SimplePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimplePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
