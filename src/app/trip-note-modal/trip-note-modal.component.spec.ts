import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripNoteModalComponent } from './trip-note-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

xdescribe('TripNoteModalComponent', () => {
  let component: TripNoteModalComponent;
  let fixture: ComponentFixture<TripNoteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripNoteModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripNoteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
