import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { TripNote } from '../model/trip-note.model';
import { ToastTypeDirective } from '../toast-type.directive';
import { TripNoteModalComponent } from '../trip-note-modal/trip-note-modal.component';
import { TripNoteService } from '../trip-note.service';
import { TripNoteComponent } from '../trip-note/trip-note.component';
import { CosComponent } from './cos.component';
import { FilterComponent } from '../filter/filter.component';
import { CommonModule } from '@angular/common';
import { TripNotesFacade } from '../state/trip-note.facade';
import { SimplePopupComponent } from '../simple-popup/simple-popup.component';
import { RouterLink } from '@angular/router';
import { FamousTripComponent } from '../famous-trip/famous-trip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TripNoteComponent,
    MatToolbar,
    MatIcon,
    // MatFormField,
    // MatLabel,
    // MatSelect,
    // MatOption,
    FormsModule,
    ToastTypeDirective,
    CosComponent,
    FilterComponent,
    CommonModule,
    SimplePopupComponent,
    RouterLink,
    FamousTripComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  //changes only when announced
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  fromAdd: boolean;
  nextId: any;
  visibleFilter: boolean = false;
  searchTerm: string;
  firstSearch: boolean = true;
  copy: TripNote[];
  actionCompleted = false;
  fruct = 'cirese';
  color: string = undefined;
  tripNotes: TripNote[];
  noteCount = signal(0);
  loaded: boolean;
  hasTripNotes: boolean;
  invalidFavoriteTripNotesRoute;
  bestTripNote: TripNote;
  worstTripNote: TripNote;
  bestRating = 0;
  worstRating = 5;
  showPopup: boolean;

  //aka sintactic sugar
  constructor(
    private tripNoteService: TripNoteService, // for ChangeDetectionStrategy.OnPush, // private ref: ChangeDetectorRef
    private tripNotesFacade: TripNotesFacade
  ) {
    this.tripNoteService.completedAction$.subscribe((completedAction) => {
      this.actionCompleted = completedAction.isPressed;
      this.color = completedAction.type;
    });

    this.tripNotesFacade.getNotes();

    this.tripNotesFacade.tripNotes$.subscribe((tripNotes) => {
      this.tripNotes = tripNotes;
      this.noteCount.set(this.tripNotes.length);
      tripNotes.forEach((tripNote) => {
        if (tripNote.rating > this.bestRating) {
          this.bestRating = tripNote.rating;
        }
        if (tripNote.rating < this.worstRating) {
          this.worstRating = tripNote.rating;
        }
      });

      this.bestTripNote = this.tripNotes.find(
        (tripNote) => tripNote.rating === this.bestRating
      );
      this.worstTripNote = this.tripNotes.find(
        (tripNote) => tripNote.rating === this.worstRating
      );
      console.log('this.bestTripNote', this.bestTripNote);
    });

    this.tripNotesFacade.loaded$.subscribe((loaded) => {
      this.loaded = loaded;
    });

    this.tripNotesFacade.hasTripNotes$.subscribe((hasTripNotes) => {
      this.hasTripNotes = hasTripNotes;
    });

    this.tripNotesFacade.invalidFavoriteTripNotesRoute$.subscribe(
      (isFavoriteTripNotesRouteValid) => {
        this.invalidFavoriteTripNotesRoute = isFavoriteTripNotesRouteValid;
        if (this.invalidFavoriteTripNotesRoute) {
          this.showPopup = true;
          setTimeout(() => {
            this.showPopup = false;
          }, 3000); // Timeout set to 5000 milliseconds (5 seconds)
      }
   
      }
    );

    effect(() => {
      this.noteCount();

      this.tripNoteService.showToaster('count');
    });
  }
  readonly dialog = inject(MatDialog);

  //constructor equivalent
  // tripNoteService: TripNoteService;
  // constructor(_tripNoteService: TripNoteService) {
  //   this.tripNoteService = _tripNoteService;
  // }

  showFilter() {
    this.visibleFilter = !this.visibleFilter;
  }

  sortAscending() {
    this.tripNotes.sort((note1, note2) => {
      const date1 = new Date(note1.fromDate).getTime();
      const date2 = new Date(note2.fromDate).getTime();
      return date1 - date2;
    });
  }

  sortDescending() {
    this.tripNotes.sort((note1, note2) => {
      const date1 = new Date(note1.fromDate).getTime();
      const date2 = new Date(note2.fromDate).getTime();
      return date2 - date1;
    });
  }

  sortAlphabetically() {
    this.tripNotes.sort((note1, note2) => {
      return note1.title.localeCompare(note2.title);
    });
  }

  handleSelectChange(event) {
    const value = event.target.value;
    if (value === 'ascending') {
      this.sortAscending();
    } else if (value === 'descending') {
      this.sortDescending();
    } else if (value === 'alphabetical') {
      this.sortAlphabetically();
    }
  }

  openDialog(
    fromAdd: boolean,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.fruct = 'mere';

    this.dialog.open(TripNoteModalComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { fromAdd },
    });
  }

  search() {
    if (this.firstSearch) {
      this.copy = this.tripNotes;
      this.firstSearch = false;
    }
    this.tripNotes = this.copy;
    this.tripNotes = this.tripNotes.filter(
      (tripNote) =>
        tripNote.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tripNote.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase())
    );
  }

  cevaPrimit(event) {
    console.log('homeComponent cu mesaj emis', event);
  }
}
