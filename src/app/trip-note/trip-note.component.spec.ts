import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripNoteComponent } from './trip-note.component';
import { TripNote } from '../model/trip-note.model';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CapitalLettersPipe } from '../capital-letters.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MockModule, MockService } from 'ng-mocks';
import { TripNoteService } from '../trip-note.service';
import { MatDialog } from '@angular/material/dialog';
import { TripNoteModalComponent } from '../trip-note-modal/trip-note-modal.component';

describe('TripNoteComponent', () => {
  let component: TripNoteComponent;
  let fixture: ComponentFixture<TripNoteComponent>;
  let tripNoteService: TripNoteService;
  let dialog: MatDialog;

  beforeEach(async () => {
    tripNoteService = MockService(TripNoteService);
    dialog = MockService(MatDialog);

    await TestBed.configureTestingModule({
      imports: [
        MockModule(MatCardModule),
        MockModule(CommonModule),
        MockModule(MatIconModule),
        CapitalLettersPipe,
        MockModule(MatButtonModule),
      ],
      declarations: [TripNoteComponent],
      providers: [
        { provide: TripNoteService, useValue: tripNoteService },
        { provide: MatDialog, useValue: dialog },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripNoteComponent);
    fixture.componentRef.setInput('tripNote', { title: 'title' });
    component = fixture.componentInstance;
    fixture.detectChanges();
    // fixture.componentInstance.tripNote = { title: 'title' } as TripNote;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getNumberArray', () => {
    it('should create an array with the length 3', () => {
      const array = component.getNumberArray(3);

      expect(array.length).toEqual(3);
    });
  });

  describe('openDialog', () => {
    it('should set the current note and open the modal', () => {
      // spyOn(tripNoteService, 'getNotes').and.callFake(
      //   () => [{ id: 1 } as TripNote] as TripNote[]
      // );
      spyOn(tripNoteService, 'setCurrentNote');
      spyOn(dialog, 'open');

      component.openDialog(true, 1, '', '');

      expect(tripNoteService.setCurrentNote).toHaveBeenCalledWith(1);
      expect(dialog.open).toHaveBeenCalledWith(TripNoteModalComponent, {
        width: '250px',
        enterAnimationDuration: '',
        exitAnimationDuration: '',
        data: { fromAdd: true },
      });
    });
  });

  describe('deleteNote', () => {
    it('should delete a note', () => {
      spyOn(tripNoteService, 'setCurrentNote');
      spyOn(tripNoteService, 'deleteNote');

      component.deleteNote(2);

      expect(tripNoteService.setCurrentNote).toHaveBeenCalledWith(2);
      expect(tripNoteService.deleteNote).toHaveBeenCalled();
    });
  });
});
