import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  input,
  Input,
  signal,
  EventEmitter,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CapitalLettersPipe } from '../capital-letters.pipe';
import { TripNote } from '../model/trip-note.model';
import { TripNoteModalComponent } from '../trip-note-modal/trip-note-modal.component';
import { TripNoteService } from '../trip-note.service';
import { TripNotesFacade } from '../state/trip-note.facade';

@Component({
  selector: 'app-trip-note',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatIconModule,
    CapitalLettersPipe,
    MatButtonModule,
  ],
  templateUrl: './trip-note.component.html',
  styleUrl: './trip-note.component.scss',
})
export class TripNoteComponent {
  fromAdd: boolean;
  // readonly dialog = inject(MatDialog);

  tripNote = input(undefined as TripNote);

  constructor(
    private tripNoteService: TripNoteService,
    private dialog: MatDialog,
    private tripNotesFacade: TripNotesFacade
  ) {}

  //pay attention to the placement: the methods are part of the export

  getNumberArray(num: number) {
    return Array(num);
  }
  //TODO:refactor this - step 6
  getSignal() {
    const count = signal(this.tripNote().rating);
    if (count() >= 4) {
      return true;
    } else {
      return false;
    }
  }

  openDialog(
    fromAdd: boolean,
    id: string,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ) {
    this.tripNotesFacade.updateCurrentTripNote(id);

    this.dialog.open(TripNoteModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { fromAdd, id },
    });
  }

  deleteNote(id: string) {
    this.tripNotesFacade.deleteNote(id);
  }
}
